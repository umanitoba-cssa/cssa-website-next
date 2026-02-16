# Markdown Components

This document provides detailed information about the UI components used to render markdown content. Understanding these components is essential for maintenance and future development of the Guides system.

## Core Rendering Components

### `MarkdownContent`

**File:** `src/components/markdown/markdown-content.tsx`

This component renders processed Markdown HTML content with proper styling and handling of special elements.

**Props:**

- `source`: HTML string generated from processed Markdown
- `className`: Optional additional CSS classes

**Features:**

- Handles Markdown-generated HTML content
- Manages styling for all Markdown elements
- Processes responsive image displays
- Implements code highlighting

**Usage Example:**

```tsx
<MarkdownContent source={htmlContent} />
```

### `MarkdownImage`

**File:** `src/components/markdown/markdown-image.tsx`

A specialized component for rendering images within Markdown content with proper optimization.

**Props:**

- `src`: Image source URL
- `alt`: Alt text for the image
- `title`: Optional title for the image tooltip
- `width`: Optional image width
- `height`: Optional image height

**Features:**

- Uses Next.js Image component for optimization
- Falls back to standard img tag when needed
- Handles both external and internal images
- Processes relative and absolute image paths

**Usage Example:**

```tsx
<MarkdownImage 
  src="/img/contentDir/example.png" 
  alt="Example image" 
  width={800} 
  height={600} 
/>
```

### `CodeBlock`

**File:** `src/components/markdown/code-block.tsx`

Renders syntax-highlighted code blocks for various programming languages.

**Props:**

- `language`: Programming language for syntax highlighting
- `children`: Code content to display
- `className`: Optional additional CSS classes

**Features:**

- Syntax highlighting for various languages
- Line numbering
- Copy-to-clipboard functionality
- Responsive design with horizontal scrolling

**Usage Example:**

```tsx
<CodeBlock language="javascript">
    {`function example() {
    console.log("Hello world!");
  }`}
</CodeBlock>
```

## Navigation Components

### `MarkdownSidebar`

**File:** `src/components/markdown/markdown-sidebar.tsx`

Provides navigation for markdown docs and their sections.

**Props:**
- `markdown`: Markdown object containing metadata and sections information
- `className`: Optional additional CSS classes

**Features:**

- Collapsible mobile navigation
- Active state highlighting for current section
- Links to markdown doc overview and all sections
- Auto-collapsing on mobile when link is clicked

**Usage Example:**

```tsx
<MarkdownSidebar markdown={markdownData} />
```

### `TableOfContents`

**File:** `src/components/markdown/table-of-contents.tsx`

Generates an in-page navigation based on headings extracted from the Markdown content.

**Props:**

- `headings`: Array of heading objects with level, text, and slug
- `className`: Optional additional CSS classes

**Features:**

- Hierarchical display based on heading levels
- Smooth scrolling to heading locations
- Active state highlighting for current section in view
- Collapsible on mobile devices

**Usage Example:**

```tsx
<TableOfContents headings={extractedHeadings} />
```

### `Breadcrumbs`

**File:** `src/components/markdown/breadcrumbs.tsx`

Displays navigational breadcrumbs for the current markdown/section.

**Props:**

- `items`: Array of breadcrumb objects with label, href, and active state
- `className`: Optional additional CSS classes

**Features:**

- Visual path representation from home to current page
- Links to parent pages
- Responsive design with truncation on small screens
- Accessible navigation with proper ARIA attributes

**Usage Example:**

```tsx
<Breadcrumbs
    items={[
        { label: 'Resources', href: '/resources' },
        { label: 'Guides', href: '/resources/guides' },
        { label: 'Getting Started', href: '/resources/guides/getting-started', active: true },
    ]}
/>
```

## Listing Components

### `MarkdownList`

**File:** `src/components/markdown/markdown-list.tsx`

Displays a grid of markdown cards on the main markdown listing page.

**Props:**
- `markdown`: Array of Markdown objects to display
- `className`: Optional additional CSS classes

**Features:**

- Responsive grid layout
- Empty state handling
- Sorting markdown docs by date (newest first)

**Usage Example:**

```tsx
<MarkdownList markdown={allMarkdown} />
```

### `MarkdownCard`

**File:** `src/components/markdown/markdown-card.tsx`

Card component displaying a markdown doc preview with title, description, and link.

**Props:**
- `markdown`: Markdown object with title, description, and slug
- `className`: Optional additional CSS classes

**Features:**

- Consistent card styling
- Truncation for long descriptions
- Hover effects for better UX
- Accessible link handling

**Usage Example:**

```tsx
<MarkdownCard markdown={markdownData} />
```

## Styling Approach

The Markdown components use Tailwind CSS for styling with a few key patterns:

1. Base styles are defined in the component files
2. The `cn()` utility function is used for conditional class application
3. Design tokens follow the CSSA website color scheme (cssa-navy, cssa-blue, etc.)
4. Responsive breakpoints follow the Tailwind defaults (sm, md, lg, xl)
5. A special `markdown.css` file for rendering markdown to html
