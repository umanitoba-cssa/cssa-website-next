# Guide Components

This document provides detailed information about the UI components used to render guide content. Understanding these components is essential for maintenance and future development of the Guides system.

## Core Rendering Components

### `MarkdownContent`

**File:** `src/components/guides/markdown-content.tsx`

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

**File:** `src/components/guides/markdown-image.tsx`

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
  src="/img/guides/example.png" 
  alt="Example image" 
  width={800} 
  height={600} 
/>
```

### `CodeBlock`

**File:** `src/components/guides/code-block.tsx`

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

### `GuideSidebar`

**File:** `src/components/guides/guide-sidebar.tsx`

Provides navigation for guides and their sections.

**Props:**
- `guide`: Guide object containing metadata and sections information
- `className`: Optional additional CSS classes

**Features:**
- Collapsible mobile navigation
- Active state highlighting for current section
- Links to guide overview and all sections
- Auto-collapsing on mobile when link is clicked

**Usage Example:**
```tsx
<GuideSidebar guide={guideData} />
```

### `TableOfContents`

**File:** `src/components/guides/table-of-contents.tsx`

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

**File:** `src/components/guides/breadcrumbs.tsx`

Displays navigational breadcrumbs for the current guide/section.

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
<Breadcrumbs items={[
  { label: 'Resources', href: '/resources' },
  { label: 'Guides', href: '/resources/guides' },
  { label: 'Getting Started', href: '/resources/guides/getting-started', active: true }
]} />
```

## Listing Components

### `GuidesList`

**File:** `src/components/guides/guides-list.tsx`

Displays a grid of guide cards on the main guides listing page.

**Props:**
- `guides`: Array of Guide objects to display
- `className`: Optional additional CSS classes

**Features:**
- Responsive grid layout
- Empty state handling
- Sorting guides by date (newest first)

**Usage Example:**
```tsx
<GuidesList guides={allGuides} />
```

### `GuideCard`

**File:** `src/components/guides/guide-card.tsx`

Card component displaying a guide preview with title, description, and link.

**Props:**
- `guide`: Guide object with title, description, and slug
- `className`: Optional additional CSS classes

**Features:**
- Consistent card styling
- Truncation for long descriptions
- Hover effects for better UX
- Accessible link handling

**Usage Example:**
```tsx
<GuideCard guide={guideData} />
```

## Component Relationships

The components are organized in a hierarchical structure:

1. **Page Level**
   - `GuidesPage` (main listing)
   - `GuidePage` (individual guide)
   - `SectionPage` (individual section)

2. **Layout Components**
   - `GuideSidebar` provides side navigation
   - `Breadcrumbs` shows page context

3. **Content Rendering**
   - `MarkdownContent` handles main content display
   - `CodeBlock` for code syntax highlighting
   - `MarkdownImage` for optimized images

4. **Navigation Elements**
   - `TableOfContents` for in-page navigation
   - `GuidesList` and `GuideCard` for guide browsing

## Styling Approach

The Guides components use Tailwind CSS for styling with a few key patterns:

1. Base styles are defined in the component files
2. The `cn()` utility function is used for conditional class application
3. Design tokens follow the CSSA website color scheme (cssa-navy, cssa-blue, etc.)
4. Responsive breakpoints follow the Tailwind defaults (sm, md, lg, xl)
5. A special `guides.css` file for global guide-specific styles

## Extending Components

When extending or modifying guide components:

1. Maintain the component interface (props)
2. Follow the established styling patterns
3. Keep components focused on a single responsibility
4. Ensure responsive behavior works on all screen sizes
5. Maintain accessibility features

## Troubleshooting Component Issues

Common component issues and solutions:

1. **Missing Styles**: Ensure Tailwind classes are properly defined and the component is correctly imported
2. **Rendering Issues**: Check the Markdown HTML structure for unexpected elements
3. **Navigation Problems**: Verify that guide and section slugs are properly kebab-cased
4. **Image Display Issues**: Confirm image paths are correct and images exist in the public directory 