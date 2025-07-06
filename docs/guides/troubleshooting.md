# Troubleshooting Guide

This document provides solutions for common issues that may arise when working with the Guides system.

## Content Issues

### Guide Not Appearing in Listing

**Symptoms**:
- Guide directory exists but doesn't appear on the guides listing page

**Possible Causes**:
1. Missing or improperly formatted `index.md` file
2. Invalid frontmatter in `index.md`
3. Directory name contains invalid characters

**Solutions**:
1. Ensure the guide directory contains an `index.md` file
2. Verify that `index.md` has proper frontmatter with required fields
3. Check that the directory name uses kebab-case (lowercase with hyphens)
4. Restart the development server to clear caches

### Section Not Appearing in Guide Sidebar

**Symptoms**:
- Section file exists but doesn't appear in the guide's sidebar navigation

**Possible Causes**:
1. File doesn't have `.md` extension
2. Invalid frontmatter in the section file
3. File name contains invalid characters

**Solutions**:
1. Ensure section file has `.md` extension
2. Verify that the section file has proper frontmatter
3. Check that the file name uses kebab-case (lowercase with hyphens)
4. Ensure the file is in the correct guide directory

### Markdown Content Not Rendering Correctly

**Symptoms**:
- Content appears as raw Markdown
- Elements aren't styled as expected
- Images or links don't work

**Possible Causes**:
1. Syntax errors in Markdown
2. Unsupported Markdown features
3. Invalid HTML mixed with Markdown
4. Incorrect image paths

**Solutions**:
1. Validate Markdown syntax using a linter or online checker
2. Check supported Markdown features in the `markdown-features.md` document
3. Remove or fix HTML elements with invalid attributes
4. Ensure image paths are correct and images exist in the expected location

## Rendering Issues

### Images Not Displaying

**Symptoms**:
- Images appear as broken links
- Images display but are missing or wrong

**Possible Causes**:
1. Incorrect image path
2. Image file doesn't exist in the expected location
3. Case sensitivity issues in image paths
4. Unsupported image format

**Solutions**:
1. Verify image paths in Markdown content (use absolute paths starting with `/img/guides/`)
2. Check that images exist in the `public/img/guides` directory
3. Ensure image file extensions match exactly (case sensitive)
4. Use web-friendly formats like PNG, JPG, or WebP

### Code Syntax Highlighting Not Working

**Symptoms**:
- Code blocks display without syntax coloring
- Code formatting looks incorrect

**Possible Causes**:
1. Missing or incorrect language identifier
2. Unsupported language
3. Invalid code syntax

**Solutions**:
1. Ensure code blocks include language identifier (e.g., ```javascript)
2. Check the supported languages list in `markdown-features.md`
3. Verify code syntax is valid for the specified language
4. Use inline code (``) for short snippets rather than code blocks

### Table of Contents Not Generating

**Symptoms**:
- Table of contents is empty or missing headings

**Possible Causes**:
1. No headings in the Markdown content
2. Headings with invalid formatting
3. Headings with special characters

**Solutions**:
1. Add proper headings to your content using # syntax
2. Ensure headings follow Markdown format (space after #)
3. Avoid special characters or HTML in heading text
4. Use a hierarchical heading structure (h1 → h2 → h3)

## Navigation Issues

### Links Between Guides or Sections Not Working

**Symptoms**:
- Links to other guides or sections result in 404 errors

**Possible Causes**:
1. Incorrect link paths
2. Missing or renamed target guides/sections
3. Case sensitivity issues in slugs

**Solutions**:
1. Use correct link format for internal links:
   - For another guide: `/resources/guides/guide-slug`
   - For a section in the same guide: `section-slug`
   - For a section in another guide: `/resources/guides/guide-slug/section-slug`
2. Verify that target guides and sections exist
3. Ensure slugs match exactly (case sensitive)

### Breadcrumb Navigation Incorrect

**Symptoms**:
- Breadcrumbs show wrong path
- Breadcrumb links don't work

**Possible Causes**:
1. Incorrect guide or section metadata
2. Routing issues

**Solutions**:
1. Verify guide and section title metadata in frontmatter
2. Check the URL structure matches expected routes
3. Ensure guide and section slugs are valid

## Performance Issues

### Slow Page Loading

**Symptoms**:
- Guide pages take a long time to load
- Content flashes or appears in stages

**Possible Causes**:
1. Large or unoptimized images
2. Excessive content in a single section
3. Too many code blocks or complex elements

**Solutions**:
1. Optimize images (compress, resize) before adding to the guides
2. Break very long content into multiple sections
3. Minimize the use of complex HTML elements
4. Consider using Next.js optimized images for critical visuals

### Build-time Errors

**Symptoms**:
- Build fails with errors related to guides content
- Static generation errors for guide pages

**Possible Causes**:
1. Invalid guide structure
2. Frontmatter parsing issues
3. File system permission problems

**Solutions**:
1. Validate all guide directories follow the correct structure
2. Check frontmatter syntax in all Markdown files
3. Ensure proper file permissions for content directory
4. Look for specific error messages in build logs

## Development Environment Issues

### Content Changes Not Reflecting

**Symptoms**:
- Updates to guide content don't appear in the browser

**Possible Causes**:
1. Caching issues
2. File didn't save properly
3. Next.js incremental static regeneration delay

**Solutions**:
1. Hard refresh the browser (Ctrl+F5 or Cmd+Shift+R)
2. Ensure file changes are saved
3. Restart the development server
4. Clear browser cache

### Path Resolution Problems

**Symptoms**:
- Guide system can't find files that should exist

**Possible Causes**:
1. Case sensitivity issues (especially when developing across different OS platforms)
2. Path format inconsistencies

**Solutions**:
1. Use consistent casing for all file and directory names
2. Standardize on forward slashes for paths
3. Avoid spaces and special characters in file names
4. Keep paths relative to the project root

## Advanced Troubleshooting

### Debugging the Guide System

If you encounter persistent issues:

1. **Debug Logging**: Add console.log statements in `src/lib/mdx.ts` to trace:
   - Directory scanning results
   - Frontmatter parsing
   - Content processing steps

2. **Content Validation**:
   - Create a simple test guide with minimal content to verify the system works
   - Gradually add features to isolate problem areas

3. **Component Inspection**:
   - Use browser developer tools to inspect rendered HTML
   - Check for CSS conflicts or styling issues
   - Verify props are correctly passed to components

4. **File System Checks**:
   - Verify file permissions
   - Check for hidden files that might interfere with directory scanning
   - Ensure line endings are consistent (LF vs CRLF issues)

## Getting Help

If you've tried the troubleshooting steps and still have issues:

1. Check the project's GitHub issues for similar problems
2. Provide the following when seeking help:
   - Exact error messages
   - Steps to reproduce the issue
   - Details of your environment (OS, Node version)
   - Code snippets or Markdown content causing problems 