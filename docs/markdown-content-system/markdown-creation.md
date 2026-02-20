# Creating New Markdown Content

## General Meetings

To add new notes from a CSSA General Meeting, you must first ensure that these
notes meeting the following requirements:

1. The notes are within their own semester folder in the
   [general-meeting](https://github.com/umanitoba-cssa/general-meeting)
   Repository. For instance: `fall-2025/`:

```bash
general-meeting/fall-2025
├── 1-committees.md
├── 2-events-and-workshops.md
├── 3-lounge.md
├── 4-merch.md
├── 5-ssa-constitution-changes.md
├── img-agenda.png
├── img-committees.png
├── img-constitution-changes.png
├── img-end.png
├── img-lounge.png
├── img-merch.png
├── img-office-hours.png
├── img-office-hours-schedule.png
├── img-title.png
├── img-upcoming-events.png
└── index.md
```

- Try to follow the convention of numbering the markdown files to preserve
  order. If you need more than 1 digit, name them `01-file.md`, `02-file.md`,
  ..., `10-file.md`, etc.
- Try to follow the convention of prefixing image names with `img-`

2. The notes contain an `index.md` file with the format:

```markdown
---
title: "Fall 2025 General Meeting"
description: "General Meeting Summary & Mixer"
author: "Computer Science Students' Association"
date: "2025-10-08"
geometry: margin=1in
---

![Title](img-title.png)

![Agenda](img-agenda.png)

## Table of Contents

1. [Committees](./1-committees)
2. [Events and Workshops](./2-events-and-workshops)
3. [Lounge](./3-lounge)
4. [Merch](./4-merch)
5. [SSA Constitution Changes](./5-ssa-constitution-changes)
```

- Have preamble/frontmatter at the top with, at the least, a title, author, and date
- Have a table of contents linking to each other markdown file in the directory
- Images aren't necessary

3. All other markdown files must also follow the aforementioned preamble format

- See the above `index.md` example as to how you would add images or links to
  other sections if desired.

4. Once the files are of the required format, push them to the `main` branch of
   the `general-meeting` repo

5. Finally, navigate to the `cssa-website-next` repo and run `bun run sync-markdown`

- This will sync all submodules (including the general-meeting repo)
- Then you may stage and commit the new files/info however you please


## Guides vs General Meeting Notes

The only difference between Guides and General Meeting notes is that each Guide
has its own dedicated repository, whereas all General Meeting notes live under
the same repo, but each have their own folder within that repo.


## Guides

To add a new Guide, you must do the following:

1. Create a new repository that contains all the desired markdown files and image files.

- These markdown files will follow the same format as described above for General Meetings
- Again, try to follow both naming conventions and preamble format as best you can
    - This includes the `index.md` file, very important

2. Push all changes to the `main` branch of the new repo

3. Add a new entry to the `GuideList`, found in `src/data/resources.ts`, for reference:

```ts
export const GuideList: IMarkdownRepoList[] = [
    {
        slug: 'first-year-guide',
        repoURL: 'https://github.com/umanitoba-cssa/first-year-guide',
    },
    {
        slug: 'second-year-guide',
        repoURL: 'https://github.com/umanitoba-cssa/second-year-guide'
    },
]
```

- `slug` should be the repository name, typically. It will appear in URL navigate
- `repoURL` is self explanatory

4. Run `bun run sync-markdown`, and stage and commit the changes however you please


## Other Markdown / Future Development

It is possible the CSSA will wish to add more markdown rendering to the
website, that is not General Meeting notes nor more Guides. These steps
will walk through adding this new content to the website.

1. Create a repository that will contain all the markdown.

- This will be analogous to the `general-meeting` repo in terms of format, for
  ease of writing I'll refer to this repo slug/name as `new-repo`
- Have one folder for each section of notes. E.g. `section1/` with all the
  desired markdown and image files.
- Ensure that the files in each folder follow the required format and naming
  conventions described above.
- Push the files to the `main` branch of this new repo

2. Create and add a new entry to `MarkdownRepoList` in `src/data/resources.ts`, for instance:

```ts
export const MarkdownRepoList: IMarkdownRepoList[] = [
    {
        slug: 'general-meeting',
        repoURL: 'https://github.com/umanitoba-cssa/general-meeting'
    },
    {
        slug: 'new-repo',
        repoURL: 'https://github.com/umanitoba-cssa/new-repo'
    },
]
```

3. Run `bun run sync-markdown` or `bun run sync-markdown 'new-repo'`

4. Create your page that intends to list all available docs within your new
   repo, and add logic to retrieve the relevant information:

```tsx
import { getAllMarkdown } from '@/lib/mdx';

export default async function MyPage() {
  const myMarkdownDocs = await getAllMarkdown("new-repo");

  return (
    <main>
        <MarkdownList myMarkdownDocs={meetings} href="/resources/new-repo" />
    </main>
  );
} 
```

5. Create the necessary subdirectories to allow dynamic navigation:

```bash
src/app/wherever/your/page/is
├── layout.tsx  // Copy the layout.tsx file from either the guides/ or general-meeting/ directory
├── page.tsx    // The page we made in step 4
└── [markdown-slug]/
    ├── page.tsx         // I'll refer to this as the "Markdown Page"
    └── [section-slug]/
        └── page.tsx     // I'll refer to this as the "Section Page"
```

6. In the Markdown Page, you can mostly copy the one found in
   `src/app/resources/general-meeting/[markdown-slug]/page.tsx`

- Change `contentDir` to be your new slug, e.g. "new-repo"
- Change any text with "meeting" to be relevant to the docs you are adding,
  e.g. variations of "new repo", "NewRepo", "New repo", etc.
    - this is because this is simply not for meetings; it's for your new data

7. In the Section Page, you can mostly copy the one found in
   `src/app/resources/general-meeting/[markdown-slug]/[section-slug]/page.tsx`

- Change `contentDir` to be your new slug, e.g. "new-repo"
- Change any text with "meeting" to be relevant to the docs you are adding,
  e.g. variations of "new repo", "NewRepo", "New repo", etc.
    - this is because this is simply not for meetings; it's for your new data

8. That's it!
