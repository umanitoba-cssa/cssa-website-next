#!/usr/bin/env bun

import { syncAllGuides, syncAllMeetings, syncGuide } from '../src/lib/github-sync.ts';

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Syncing all markdown...');
    await syncAllMeetings();
    await syncAllGuides();
  } else if (args.length === 1) {
    const slug = args[0];
    console.log(`Syncing markdown: ${slug}`);
    await syncGuide(slug);
  } else {
    console.log('Usage: bun run sync-markdown [slug]');
    console.log('  bun run sync-markdown          - Sync all markdown');
    console.log('  bun run sync-markdown <slug>   - Sync specific markdown slug');
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
