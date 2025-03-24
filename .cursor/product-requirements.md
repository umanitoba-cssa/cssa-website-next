# Guides Section Product Requirements

## Overview
The Guides section will be a new subroute under the existing Resources page. It will host a collection of guides stored as Markdown files organized in a directory structure. The system will dynamically render these guides without requiring code changes when content is updated.

## Project Goals
1. Create a `/guides` subroute under `/resources` that displays a collection of guides
2. Implement a scalable system where guides are stored as Markdown files in a structured directory
3. Build components that dynamically render guide content without requiring code changes
4. Provide navigation between guides and sections within guides
5. Implement an auto-generated table of contents for each guide

## Technical Architecture

### Directory Structure
```
/content
  /guides
    /guide-1
      index.md         # Main guide page with overview
      section-1.md     # Individual section of the guide
      section-2.md
      ...
    /guide-2
      index.md
      section-1.md
      ...
    ...
```

### Data Model

**Guide**
- title: string
- slug: string (derived from directory name)
- description: string
- sections: Section[]

**Section**
- title: string
- slug: string (derived from filename)
- content: string (markdown content)

### Routes
- `/resources/guides` - Main guides listing page
- `/resources/guides/[guide-slug]` - Individual guide page
- `/resources/guides/[guide-slug]/[section-slug]` - Individual section page (optional, could be implemented as anchor links within the guide page)

## Feature Requirements

### 1. Guides Directory Scanning System
- The system must scan the `/content/guides` directory to identify available guides
- Each subdirectory represents a single guide
- Within each guide directory, `index.md` serves as the main guide page
- Additional `.md` files in the guide directory represent sections

### 2. Markdown Processing
- Process Markdown content with appropriate libraries (e.g., MDX or gray-matter)
- Support for metadata in frontmatter (title, description, date, author, etc.)
- Support for basic Markdown features (headings, lists, links, images, code blocks)
- Support for embedding components within Markdown (optional)

### 3. Guides Listing Page
- Display a list of all available guides
- For each guide, show:
  - Title
  - Brief description
  - Link to the guide

### 4. Individual Guide Page
- Display the guide title and content from `index.md`
- Generate and display a table of contents based on the available sections
- Provide navigation to move between sections
- Show section links in a sidebar

### 5. Section Navigation
- Auto-generate a table of contents based on headings in the Markdown content
- Provide a sidebar for navigating between sections
- Implement smooth scrolling to section anchors

### 6. Responsive Design
- All pages must be responsive and work well on mobile devices
- Sidebar navigation should collapse on smaller screens

### 7. Accessibility
- All components must be accessible according to WCAG standards
- Proper heading structure
- Keyboard navigation support
- Appropriate aria attributes

## Technical Implementation

### 1. File System Integration
- Use Next.js's file system API to read Markdown files
- Implement caching to improve performance
- Set up appropriate error handling for missing files

### 2. Markdown Processing Pipeline
- Parse frontmatter for metadata
- Convert Markdown to HTML
- Process links to ensure they work correctly within the application
- Optionally: support for custom components within Markdown

### 3. Static Generation vs. Server-Side Rendering
- Use Static Site Generation (SSG) for the guides listing page
- Use dynamic routes with SSG for individual guide pages
- Implement Incremental Static Regeneration (ISR) to update content periodically

### 4. Data Fetching and Caching
- Implement efficient data fetching strategy
- Use caching to improve performance
- Consider using Content Delivery Networks (CDN) for assets

## Technical Stack

### Required Libraries
- **gray-matter**: For parsing frontmatter in Markdown files
- **remark** / **rehype**: For processing Markdown and converting to HTML
- **next-mdx-remote** or **mdx-bundler**: For MDX support (optional)
- **tailwindcss**: For styling components

## Acceptance Criteria

1. Users can navigate to `/resources/guides` and see a list of all available guides
2. Users can click on a guide to view its contents
3. The guide page displays a table of contents and navigation between sections
4. Adding or modifying Markdown files updates the site content without code changes
5. The system gracefully handles missing or malformed content files
6. All pages are responsive and accessible

## Stretch Goals

1. Search functionality for finding guides by keyword
2. Filter guides by category or tag
3. Support for embedding interactive components within guides
4. Versioning of guides
5. User feedback/rating system for guides
6. Print-friendly view for guides

## Implementation Phases

### Phase 1: Core Infrastructure
- Set up directory structure
- Implement basic Markdown processing
- Create routes for guides listing and individual guides

### Phase 2: User Interface
- Develop guide listing page
- Create individual guide page with navigation
- Implement responsive design

### Phase 3: Enhanced Features
- Add table of contents generation
- Implement section navigation
- Add metadata support (author, date, etc.)

### Phase 4: Refinement
- Optimize performance
- Improve accessibility
- Add any stretch goal features
