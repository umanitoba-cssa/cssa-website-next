import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import { GuideList } from '../data/resources';

// Types for our guides and sections
export interface GuideMetadata {
  title: string;
  description: string;
  author?: string;
  date?: string;
}

export interface GuideFrontmatter extends GuideMetadata {
  [key: string]: any;
}

export interface Guide extends GuideMetadata {
  slug: string;
  sections: Section[];
  content: string;
}

export interface Section extends GuideMetadata {
  slug: string;
  content: string;
  readingTime: {
    text: string;
    minutes: number;
    words: number;
  };
}

// Constants
const GUIDES_DIRECTORY = path.join(process.cwd(), 'src/content/guides');
const PUBLIC_DIRECTORY = path.join(process.cwd(), 'public');
const GUIDE_IMAGES_DIRECTORY = path.join(PUBLIC_DIRECTORY, 'img/guides');

/**
 * Get slugs for all guides
 */
export async function getGuidesSlugs(): Promise<string[]> {
  try {
    // Check if guides need to be synced, but don't auto-sync
    // Users should run manual sync or use webhooks
    if (!fs.existsSync(GUIDES_DIRECTORY)) {
      console.warn('No guides found. Run "bun run sync-guides" to sync guides from repositories.');
      return [];
    }
    
    return fs.readdirSync(GUIDES_DIRECTORY).filter((directory) => {
      const fullPath = path.join(GUIDES_DIRECTORY, directory);
      return fs.statSync(fullPath).isDirectory() && 
             fs.existsSync(path.join(fullPath, 'index.md'));
    });
  } catch (error) {
    console.error('Error getting guide slugs:', error);
    return [];
  }
}

/**
 * Get metadata for all guides
 */
export async function getAllGuides(): Promise<Guide[]> {
  const guidesSlugs = await getGuidesSlugs();
  const guides = guidesSlugs.map((slug) => getGuideBySlug(slug));
  
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
 * Get a guide by its slug
 */
export function getGuideBySlug(slug: string): Guide {
  const fullPath = path.join(GUIDES_DIRECTORY, slug, 'index.md');
  let fileContents: string;
  
  try {
    fileContents = fs.readFileSync(fullPath, 'utf8');
  } catch (error) {
    console.error(`Error reading guide file ${fullPath}:`, error);
    return {
      title: 'Guide Not Found',
      description: 'The requested guide could not be found.',
      slug,
      sections: [],
      content: ''
    };
  }
  
  // Parse frontmatter
  const { data, content } = matter(fileContents);
  const frontmatter = data as GuideFrontmatter;
  
  // Get sections
  const sections = getSectionsByGuideSlug(slug);
  
  return {
    title: frontmatter.title || 'Untitled Guide',
    description: frontmatter.description || '',
    author: frontmatter.author,
    date: frontmatter.date,
    slug,
    sections,
    content
  };
}

/**
 * Get all sections for a guide
 */
export function getSectionsByGuideSlug(slug: string): Section[] {
  const guideDirectory = path.join(GUIDES_DIRECTORY, slug);
  
  try {
    if (!fs.existsSync(guideDirectory)) {
      return [];
    }
    
    const sectionFiles = fs.readdirSync(guideDirectory)
      .filter(file => file.endsWith('.md') && file !== 'index.md');
    
    const sections = sectionFiles.map(file => {
      const sectionSlug = file.replace(/\.md$/, '');
      return getSectionBySlug(slug, sectionSlug);
    });
    
    return sections;
  } catch (error) {
    console.error(`Error getting sections for guide ${slug}:`, error);
    return [];
  }
}

/**
 * Get a specific section by its slug
 */
export function getSectionBySlug(guideSlug: string, sectionSlug: string): Section {
  const fullPath = path.join(GUIDES_DIRECTORY, guideSlug, `${sectionSlug}.md`);
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
      readingTime: { text: '0 min read', minutes: 0, words: 0 }
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
    readingTime: stats
  };
}

/**
 * Convert markdown to HTML
 */
