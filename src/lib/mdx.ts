import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import { GuideList } from '../data/resources';

export interface MarkdownMetadata {
    title: string;
    description: string;
    author?: string;
    date?: string;
}

export interface MarkdownFrontmatter extends MarkdownMetadata {
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
 * Safe parsing helper for gray-matter
 */
function parseMarkdownFile(filePath: string): {
    frontmatter: MarkdownFrontmatter;
    content: string;
} {
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(raw);
    const frontmatter = parsed.data as unknown as MarkdownFrontmatter;
    return { frontmatter, content: parsed.content };
}

/**
 * Get metadata for all guides
 */
export async function getAllGuides(): Promise<MarkdownGroup[]> {
    const guidesSlugs = GuideList.map((g) => g.slug);
    const guides = await Promise.all(
        guidesSlugs.map((repoName) => getMarkdownBySlug(repoName, 'guides')),
    );

    const guideOrder = GuideList.map((g) => g.slug);

    return guides.sort((a, b) => {
        const aIndex = guideOrder.indexOf(a.slug);
        const bIndex = guideOrder.indexOf(b.slug);

        if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
        if (aIndex !== -1) return -1;
        if (bIndex !== -1) return 1;
        return a.title.localeCompare(b.title);
    });
}

/**
 * Get metadata for all markdown of a specific slug
 */
export async function getAllMarkdown(markdownSlug: string): Promise<MarkdownGroup[]> {
    const contentDir = path.join(process.cwd(), CONTENT_DIRECTORY, markdownSlug);
    if (!fs.existsSync(contentDir)) return [];

    const markdownSlugs = fs.readdirSync(contentDir).filter((dir) => {
        const fullPath = path.join(contentDir, dir);
        return (
            fs.statSync(fullPath).isDirectory() && fs.existsSync(path.join(fullPath, 'index.md'))
        );
    });

    const markdownSlugList: MarkdownGroup[] = markdownSlugs.map((slug) => {
        const markdownDir = path.join(contentDir, slug);

        // Parse index.md
        const { frontmatter, content } = parseMarkdownFile(path.join(markdownDir, 'index.md'));

        // Parse other sections
        const sectionFiles = fs
            .readdirSync(markdownDir)
            .filter((f) => f.endsWith('.md') && f !== 'index.md');

        const sections: MarkdownSection[] = sectionFiles.map((file) => {
            const { frontmatter: data, content: sectionContent } = parseMarkdownFile(
                path.join(markdownDir, file),
            );

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
            title: frontmatter.title || 'Untitled Markdown Doc',
            description: frontmatter.description || '',
            author: frontmatter.author,
            date: frontmatter.date,
            slug,
            sections,
            content,
        };
    });

    return markdownSlugList.sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

/**
 * Get markdown by its slug (local filesystem version)
 */
export async function getMarkdownBySlug(slug: string, contentDir: string): Promise<MarkdownGroup> {
    const markdownDir = path.join(process.cwd(), CONTENT_DIRECTORY, contentDir, slug);
    const { frontmatter, content } = parseMarkdownFile(path.join(markdownDir, 'index.md'));

    const sectionFiles = fs
        .readdirSync(markdownDir)
        .filter((f) => f.endsWith('.md') && f !== 'index.md');

    const sections: MarkdownSection[] = sectionFiles.map((file) => {
        const { frontmatter: data, content: sectionContent } = parseMarkdownFile(
            path.join(markdownDir, file),
        );
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
export function getMarkdownSectionBySlug(
    markdownSlug: string,
    sectionSlug: string,
    contentDir: string,
): MarkdownSection {
    const fullPath = path.join(
        process.cwd(),
        CONTENT_DIRECTORY,
        contentDir,
        markdownSlug,
        `${sectionSlug}.md`,
    );
    if (!fs.existsSync(fullPath)) {
        return {
            title: 'Section Not Found',
            description: 'The requested section could not be found.',
            slug: sectionSlug,
            content: '',
            readingTime: { text: '0 min read', minutes: 0, words: 0 },
        };
    }

    const { frontmatter, content } = parseMarkdownFile(fullPath);

    return {
        title: frontmatter.title || 'Untitled Section',
        description: frontmatter.description || '',
        author: frontmatter.author,
        date: frontmatter.date,
        slug: sectionSlug,
        content,
        readingTime: readingTime(content),
    };
}

/**
 * Convert markdown to HTML
 */
export async function markdownToHtml(
    markdown: string,
    markdownSlug: string,
    contentDir: string,
): Promise<string> {
    const processedMarkdown = prepareMarkdownForMDX(markdown, markdownSlug, contentDir);
    const result = await remark()
        .use(html, { sanitize: false })
        .use(remarkGfm)
        .process(processedMarkdown);

    let htmlContent = result.toString();

    // Fix images
    htmlContent = processImages(htmlContent, markdownSlug, contentDir);

    // Add Prism.js classes to code blocks
    htmlContent = htmlContent.replace(/<pre><code class="language-(\w+)">/g, (match, language) => {
        return `<pre class="language-${language}"><code class="language-${language}">`;
    });

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
        },
    );
}

/**
 * Process links in markdown content
 */
export function processLinks(content: string, markdownSlug: string, contentDir: string): string {
    // Convert relative links to absolute paths
    return content.replace(/\[(.*?)\]\((?!https?:\/\/)([^)]+)\)/g, (match, text, url) => {
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
    });
}

/**
 * Process image paths in markdown content
 */
export function processImagePaths(
    content: string,
    markdownSlug?: string,
    imageDir?: string,
): string {
    // Replace relative image paths with absolute paths
    return content.replace(/!\[(.*?)\]\((?!https?:\/\/)([^)]+)\)/g, (match, alt, url) => {
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
    });
}

/**
 * Prepare markdown content for rendering with MDX
 */
export function prepareMarkdownForMDX(
    content: string,
    markdownSlug: string,
    contentDir: string,
): string {
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
        },
    );

    return processedContent;
}
