# Supported Markdown Features

This document outlines the Markdown features supported by the Guides system. The Guides system uses `remark` and `remark-html` to convert Markdown to HTML, with additional plugins for enhanced functionality.

## Basic Formatting

### Headings

```markdown
# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6
```

### Text Formatting

```markdown
*Italic text* or _Italic text_
**Bold text** or __Bold text__
***Bold and italic text*** or **_Bold and italic text_**
~~Strikethrough text~~
```

### Lists

Unordered lists:

```markdown
- Item 1
- Item 2
    - Nested item 2.1
    - Nested item 2.2
- Item 3
```

Ordered lists:

```markdown
1. First item
2. Second item
    1. Nested item 2.1
    2. Nested item 2.2
3. Third item
```

### Blockquotes

```markdown
> This is a blockquote
> It can span multiple lines
>
> And can have multiple paragraphs
```

### Horizontal Rules

```markdown
---
```

## Links and References

### Inline Links

```markdown
[Link text](https://example.com)
[Link with title](https://example.com 'Title text')
```

### Reference Links

```markdown
[Reference link][ref]

[ref]: https://example.com 'Optional title'
```

### Internal Links

Links to other guides or sections:

```markdown
[Link to another guide](/resources/guides/guide-slug)
[Link to a section within this guide](section-slug)
[Link to a section in another guide](/resources/guides/guide-slug/section-slug)
```

## Code

### Inline Code

```markdown
Use the `console.log()` function to log messages.
```

### Code Blocks

Fenced code blocks with syntax highlighting:

````markdown
```javascript
function example() {
    console.log('Hello, world!');
}
```
````

````

Supported languages for syntax highlighting include:
- javascript/js
- typescript/ts
- jsx
- tsx
- html
- css
- python
- java
- c
- cpp
- rust
- go
- json
- yaml
- bash/shell
- sql
- and more

## Images

### Basic Image Syntax

```markdown
![Alt text](/img/guides/image.png)
![Alt text with title](/img/guides/image.png "Image title")
````

### Image Sizing

Currently, image sizing is controlled via CSS. The Markdown image syntax doesn't support width/height attributes directly.

## Tables

GitHub Flavored Markdown (GFM) table syntax is supported:

```markdown
| Header 1 | Header 2 | Header 3 |
| -------- | -------- | -------- |
| Row 1    | Data     | Data     |
| Row 2    | Data     | Data     |
```

Alignment can be specified:

```markdown
| Left-aligned | Center-aligned | Right-aligned |
| :----------- | :------------: | ------------: |
| Left         |     Center     |         Right |
| Left         |     Center     |         Right |
```

## Other GFM Features

### Task Lists

```markdown
- [x] Completed task
- [ ] Incomplete task
- [ ] Another task
```

### Automatic URL Linking

Plain URLs will be automatically converted to links:

```markdown
https://example.com
```

### Footnotes

```markdown
Here is a sentence with a footnote.[^1]

[^1]: This is the footnote content.
```

## HTML in Markdown

Limited HTML is supported within Markdown:

```markdown
<div class="custom-class">
  This is custom HTML content.
</div>
```

**Important Notes on HTML in Markdown:**

1. HTML in Markdown is sanitized for security reasons
2. Style attributes are stripped from HTML elements
3. Avoid complex HTML structures as they may not render as expected
4. For complex layouts, consider using Markdown for content and creating specialized components

## Limitations and Unsupported Features

The following features are not currently supported:

1. **Markdown Extensions**: The system does not support custom Markdown extensions like `::: custom` blocks
2. **Math/LaTeX Equations**: No built-in support for mathematical equations
3. **Embedded Components**: Cannot embed React components directly in Markdown
4. **Interactive Elements**: No support for interactive elements beyond basic HTML
5. **Custom Attributes**: Markdown elements cannot have custom attributes

## Best Practices

1. **Use Headings Correctly**: Start with H1 (`#`), and use H2 (`##`) for main sections, H3 (`###`) for subsections
2. **Keep Formatting Simple**: Stick to basic formatting for best compatibility
3. **Image Paths**: Use absolute paths for images (`/img/guides/...`) for most reliable results
4. **Regular Testing**: Verify your Markdown renders correctly after adding new content
5. **Code Highlighting**: Always specify the language for code blocks for proper syntax highlighting
6. **Limit HTML Usage**: Use HTML only when Markdown syntax is insufficient
7. **Document Structure**: Use headings to create a logical structure for automatic table of contents generation
