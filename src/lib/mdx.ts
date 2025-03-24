import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import readingTime from 'reading-time';

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
const GUIDES_DIRECTORY = path.join(process.cwd(), 'content/guides');

/**
 * Get slugs for all guides
 */
export function getGuidesSlugs(): string[] {
  try {
    if (!fs.existsSync(GUIDES_DIRECTORY)) {
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
export function getAllGuides(): Guide[] {
  const guidesSlugs = getGuidesSlugs();
  const guides = guidesSlugs.map((slug) => getGuideBySlug(slug));
  
  // Sort guides by date (newest first) if available
  return guides.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
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
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(html, { sanitize: false })
    .use(remarkGfm)
    .process(markdown);
  
  return result.toString();
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
      if (url.startsWith('/')) {
        return `[${text}](${url})`;
      }
      return `[${text}](/resources/guides/${guideSlug}/${url})`;
    }
  );
} 