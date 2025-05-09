# Guides System Overview

## Introduction

The Guides system is a dynamic documentation platform built into the CSSA website. It enables the creation and management of instructional guides with multiple sections using Markdown files. The system renders Markdown content into HTML, supports code syntax highlighting, image embedding, and navigational features like table of contents and breadcrumbs.

## Architecture

The Guides system follows a file-based content management approach with the following components:

### Content Storage

- **Location**: All guide content is stored in the `content/guides` directory at the project root
- **Format**: Content is written in Markdown (`.md` files) with frontmatter metadata
- **Images**: Guide images are stored in `public/img/guides`

### Core Components

1. **MDX Utilities** (`src/lib/mdx.ts`):
   - Core logic for scanning guide directories
   - Parsing frontmatter and Markdown content
   - Converting Markdown to HTML
   - Extracting headings for navigation
   - Processing links and images

2. **Route Implementation**:
   - Main listing: `src/app/resources/guides/page.tsx`
   - Guide page: `src/app/resources/guides/[guide-slug]/page.tsx`
   - Section page: `src/app/resources/guides/[guide-slug]/[section-slug]/page.tsx`

3. **UI Components** (in `src/components/guides/`):
   - `markdown-content.tsx`: Renders processed Markdown as HTML
   - `guide-sidebar.tsx`: Navigation for guide sections
   - `table-of-contents.tsx`: In-page navigation based on headings
   - `breadcrumbs.tsx`: Breadcrumb navigation
   - `guides-list.tsx`: Displays available guides in a grid
   - `guide-card.tsx`: Card component for each guide in the listing
   - `code-block.tsx`: Renders syntax-highlighted code blocks

### Data Flow

1. The system scans the `content/guides` directory to identify guides and sections
2. When a user visits a guide or section page:
   - Content is retrieved from the corresponding Markdown file
   - Frontmatter is extracted for metadata
   - Markdown content is processed into HTML
   - Component tree is rendered with the processed content
   - Table of contents is generated from headings

### Routing Structure

- `/resources/guides` - Main listing of all guides
- `/resources/guides/[guide-slug]` - Individual guide overview page
- `/resources/guides/[guide-slug]/[section-slug]` - Individual section page

## Key Features

- **Dynamic Content**: Content updates only require changes to Markdown files, not code modifications
- **Section Navigation**: Guides are organized into sections with intuitive navigation
- **Table of Contents**: Auto-generated navigation based on content headings
- **Image Support**: Embedded images with support for both relative and absolute paths
- **Syntax Highlighting**: Code blocks with language-specific syntax highlighting
- **Responsive Design**: Mobile-friendly interface with responsive sidebar
- **Breadcrumb Navigation**: Context-aware navigation path
- **Reading Time**: Estimated reading time calculation for each section
- **Previous/Next Navigation**: Easy navigation between guide sections

## Dependencies

The Guides system relies on the following libraries:

- `gray-matter`: For parsing frontmatter in Markdown files
- `remark` and related plugins: For processing Markdown and converting to HTML
- `reading-time`: For calculating estimated reading time
- Tailwind CSS: For styling components
- Next.js App Router: For routing and server components 