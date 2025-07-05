# Guide Synchronization System

This system synchronizes guides from external GitHub repositories into the local `/src/content/guides/` directory. **Sync is now manual-only or webhook-driven to prevent unnecessary API calls.**

## How it Works

1. **Configuration**: Guides are configured in `/src/data/guides.ts` with a slug and repository URL
2. **Manual Sync**: The system fetches the latest content from the `release` branch of each repository when triggered
3. **Dynamic Loading**: Guides are automatically available in the website once synced

## Configuration

Add new guides to the `GuideList` array in `/src/data/guides.ts`:

```typescript
const GuideList: IGuideList[] = [
    {
        slug: 'first-year-guide',
        repoURL: 'https://github.com/umanitoba-cssa/first-year-guide',
    },
    {
        slug: 'second-year-guide',
        repoURL: 'https://github.com/umanitoba-cssa/second-year-guide',
    },
    // Add more guides here...
]
```

## Quick Start

### 1. Initial sync (required)
```bash
bun run sync-guides
```
Run this once to initially sync all guides to your local development environment.

### 2. Optional: Set up webhook automation
```bash
bun run setup-webhook-sync
```

### 3. Follow the printed instructions to:
- Create a GitHub Personal Access Token
- Add the token to each guide repository
- Copy the webhook workflow to each guide repository

### 4. Test the webhook setup
Make a change to any guide repository and push to see the automatic sync in action!

## Manual Sync

### Sync All Guides
```bash
bun run sync-guides
```

### Sync Specific Guide
```bash
bun run sync-guides guide-slug
```

## Sync Options

The system supports two sync approaches:

### 1. Manual Sync (Always Available)
- **Full Control**: Use `bun run sync-guides` to sync when needed
- **Specific Guide**: Use `bun run sync-guides guide-slug` to sync one guide
- **No Auto-sync**: Auto-sync has been disabled to prevent unnecessary API calls

### 2. Repository Webhooks (Recommended for Automation)
- **Instant Sync**: Triggers sync immediately when guide repositories are updated
- **Efficient**: Only syncs the specific guide that was updated
- **Reliable**: Doesn't depend on scheduled runs or page visits

## Setting Up Repository Webhooks

### Step 1: Create a Personal Access Token
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Create a token with `repo` and `workflow` permissions
3. Name it something like "CSSA Website Sync Token"

### Step 2: Add Token to Guide Repositories
1. In each guide repository, go to Settings → Secrets and variables → Actions
2. Add a new repository secret called `WEBSITE_REPO_TOKEN`
3. Set the value to your personal access token

### Step 3: Add Workflow to Guide Repositories
Copy the workflow from `.github/workflows/guide-repo-notify.yml` to each guide repository.

This workflow will automatically trigger the website sync whenever:
- Code is pushed to the `main` or `release` branch
- A new release is published
- The workflow is manually triggered

## Manual Sync Commands

### Sync All Guides
```bash
bun run sync-guides
```

### Sync Specific Guide
```bash
bun run sync-guides first-year-guide
```

### Sync by Repository (used by webhooks)
```bash
bun run scripts/sync-specific-guide.js owner/repo-name
```

## Repository Requirements

Guide repositories should follow this structure:
- Use the `release` branch for stable content
- Include an `index.md` file as the main guide page
- Use standard Markdown files for sections
- Include frontmatter with title, description, author, and date
- **Images**: Place images anywhere in the repository - they will be automatically synced to `/public/img/guides/[slug]/`

Example `index.md` frontmatter:
```markdown
---
title: "Guide Title"
description: "Brief description of the guide"
author: "Author Name"
date: "2023-06-29"
---
```

### Image Usage in Guides

Images from your guide repositories will be automatically synced to `/public/img/guides/[slug]/`. You can reference them in your markdown using:

```markdown
![Alt text](image.jpg)
```

The system will automatically convert relative image paths to the correct absolute paths when rendering.

## Features

- **Manual Control**: Guides only sync when explicitly requested via manual commands or webhooks
- **Error Handling**: Gracefully handles network issues and repository access problems
- **Flexible Structure**: Supports any markdown-based guide structure
- **Image Support**: Automatically syncs and processes images from guide repositories
- **Frontmatter Support**: Extracts metadata from markdown frontmatter
- **Relative Path Processing**: Converts relative image paths to absolute paths automatically
- **Webhook Support**: Instant sync when guide repositories are updated

## Branching Strategy

The sync system uses a two-branch workflow for controlled deployments:

### Main Branch (Development)
- **Automatic Sync**: Guide updates are automatically committed and pushed to `main`
- **Immediate Integration**: Latest guide content is available for development/testing
- **No Manual Intervention**: Sync happens automatically via webhooks or manual triggers

### Release Branch (Production)
- **PR Creation**: After syncing to `main`, a PR is automatically created from `main` to `release`
- **Manual Review**: PRs require review and approval before merging
- **Controlled Deployment**: Only reviewed changes make it to production

### Workflow Process
1. Guide repository is updated → Webhook triggers sync
2. Sync commits new content directly to `main` branch
3. PR is automatically created from `main` to `release`
4. Review and merge PR when ready to deploy changes

## File Structure

```
src/
├── content/
│   └── guides/
│       └── [slug]/
│           ├── index.md
│           └── [section].md
├── data/
│   └── guides.ts        # Guide configuration
├── lib/
│   ├── github-sync.ts   # Sync functionality
│   └── mdx.ts          # MDX processing
├── scripts/
│   └── sync-guides.js   # CLI sync tool
└── ...

public/
├── img/
│   └── guides/
│       └── [slug]/
│           └── [images]  # Synced images from repositories
└── ...
```