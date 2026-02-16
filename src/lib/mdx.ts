import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import { GITHUB_OWNER, GuideList, MeetingList } from '../data/resources';
import { fetchGitHubDir, fetchGitHubFile, fetchGitHubTree, GitHubFileResponse } from './github-sync';

export interface MarkdownMetadata {
  title: string;
  description: string;
  author?: string;
  date?: string;
}

export interface GuideFrontmatter extends MarkdownMetadata {
  [key: string]: any;
}

export interface MarkdownGroup extends MarkdownMetadata {
  slug: string;
  sections: MarkdownSection[];
  content: string;
}

export interface MarkdownSection extends MarkdownMetadata {
  slug: string;
  content: string;
  readingTime: {
    text: string;
    minutes: number;
    words: number;
  };
}

const CONTENT_DIRECTORY = 'src/content';

/**
 * Get metadata for all guides
 */
export async function getAllGuides(): Promise<MarkdownGroup[]> {
  const guidesSlugs = GuideList.map(g => g.slug);
  const guides = await Promise.all(guidesSlugs.map((repoName) => getMarkdownBySlug(repoName, 'guides')));
  
  // Sort guides based on their order in GuideList configuration
  const guideOrder = GuideList.map(g => g.slug);
  
  return guides.sort((a, b) => {
    const aIndex = guideOrder.indexOf(a.slug);
    const bIndex = guideOrder.indexOf(b.slug);
    
    // If both guides are in the GuideList, sort by their position
    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    }
    
    // If only one guide is in the GuideList, prioritize it
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    
    // If neither guide is in the GuideList, fall back to alphabetical sort
    return a.title.localeCompare(b.title);
  });
}

/**
 * Get metadata for all meetings
 */
export async function getAllMeetings(): Promise<MarkdownGroup[]> {
  const contentDir = path.join(process.cwd(), CONTENT_DIRECTORY, "general-meeting");

  // List all subdirectories under general-meeting
  if (!fs.existsSync(contentDir)) {
    console.warn('No meetings found. Run sync to populate src/content/general-meeting.');
    return [];
  }

  const meetingSlugs = fs.readdirSync(contentDir).filter(dir => {
    const fullPath = path.join(contentDir, dir);
    return fs.statSync(fullPath).isDirectory() && fs.existsSync(path.join(fullPath, 'index.md'));
  });

  const meetings: MarkdownGroup[] = meetingSlugs.map(slug => {
    const meetingDir = path.join(contentDir, slug);

    // Read index.md
    const indexPath = path.join(meetingDir, 'index.md');
    const indexRaw = fs.readFileSync(indexPath, 'utf8');
    const { data: frontmatter, content } = matter(indexRaw) as { data: GuideFrontmatter, content: string };

    // Read other markdown sections
    const sectionFiles = fs.readdirSync(meetingDir)
      .filter(f => f.endsWith('.md') && f !== 'index.md');

    const sections: MarkdownSection[] = sectionFiles.map(file => {
      const filePath = path.join(meetingDir, file);
      const raw = fs.readFileSync(filePath, 'utf8');
      const { data, content: sectionContent } = matter(raw) as { data: GuideFrontmatter, content: string };

      return {
        title: data.title || 'Untitled Section',
        description: data.description || '',
        author: data.author,
        date: data.date,
        slug: file.replace('.md', ''),
        content: sectionContent,
        readingTime: readingTime(sectionContent),
      };
    });

    return {
      title: frontmatter.title || 'Untitled Meeting',
      description: frontmatter.description || '',
      author: frontmatter.author,
      date: frontmatter.date,
      slug,
      sections,
      content,
    };
  });

  // Sort meetings by date (descending: newest first)
  return meetings.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * Get a guide by its slug. Legacy code that fetches directly from GitHub Repo
 */
// export async function getGuideBySlugApi(slug: string): Promise<MarkdownGroup> {
//   const indexFileContents = await fetchGitHubFile(GITHUB_OWNER, slug, 'index.md', "main");
//
//   const tree = await fetchGitHubTree(GITHUB_OWNER, slug, "main")
//   const MarkdownSections = tree.filter(file => file.type === 'blob' && file.path.endsWith('.md'));
//   const sections = await Promise.all(MarkdownSections.map(file => getMarkdownSectionBySlug(slug, file.path,file.path.split('/').pop()?.replace('.md', '') || '')));
//    // Parse frontmatter
//    const { data, content } = matter(indexFileContents);
//    const frontmatter = data as GuideFrontmatter;
//
//    return {
//      title: frontmatter.title || 'Untitled Guide',
//      description: frontmatter.description || '',
//      author: frontmatter.author,
//      date: frontmatter.date,
//      slug,
//      sections,
//      content
//    };
// }

/**
 * Get markdown by its slug (local filesystem version)
 */
export async function getMarkdownBySlug(slug: string, contentDir: string): Promise<MarkdownGroup> {
  const markdownDir = path.join(process.cwd(), CONTENT_DIRECTORY, contentDir, slug);
  console.log(markdownDir);

  // Read the main index.md of the markdown
  const indexPath = path.join(markdownDir, 'index.md');
  if (!fs.existsSync(indexPath)) {
    throw new Error(`File index.md not found for slug "${slug}"`);
  }

  const indexRaw = fs.readFileSync(indexPath, 'utf8');
  const { data: frontmatter, content } = matter(indexRaw) as { data: GuideFrontmatter, content: string };

  // Read all other markdown sections (excluding index.md)
  const sectionFiles = fs.readdirSync(markdownDir)
    .filter(f => f.endsWith('.md') && f !== 'index.md');

  const sections: MarkdownSection[] = sectionFiles.map(file => {
    const filePath = path.join(markdownDir, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data, content: sectionContent } = matter(raw) as { data: GuideFrontmatter, content: string };

    return {
      title: data.title || 'Untitled Section',
      description: data.description || '',
      author: data.author,
      date: data.date,
      slug: file.replace('.md', ''),
      content: sectionContent,
      readingTime: readingTime(sectionContent),
    };
  });

  return {
    title: frontmatter.title || 'Untitled Document',
    description: frontmatter.description || '',
    author: frontmatter.author,
    date: frontmatter.date,
    slug,
    sections,
    content,
  };
}

/**
 * Get a specific section by its slug
 */
export function getMarkdownSectionBySlug(markdownSlug: string, sectionSlug: string, contentDir: string): MarkdownSection {
    const fullPath = path.join(process.cwd(), CONTENT_DIRECTORY, contentDir, markdownSlug, `${sectionSlug}.md`);
    let fileContents: string;

    try {
        fileContents = fs.readFileSync(fullPath, 'utf8');
    } catch (error) {
        console.error(`Error reading section file ${fullPath}:`, error);
        return {
            title: 'Section Not Found',
            description: 'The requested section could not be found.',
            slug: sectionSlug,
            content: '',
            readingTime: { text: '0 min read', minutes: 0, words: 0 },
        };
    }

    // Parse frontmatter
    const { data, content } = matter(fileContents);
    const frontmatter = data as GuideFrontmatter;

    // Calculate reading time
    const stats = readingTime(content);

    return {
        title: frontmatter.title || 'Untitled Section',
        description: frontmatter.description || '',
        author: frontmatter.author,
        date: frontmatter.date,
        slug: sectionSlug,
        content,
        readingTime: stats,
    };
}

/**
 * Convert markdown to HTML
 */
export async function markdownToHtml(markdown: string, markdownSlug: string, contentDir: string): Promise<string> {
  // Pre-process Markdown content with markdown slug
  const processedMarkdown = prepareMarkdownForMDX(markdown, markdownSlug, contentDir);
  
  const result = await remark()
    .use(html, { sanitize: false })
    .use(remarkGfm)
    .process(processedMarkdown);
  
  let htmlContent = result.toString();
  
  // Process images in the generated HTML
  htmlContent = processImages(htmlContent, markdownSlug, contentDir);
  
  // Ensure code blocks have proper language classes for Prism.js
  htmlContent = htmlContent.replace(
    /<pre><code class="language-(\w+)">/g,
    (match, language) => {
      // Apply the language class to both pre and code tags for better Prism.js detection
      return `<pre class="language-${language}"><code class="language-${language}">`;
    }
  );
  
  return htmlContent;
}

/**
 * Process images in HTML content
 */
function processImages(htmlContent: string, markdownSlug?: string, imageDir?: string): string {
  // Replace relative image paths with absolute paths
  return htmlContent.replace(
    /<img([^>]+)src=["'](?!https?:\/\/)([^"']+)["']/g,
    (match, attributes, url) => {
      // If it's already an absolute path starting with /, keep it
      if (url.startsWith('/')) {
        return `<img${attributes}src="${url}"`;
      }
      
      // Otherwise, make it absolute using the markdown slug
      if (markdownSlug) {
        return `<img${attributes}src="/img/${imageDir}/${markdownSlug}/${url}"`;
      } else {
        return `<img${attributes}src="/img/${imageDir}/${url}"`;
      }
    }
  );
}

/**
 * Process links in markdown content
 */
export function processLinks(content: string, markdownSlug: string, contentDir: string): string {
  // Convert relative links to absolute paths
  return content.replace(
    /\[(.*?)\]\((?!https?:\/\/)([^)]+)\)/g,
    (match, text, url) => {
      // Keep anchor links as-is
      if (url.startsWith('#')) {
        return `[${text}](${url})`;
      }
      // Keep absolute paths as-is
      if (url.startsWith('/')) {
        return `[${text}](${url})`;
      }
      // Convert relative file paths to absolute
      return `[${text}](/resources/${contentDir}/${markdownSlug}/${url})`;
    }
  );
}