export async function markdownToHtml(markdown: string, guideSlug?: string): Promise<string> {
  // Pre-process Markdown content with guide slug
  const processedMarkdown = prepareMarkdownForMDX(markdown, guideSlug);
  
  const result = await remark()
    .use(html, { sanitize: false })
    .use(remarkGfm)
    .process(processedMarkdown);
  
  let htmlContent = result.toString();
  
  // Process images in the generated HTML
  htmlContent = processImages(htmlContent, guideSlug);
  
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
function processImages(htmlContent: string, guideSlug?: string): string {
  // Replace relative image paths with absolute paths
  return htmlContent.replace(
    /<img([^>]+)src=["'](?!https?:\/\/)([^"']+)["']/g,
    (match, attributes, url) => {
      // If it's already an absolute path starting with /, keep it
      if (url.startsWith('/')) {
        return `<img${attributes}src="${url}"`;
      }
      
      // Otherwise, make it absolute using the guide slug
      if (guideSlug) {
        return `<img${attributes}src="/img/guides/${guideSlug}/${url}"`;
      } else {
        return `<img${attributes}src="/img/guides/${url}"`;
      }
    }
  );
}

/**
 * Sanitize HTML content in markdown to prevent React issues
 */
function sanitizeHtmlInMarkdown(markdown: string): string {
  // Remove style attributes from HTML in markdown
  return markdown.replace(
    /<([a-z][a-z0-9]*)\s+style=(['"])([^'"]*)\2/gi,
    (match, tag, quote, styles) => {
      return `<${tag}`;
    }
  );
}

/**
 * Extract headings from markdown content for table of contents
 */
export function extractHeadings(markdown: string) {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings = [];
  let match;
  
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const slug = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    
    headings.push({
      level,
      text,
      slug
    });
  }
  
  return headings;
}

/**
 * Process links in markdown content
 */
export function processLinks(content: string, guideSlug: string): string {
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
      return `[${text}](/resources/guides/${guideSlug}/${url})`;
    }
  );
}

/**
 * Process image paths in markdown content
 */
export function processImagePaths(content: string, guideSlug?: string): string {
  // Replace relative image paths with absolute paths
  return content.replace(
    /!\[(.*?)\]\((?!https?:\/\/)([^)]+)\)/g,
    (match, alt, url) => {
      // If it's already an absolute path starting with /, keep it
      if (url.startsWith('/')) {
        return `![${alt}](${url})`;
      }
      
      // Otherwise, make it absolute using the guide slug
      if (guideSlug) {
        return `![${alt}](/img/guides/${guideSlug}/${url})`;
      } else {
        return `![${alt}](/img/guides/${url})`;
      }
    }
  );
}

/**
 * Prepare markdown content for rendering with MDX
 */
export function prepareMarkdownForMDX(content: string, guideSlug?: string): string {
  // Process image paths to absolute
  let processedContent = processImagePaths(content, guideSlug);
  
  // Process links if guideSlug is provided
  if (guideSlug) {
    processedContent = processLinks(processedContent, guideSlug);
  }
  
  // Sanitize HTML within markdown to avoid React issues
  // Replace style attributes in HTML tags
  processedContent = processedContent.replace(
    /<div\s+style=['"](.*?)['"]>/g,
    (match, styleContent) => {
      // Convert to a CSS class or remove style attribute
      return `<div>`;
    }
  );
  
  return processedContent;
}

/**
 * Ensure guide image directory exists
 */
export function ensureGuideImageDirectory(guideSlug: string): string {
  const guideImageDir = path.join(GUIDE_IMAGES_DIRECTORY, guideSlug);
  
  if (!fs.existsSync(GUIDE_IMAGES_DIRECTORY)) {
    fs.mkdirSync(GUIDE_IMAGES_DIRECTORY, { recursive: true });
  }
  
  if (!fs.existsSync(guideImageDir)) {
    fs.mkdirSync(guideImageDir, { recursive: true });
  }
  
  return guideImageDir;
}
