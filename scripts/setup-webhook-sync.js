#!/usr/bin/env bun

import GuideList from '../src/data/guides.ts';

function extractRepoInfo(repoUrl) {
    const match = repoUrl.match(/https:\/\/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) {
        throw new Error(`Invalid GitHub URL: ${repoUrl}`);
    }
    return {
        owner: match[1],
        repo: match[2],
        fullName: `${match[1]}/${match[2]}`,
    };
}

function main() {
    console.log('🔄 CSSA Website Guide Sync Setup');
    console.log('================================\n');

    console.log('📋 Configured Guide Repositories:');
    GuideList.forEach((guide, index) => {
        const repoInfo = extractRepoInfo(guide.repoURL);
        console.log(`${index + 1}. ${guide.slug} → ${repoInfo.fullName}`);
    });

    console.log('\n🔧 Setup Instructions:');
    console.log('\n1. Create a Personal Access Token:');
    console.log('   - Go to: https://github.com/settings/tokens');
    console.log('   - Click "Generate new token (classic)"');
    console.log('   - Give it a name like "CSSA Website Sync Token"');
    console.log('   - Select these scopes: repo, workflow');
    console.log('   - Copy the generated token');

    console.log('\n2. Add the token to each guide repository:');
    GuideList.forEach((guide) => {
        const repoInfo = extractRepoInfo(guide.repoURL);
        console.log(`   - ${repoInfo.fullName}:`);
        console.log(`     https://github.com/${repoInfo.fullName}/settings/secrets/actions`);
        console.log(`     Add secret: WEBSITE_REPO_TOKEN = <your-token>`);
    });

    console.log('\n3. Add the notify workflow to each guide repository:');
    console.log('   Copy .github/workflows/guide-repo-notify.yml to each guide repo');

    console.log('\n4. Update the workflow file for your website repository:');
    console.log('   - Edit .github/workflows/sync-guides-webhook.yml');
    console.log('   - Update the deployment section for your hosting platform');

    console.log('\n✅ Once set up, guides will automatically sync when repositories are updated!');

    console.log('\n🧪 Test the setup:');
    console.log('   - Make a change to any guide repository');
    console.log('   - Push to main or release branch');
    console.log('   - Check GitHub Actions tab for sync activity');
}

main();
