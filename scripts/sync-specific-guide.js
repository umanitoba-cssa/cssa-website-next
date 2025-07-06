#!/usr/bin/env bun

import { syncGuideByRepoUrl } from '../src/lib/github-sync.ts';

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length !== 1) {
    console.log('Usage: bun run scripts/sync-specific-guide.js <repository>');
    console.log('  repository: GitHub repository in format "owner/repo"');
    process.exit(1);
  }
  
  const repository = args[0];
  const repoUrl = `https://github.com/${repository}`;
  
  console.log(`Syncing guide from repository: ${repository}`);
  
  try {
    await syncGuideByRepoUrl(repoUrl);
    console.log(`Successfully synced guide from ${repository}`);
  } catch (error) {
    console.error(`Error syncing guide from ${repository}:`, error);
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