/**
 * Process image paths in markdown content
 */
export function processImagePaths(content: string, markdownSlug?: string, imageDir?: string): string {
  // Replace relative image paths with absolute paths
  return content.replace(
    /!\[(.*?)\]\((?!https?:\/\/)([^)]+)\)/g,
    (match, alt, url) => {
      // If it's already an absolute path starting with /, keep it
      if (url.startsWith('/')) {
        return `![${alt}](${url})`;
      }
      
      // Otherwise, make it absolute using the markdown slug
      if (markdownSlug) {
        return `![${alt}](/img/${imageDir}/${markdownSlug}/${url})`;
      } else {
        return `![${alt}](/img/${imageDir}/${url})`;
      }
    }
  );
}

/**
 * Prepare markdown content for rendering with MDX
 */
export function prepareMarkdownForMDX(content: string, markdownSlug: string, contentDir: string): string {
  // Process image paths to absolute
  let processedContent = processImagePaths(content, markdownSlug, contentDir);
  
  // Process links if markdownSlug is provided
  if (markdownSlug) {
    processedContent = processLinks(processedContent, markdownSlug, contentDir);
  }
  
  // Sanitize HTML within markdown to avoid React issues
  // Replace style attributes in HTML tags
  processedContent = processedContent.replace(
    /<div\s+style=['"](.*?)['"]>/g,
    (match, styleContent) => {
      // Convert to a CSS class or remove style attribute
      return `<div>`;
    }

    // Sanitize HTML within markdown to avoid React issues
    // Replace style attributes in HTML tags
    processedContent = processedContent.replace(
        /<div\s+style=['"](.*?)['"]>/g,
        (match, styleContent) => {
            // Convert to a CSS class or remove style attribute
            return `<div>`;
        },
    );

    return processedContent;
}
