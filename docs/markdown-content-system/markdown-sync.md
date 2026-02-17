# Syncing Markdown Repositories

## Commands

- `bun run sync-markdown`
    - Gets the latest content from **all** markdown directory submodules
- `bun run sync-markdown <markdown-slug>`
    - Gets the latest content from the markdown directory submodule
      corresponding to the provided markdown slug
    - e.g. `bun run sync-markdown general-meeting`


## What The Syncing Script Does

1. The scripts loops over the MarkdownPart's found in `src/data/resources.ts`

2. It creates submodules for them in `src/content/` if they don't already exist

3. It retrieves the latest data from each submodule's remote repository

4. It copies any images found in the submodule directories to their
   corresponding directory in `public/img/`

Note: Since Guides each have their own repo, custom logic was added so all
their submodules live inside `src/content/guides/`


## About Submodules

The current submodules can be found by running `cat .gitmodules`:

```
[submodule "src/content/guides/first-year-guide"]
	path = src/content/guides/first-year-guide
	url = https://github.com/umanitoba-cssa/first-year-guide
[submodule "src/content/guides/second-year-guide"]
	path = src/content/guides/second-year-guide
	url = https://github.com/umanitoba-cssa/second-year-guide
[submodule "src/content/general-meeting"]
	path = src/content/general-meeting
	url = https://github.com/umanitoba-cssa/general-meeting
```

These refer to remote repositories; the content within them is not tracked
by the `cssa-website-next` repo, except for their images, which are copied to the
`public/img/` directory upon syncing.
