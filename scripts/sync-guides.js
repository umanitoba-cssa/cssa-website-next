#!/usr/bin/env bun

import { syncAllGuides, syncGuide } from '../src/lib/github-sync.ts';

async function main() {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.log('Syncing all guides...');
        await syncAllGuides();
    } else if (args.length === 1) {
        const slug = args[0];
        console.log(`Syncing guide: ${slug}`);
        await syncGuide(slug);
    } else {
        console.log('Usage: bun run sync-guides [slug]');
        console.log('  bun run sync-guides          - Sync all guides');
        console.log('  bun run sync-guides <slug>   - Sync specific guide');
        process.exit(1);
    }
}

main().catch((error) => {
    console.error('Error:', error);
    process.exit(1);
});
