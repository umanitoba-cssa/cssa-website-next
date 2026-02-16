#!/usr/bin/env bun

import { spawn, execSync } from "child_process";
import { GuideList, MeetingList } from '../src/data/resources.ts';

function run(cmd: string[], cwd = process.cwd()) {
  return new Promise<void>((resolve, reject) => {
    const p = spawn(cmd[0], cmd.slice(1), {
      cwd,
      stdio: "inherit",
      shell: true, // needed for some Bun/Windows environments
    });

    p.on("close", code => {
      if (code === 0) resolve();
      else reject(new Error(`Command failed: ${cmd.join(" ")}`));
    });
  });
}

/**
 * Check if a submodule exists (i.e., already added)
 */
function gitSubmoduleExists(path: string): boolean {
  try {
    const output = execSync("git submodule status", { encoding: "utf-8" });
    return output
      .split("\n")
      .some(line => line.includes(path));
  } catch {
    return false;
  }
}

/**
 * Ensure a submodule exists; if not, add it
 */
async function ensureSubmodule(slug: string, repoURL: string, folder?: string) {
  const submodulePath = folder ? `src/content/${folder}/${slug}` : `src/content/${slug}`;

  if (!gitSubmoduleExists(submodulePath)) {
    console.log(`Submodule for ${slug} does not exist. Adding it...`);
    await run(["git", "submodule", "add", repoURL, submodulePath]);
    console.log(`Submodule ${slug} added.`);
  } else {
    console.log(`Submodule ${slug} already exists.`);
  }
}

/**
 * Update a submodule (pull latest commit)
 */
async function updateSubmodule(slug: string, folder?: string) {
  const submodulePath = folder ? `src/content/${folder}/${slug}` : `src/content/${slug}`;
  console.log(`Updating submodule ${slug}...`);
  await run(["git", "submodule", "update", "--remote", "--merge", submodulePath]);
  console.log(`Submodule ${slug} updated.`);
}

async function main() {
  const args = process.argv.slice(2);

  // Combine both lists if you want to handle guides + meetings together
  const markdownLists = [...GuideList, ...MeetingList];

  if (args.length === 0) {
    console.log("Ensuring all submodules exist and updating them...");

    for (const item of MeetingList) {
      await ensureSubmodule(item.slug, item.repoURL);
      await updateSubmodule(item.slug);
    }
    for (const item of GuideList) {
      await ensureSubmodule(item.slug, item.repoURL, "guides");
      await updateSubmodule(item.slug, "guides");
    }

  } else if (args.length === 1) {
    const slug = args[0];
    const item_m = MeetingList.find(m => m.slug === slug);
    const item_g = GuideList.find(m => m.slug === slug);
    if (!item_m && !item_g) {
      console.error(`No entry found for slug: ${slug}`);
      process.exit(1);
    }

    if (item_m) {
      await ensureSubmodule(item.slug, item.repoURL);
      await updateSubmodule(item.slug);
    } else {
      await ensureSubmodule(item.slug, item.repoURL, "guides");
      await updateSubmodule(item.slug, "guides");
    }

  } else {
    console.log("Invalid number of parameters provided.");
    process.exit(1);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
