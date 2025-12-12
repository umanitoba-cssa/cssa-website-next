# Creating New Guides

This document explains the process for creating new guides for the CSSA website. It covers the directory structure, file formatting, and content requirements.

## Guide Directory Structure

All guides must be created in the `src/content/guides` directory at the project root. Each guide requires the following structure:

```
src/content/guides/
  └── your-guide-name/
      ├── index.md       # Main guide overview page
      ├── section-1.md   # First section of the guide
      ├── section-2.md   # Second section of the guide
      └── ...            # Additional sections as needed
```

Requirements:

- The guide directory name (`your-guide-name`) will be used as the URL slug
- Each guide must have an `index.md` file as the main entry point
- Section files should use descriptive names that will become URL slugs

## Frontmatter Format

All Markdown files (both `index.md` and section files) must include frontmatter metadata at the top of the file. The frontmatter is enclosed with triple dashes `---` and uses YAML syntax.

### Required Frontmatter Fields

For `index.md`:

```yaml
---
title: 'Your Guide Title'
description: 'A brief description of what the guide covers'
author: 'Your Name' # Optional
date: '2023-05-01' # Optional, format: YYYY-MM-DD
---
```

For section files:

```yaml
---
title: 'Section Title'
description: 'Brief description of this section'
author: 'Your Name' # Optional
date: '2023-05-01' # Optional, format: YYYY-MM-DD
---
```

- `title`: Required. The title of the guide or section
- `description`: Required. A brief description for metadata and previews
- `author`: Optional. The name of the author
- `date`: Optional. The last updated date in YYYY-MM-DD format

## File Naming Convention

- Use kebab-case for all directory and file names (lowercase with hyphens)
- Avoid spaces, underscores, or special characters
- Make names descriptive but concise
- Examples:
    - ✅ `getting-started`
    - ✅ `how-to-create-a-resume`
    - ❌ `Guide 1` (contains spaces)
    - ❌ `Resume_Guide` (contains uppercase and underscore)

## Guide Content

After the frontmatter, add your Markdown content. The system supports standard Markdown syntax with some extensions:

### Main Guide (`index.md`)

The `index.md` file should contain:

1. A comprehensive introduction to the guide topic
2. An overview of what will be covered in each section
3. Any prerequisites or requirements
4. A concise but informative body

Example:

```markdown
---
title: 'Getting Started with Computer Science'
description: "A beginner's guide to studying computer science at the university"
author: 'CSSA Team'
date: '2023-05-20'
---

# Getting Started with Computer Science

This guide will help new computer science students navigate their first year at the university.

## What You'll Learn

- How to set up your development environment
- Essential programming concepts
- Time management and study tips
- Resources for further learning

[Additional content here...]
```

### Section Files

Each section file should be focused on a specific topic, with:

1. A clear introduction to the section topic
2. Well-structured content with appropriate headings
3. Visuals (images, diagrams) where helpful
4. Code examples where applicable
5. Links to additional resources

## Adding Images

Images for guides should be stored in the `public/img/guides` directory. You can reference them in your Markdown using either relative or absolute paths.

### Image Path Examples

Using absolute path (recommended):

```markdown
![Description of image](/img/guides/my-image.png)
```

Using relative path (automatically converted to absolute):

```markdown
![Description of image](my-image.png)
```

For guide-specific images, it's recommended to create a subdirectory with the same name as your guide:

```
public/img/guides/
  └── your-guide-name/
      ├── image1.png
      ├── image2.jpg
      └── ...
```

Then reference the images as:

```markdown
![Description](/img/guides/your-guide-name/image1.png)
```

## Section Ordering

Section files are displayed in alphabetical order based on their filenames. To control the order:

1. Use numeric prefixes:
    - `01-introduction.md`
    - `02-setup.md`
    - `03-advanced-topics.md`

2. Or use priority-based naming:
    - `a-introduction.md`
    - `b-setup.md`
    - `c-advanced-topics.md`

## Cross-Linking Between Guides and Sections

You can link to other guides or sections using relative or absolute paths.

### Linking Examples

Link to another guide:

```markdown
[See our Resume Guide](/resources/guides/resume-guide)
```

Link to a section within the same guide:

```markdown
[Check out the setup instructions](setup)
```

Link to a section in another guide:

```markdown
[Learn about interviews](/resources/guides/job-hunting/interviews)
```

## Publishing a New Guide

To publish a new guide:

1. Create the guide directory structure as outlined above
2. Add all required files with proper frontmatter
3. Add any images to `public/img/guides/`
4. Commit the changes to the repository
5. The guide will be automatically available on the website after deployment
