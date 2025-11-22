# API Reference

This document provides detailed information about the core utilities in `src/lib/mdx.ts` that power the Guides system. Understanding these APIs is essential for maintenance and extending the system.

## Types and Interfaces

### `GuideMetadata`

Base interface for guide and section metadata.

```typescript
interface GuideMetadata {
    title: string;
    description: string;
    author?: string;
    date?: string;
}
```

### `GuideFrontmatter`

Extended interface for handling any additional frontmatter fields.

```typescript
interface GuideFrontmatter extends GuideMetadata {
    [key: string]: any;
}
```

### `Guide`

Complete guide information including content and sections.

```typescript
interface Guide extends GuideMetadata {
    slug: string;
    sections: Section[];
    content: string;
}
```

### `Section`

Individual section information including reading time.

```typescript
interface Section extends GuideMetadata {
    slug: string;
    content: string;
    readingTime: {
        text: string;
        minutes: number;
        words: number;
    };
}
```

## Directory Constants

```typescript
const GUIDES_DIRECTORY = path.join(process.cwd(), 'src/content/guides');
const PUBLIC_DIRECTORY = path.join(process.cwd(), 'public');
const GUIDE_IMAGES_DIRECTORY = path.join(PUBLIC_DIRECTORY, 'img/guides');
```

## Guide Discovery Functions

### `getGuidesSlugs()`

Retrieves all valid guide directory slugs from the guides directory.

**Returns**: `string[]` - Array of guide slugs

**Example**:

```typescript
const guideSlugs = getGuidesSlugs();
// Returns: ['getting-started', 'career-resources', ...]
```

### `getAllGuides()`

Retrieves all guides with their complete metadata and content.

**Returns**: `Guide[]` - Array of guide objects

**Example**:

```typescript
const guides = getAllGuides();
// Returns array of Guide objects sorted by date (newest first)
```

### `getGuideBySlug(slug: string)`

Retrieves a specific guide by its slug.

**Parameters**:

- `slug: string` - The guide's directory name

**Returns**: `Guide` - The guide object including content and sections

**Example**:

```typescript
const guide = getGuideBySlug('getting-started');
```

## Section Functions

### `getSectionsByGuideSlug(slug: string)`

Retrieves all sections for a specific guide.

**Parameters**:

- `slug: string` - The guide's directory name

**Returns**: `Section[]` - Array of section objects

**Example**:

```typescript
const sections = getSectionsByGuideSlug('getting-started');
```

### `getSectionBySlug(guideSlug: string, sectionSlug: string)`

Retrieves a specific section from a guide.

**Parameters**:

- `guideSlug: string` - The guide's directory name
- `sectionSlug: string` - The section's file name without extension

**Returns**: `Section` - The section object including content and reading time

**Example**:

```typescript
const section = getSectionBySlug('getting-started', 'setup');
```

## Markdown Processing Functions

### `markdownToHtml(markdown: string)`

Converts Markdown content to HTML.

**Parameters**:

- `markdown: string` - Raw Markdown content

**Returns**: `Promise<string>` - HTML content

**Example**:

```typescript
const htmlContent = await markdownToHtml(markdownContent);
```

### `processImages(htmlContent: string)`

Processes image paths in HTML content to ensure they're absolute.

**Parameters**:

- `htmlContent: string` - HTML content with image tags

**Returns**: `string` - HTML with processed image paths

**Used internally by**: `markdownToHtml`

### `sanitizeHtmlInMarkdown(markdown: string)`

Sanitizes HTML within Markdown content for security and React compatibility.

**Parameters**:

- `markdown: string` - Raw Markdown content

**Returns**: `string` - Sanitized Markdown content

**Used internally by**: `markdownToHtml`

### `extractHeadings(markdown: string)`

Extracts headings from Markdown content for table of contents generation.

**Parameters**:

- `markdown: string` - Raw Markdown content

**Returns**: `{ level: number, text: string, slug: string }[]` - Array of heading objects

**Example**:

```typescript
const headings = extractHeadings(markdownContent);
// Returns: [{ level: 1, text: "Introduction", slug: "introduction" }, ...]
```

### `processLinks(content: string, guideSlug: string)`

Processes links in Markdown content to ensure correct routing.

**Parameters**:

- `content: string` - Raw Markdown content
- `guideSlug: string` - The guide's directory name

**Returns**: `string` - Markdown with processed links

**Example**:

```typescript
const processedContent = processLinks(content, 'getting-started');
```

### `processImagePaths(content: string)`

Processes image paths in Markdown content to ensure they're absolute.

**Parameters**:

- `content: string` - Raw Markdown content

**Returns**: `string` - Markdown with processed image paths

**Example**:

```typescript
const processedContent = processImagePaths(content);
```

### `prepareMarkdownForMDX(content: string, guideSlug?: string)`

Prepares Markdown content for MDX rendering by processing images, links, and sanitizing HTML.

**Parameters**:

- `content: string` - Raw Markdown content
- `guideSlug?: string` - Optional guide slug for link processing

**Returns**: `string` - Processed Markdown content

**Example**:

```typescript
const preparedContent = prepareMarkdownForMDX(content, 'getting-started');
```

## File System Functions

### `ensureGuideImageDirectory(guideSlug: string)`

Creates image directories for a guide if they don't exist.

**Parameters**:

- `guideSlug: string` - The guide's directory name

**Returns**: `string` - Path to the guide's image directory

**Example**:

```typescript
const imageDir = ensureGuideImageDirectory('getting-started');
```

## Error Handling

All functions include try-catch blocks that log errors and return sensible defaults:

- If a guide is not found, returns a default guide with "Guide Not Found" title
- If a section is not found, returns a default section with "Section Not Found" title
- If directories don't exist, they are created when necessary

## Usage Examples

### Loading a Guide with Sections

```typescript
import { getGuideBySlug, markdownToHtml, extractHeadings } from '@/lib/mdx';

async function loadGuide(slug: string) {
    // Get the guide with all metadata and sections
    const guide = getGuideBySlug(slug);

    // Convert the main content to HTML
    const htmlContent = await markdownToHtml(guide.content);

    // Extract headings for table of contents
    const headings = extractHeadings(guide.content);

    return {
        guide,
        htmlContent,
        headings,
    };
}
```

### Loading a Section

```typescript
import { getSectionBySlug, markdownToHtml, extractHeadings } from '@/lib/mdx';

async function loadSection(guideSlug: string, sectionSlug: string) {
    // Get the specific section
    const section = getSectionBySlug(guideSlug, sectionSlug);

    // Convert the section content to HTML
    const htmlContent = await markdownToHtml(section.content);

    // Extract headings for table of contents
    const headings = extractHeadings(section.content);

    return {
        section,
        htmlContent,
        headings,
    };
}
```

### Listing All Guides

```typescript
import { getAllGuides } from '@/lib/mdx';

function listGuides() {
    // Get all guides with their metadata
    const guides = getAllGuides();

    // Sort or filter guides as needed
    const sortedGuides = guides.sort((a, b) => a.title.localeCompare(b.title));

    return sortedGuides;
}
```
