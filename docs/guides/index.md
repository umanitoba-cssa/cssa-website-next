# Guides System Documentation

Welcome to the CSSA Website Guides system documentation. This documentation covers all aspects of the Guides system, from its architecture to how to create and maintain guide content.

## Documentation Contents

1. **[Overview](./overview.md)** - System architecture and core functionality
2. **[Guide Creation](./guide-creation.md)** - How to create and structure guides
3. **[Markdown Features](./markdown-features.md)** - Supported Markdown syntax and features
4. **[Components](./components.md)** - UI components used to render guides
5. **[Troubleshooting](./troubleshooting.md)** - Solving common issues

## Quick Start

If you're new to the Guides system and want to add content:

1. Review the **[Overview](./overview.md)** to understand how the system works
2. Follow the instructions in **[Guide Creation](./guide-creation.md)** to add your guide
3. Refer to **[Markdown Features](./markdown-features.md)** for formatting options
4. Check **[Troubleshooting](./troubleshooting.md)** if you encounter any issues

## System Purpose

The Guides system provides a structured way to create and maintain educational content for computer science students. Key features include:

- File-based content management using Markdown
- Automatic navigation generation
- Syntax highlighting for code examples
- Responsive design for all devices
- Dynamic table of contents

## Directory Structure

- `src/content/guides/` - Where guide content is stored
- `public/img/guides/` - Images for guides
- `src/app/resources/guides/` - Route implementation
- `src/components/guides/` - UI components for rendering guides
- `src/lib/mdx.ts` - Core utilities for processing Markdown

## Maintenance and Development

For developers maintaining or extending the Guides system:

1. Understand the component architecture in **[Components](./components.md)**
2. Familiarize yourself with the MDX utilities in `src/lib/mdx.ts`
3. Follow the established patterns when adding new features
4. Test thoroughly across different devices and browsers
5. Document any changes to the system architecture or API

## Best Practices

- Keep guide content focused and well-structured
- Use descriptive file and directory names
- Include meaningful metadata in frontmatter
- Optimize images before adding them to guides
- Follow accessibility guidelines for content
- Test guide rendering on various screen sizes

---

This documentation is maintained by the CSSA Website development team. For questions or assistance, please contact the team through the appropriate channels.
