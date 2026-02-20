#!/usr/bin/env bun

import { spawn, execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { GuideList, MarkdownRepoList } from '../src/data/resources';

function run(cmd: string[], cwd = process.cwd()) {
    return new Promise<void>((resolve, reject) => {
        const p = spawn(cmd[0], cmd.slice(1), {
            cwd,
            stdio: 'inherit',
            shell: true, // needed for some Bun/Windows environments
        });

        p.on('close', (code) => {
            if (code === 0) resolve();
            else reject(new Error(`Command failed: ${cmd.join(' ')}`));
        });
    });
}

/**
 * Check if a submodule exists
 */
function gitSubmoduleExists(path: string): boolean {
    try {
        const output = execSync('git submodule status', { encoding: 'utf-8' });
        return output.split('\n').some((line) => line.includes(path));
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
        await run(['git', 'submodule', 'add', repoURL, submodulePath]);
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
    await run(['git', 'submodule', 'update', '--remote', '--merge', submodulePath]);
    console.log(`Submodule ${slug} updated.`);
}

/**
 * Recursively copy images from source to destination
 */
function copyImages(srcDir: string, destDir: string) {
    if (!fs.existsSync(srcDir)) return;

    const files = fs.readdirSync(srcDir, { withFileTypes: true });
    for (const file of files) {
        const srcPath = path.join(srcDir, file.name);
        const destPath = path.join(destDir, file.name);

        if (file.isDirectory()) {
            copyImages(srcPath, destPath); // recurse
        } else if (/\.(png|jpg|jpeg|gif|svg|webp|bmp)$/i.test(file.name)) {
            // Ensure destination folder exists
            fs.mkdirSync(path.dirname(destPath), { recursive: true });
            fs.copyFileSync(srcPath, destPath);
            console.log(`Copied image: ${destPath}`);
        }
    }
}

/**
 * Copy all images from a submodule to /public/img
 */
function syncImages(slug: string, folder?: string) {
    const contentPath = folder ? `src/content/${folder}/${slug}` : `src/content/${slug}`;
    const publicPath = folder ? `public/img/${folder}/${slug}` : `public/img/${slug}`;

    copyImages(contentPath, publicPath);
}

async function main() {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.log('Ensuring all submodules exist and updating them...');

        for (const item of MarkdownRepoList) {
            await ensureSubmodule(item.slug, item.repoURL);
            await updateSubmodule(item.slug);
            syncImages(item.slug); // copy images to public
        }

        for (const item of GuideList) {
            await ensureSubmodule(item.slug, item.repoURL, 'guides');
            await updateSubmodule(item.slug, 'guides');
            syncImages(item.slug, 'guides'); // copy images to public
        }
    } else if (args.length === 1) {
        const slug = args[0];
        const item_m = MarkdownRepoList.find((m) => m.slug === slug);
        const item_g = GuideList.find((m) => m.slug === slug);
        if (!item_m && !item_g) {
            console.error(`No entry found for slug: ${slug}`);
            process.exit(1);
        }

        if (item_m) {
            await ensureSubmodule(item_m.slug, item_m.repoURL);
            await updateSubmodule(item_m.slug);
            syncImages(item_m.slug);
        } else if (item_g) {
            await ensureSubmodule(item_g.slug, item_g.repoURL, 'guides');
            await updateSubmodule(item_g.slug, 'guides');
            syncImages(item_g.slug, 'guides');
        }
    } else {
        console.log('Invalid number of parameters provided.');
        process.exit(1);
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
