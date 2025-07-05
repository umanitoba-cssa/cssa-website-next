import fs from 'fs';
import path from 'path';
import GuideList from '../data/guides';

// GitHub API interfaces
interface GitHubTreeItem {
  path: string;
  type: 'blob' | 'tree';
  sha: string;
  url: string;
}

interface GitHubTreeResponse {
  tree: GitHubTreeItem[];
  sha: string;
  url: string;
}

interface GitHubFileResponse {
  content: string;
  encoding: string;
  path: string;
  sha: string;
}

interface GitHubRepoInfo {
  owner: string;
  repo: string;
  branch: string;
}

/**
 * Parse GitHub repository URL to extract owner, repo, and branch
 */
function parseGitHubUrl(url: string): GitHubRepoInfo {
  const match = url.match(/https:\/\/github\.com\/([^\/]+)\/([^\/]+)(?:\/tree\/(.+))?/);
  if (!match) {
    throw new Error(`Invalid GitHub URL: ${url}`);
  }
  
  return {
    owner: match[1],
    repo: match[2],
    branch: match[3] || 'main' // Default to main branch
  };
}

/**
 * Fetch file content from GitHub API
 */
async function fetchGitHubFile(owner: string, repo: string, path: string, branch: string): Promise<string> {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'CSSA-Website-Next'
      }
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`File not found: ${path}`);
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }
    
    const data: GitHubFileResponse = await response.json();
    
    if (data.encoding === 'base64') {
      return Buffer.from(data.content, 'base64').toString('utf-8');
    }
    
    return data.content;
  } catch (error) {
    console.error(`Error fetching file ${path} from ${owner}/${repo}:`, error);
    throw error;
  }
}

/**
 * Fetch repository tree structure from GitHub API
 */
async function fetchGitHubTree(owner: string, repo: string, branch: string): Promise<GitHubTreeItem[]> {
  const url = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'CSSA-Website-Next'
      }
    });
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }
    
    const data: GitHubTreeResponse = await response.json();
    return data.tree;
  } catch (error) {
    console.error(`Error fetching tree for ${owner}/${repo}:`, error);
    throw error;
  }
}

/**
 * Get markdown files from repository
 */
function getMarkdownFiles(tree: GitHubTreeItem[]): GitHubTreeItem[] {
  return tree.filter(item => 
    item.type === 'blob' && 
    (item.path.endsWith('.md') || item.path.endsWith('.mdx'))
  );
}

/**
 * Get image files from repository
 */
function getImageFiles(tree: GitHubTreeItem[]): GitHubTreeItem[] {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.bmp'];
  return tree.filter(item => 
    item.type === 'blob' && 
    imageExtensions.some(ext => item.path.toLowerCase().endsWith(ext))
  );
}

/**
 * Fetch binary file content from GitHub API
 */
async function fetchGitHubBinaryFile(owner: string, repo: string, path: string, branch: string): Promise<Uint8Array> {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'CSSA-Website-Next'
      }
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`File not found: ${path}`);
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }
    
    const data: GitHubFileResponse = await response.json();
    
    if (data.encoding === 'base64') {
      return new Uint8Array(Buffer.from(data.content, 'base64'));
    }
    
    throw new Error(`Unexpected encoding: ${data.encoding}`);
  } catch (error) {
    console.error(`Error fetching binary file ${path} from ${owner}/${repo}:`, error);
    throw error;
  }
}

/**
 * Sync a single guide from GitHub repository
 */
async function syncGuideFromRepo(slug: string, repoURL: string): Promise<void> {
  console.log(`Syncing guide: ${slug} from ${repoURL}`);
  
  try {
    const { owner, repo, branch } = parseGitHubUrl(repoURL);
    
    // Create the guide directory
    const guideDir = path.join(process.cwd(), 'src/content/guides', slug);
    if (!fs.existsSync(guideDir)) {
      fs.mkdirSync(guideDir, { recursive: true });
    }
    
    // Fetch repository tree
    const tree = await fetchGitHubTree(owner, repo, branch);
    const markdownFiles = getMarkdownFiles(tree);
    const imageFiles = getImageFiles(tree);
    
    console.log(`Found ${markdownFiles.length} markdown files and ${imageFiles.length} image files in ${owner}/${repo}`);
    
    // Process each markdown file
    for (const file of markdownFiles) {
      const content = await fetchGitHubFile(owner, repo, file.path, branch);
      
      // Determine local file path
      let localPath: string;
      if (file.path === 'README.md' || file.path === 'index.md') {
        localPath = path.join(guideDir, 'index.md');
      } else {
        // Use the original filename, but place it in the guide directory
        const filename = path.basename(file.path);
        localPath = path.join(guideDir, filename);
      }
      
      // Write the file
      fs.writeFileSync(localPath, content, 'utf-8');
      console.log(`Synced: ${file.path} -> ${localPath}`);
    }
    
    // Process each image file
    for (const file of imageFiles) {
      const content = await fetchGitHubBinaryFile(owner, repo, file.path, branch);
      
      // Create images directory if it doesn't exist
      const imagesDir = path.join(process.cwd(), 'public/img/guides', slug);
      if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true });
      }
      
      // Determine local file path - preserve directory structure
      const relativePath = file.path.includes('/') ? file.path : path.basename(file.path);
      const localPath = path.join(imagesDir, relativePath);
      
      // Create subdirectories if needed
      const dir = path.dirname(localPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      // Write the file
      fs.writeFileSync(localPath, content);
      console.log(`Synced image: ${file.path} -> ${localPath}`);
    }
    
    // If no index.md was found, create one from README.md if it exists
    const indexPath = path.join(guideDir, 'index.md');
    if (!fs.existsSync(indexPath)) {
      const readmeFile = markdownFiles.find(f => f.path.toLowerCase() === 'readme.md');
      if (readmeFile) {
        const readmeContent = await fetchGitHubFile(owner, repo, readmeFile.path, branch);
        fs.writeFileSync(indexPath, readmeContent, 'utf-8');
        console.log(`Created index.md from README.md for ${slug}`);
      }
    }
    
  } catch (error) {
    console.error(`Error syncing guide ${slug}:`, error);
    throw error;
  }
}

/**
 * Sync all guides from their respective repositories
 */
export async function syncAllGuides(): Promise<void> {
  console.log('Starting guide synchronization...');
  
  const results = await Promise.allSettled(
    GuideList.map(guide => syncGuideFromRepo(guide.slug, guide.repoURL))
  );
  
  const successes = results.filter(r => r.status === 'fulfilled').length;
  const failures = results.filter(r => r.status === 'rejected').length;
  
  console.log(`Guide sync completed: ${successes} succeeded, ${failures} failed`);
  
  if (failures > 0) {
    console.log('Failed syncs:');
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.log(`- ${GuideList[index].slug}: ${result.reason}`);
      }
    });
  }
}

/**
 * Sync a specific guide by slug
 */
export async function syncGuide(slug: string): Promise<void> {
  const guide = GuideList.find(g => g.slug === slug);
  if (!guide) {
    throw new Error(`Guide not found: ${slug}`);
  }
  
  await syncGuideFromRepo(guide.slug, guide.repoURL);
}

/**
 * Sync a specific guide by repository URL
 */
export async function syncGuideByRepoUrl(repoUrl: string): Promise<void> {
  const guide = GuideList.find(g => g.repoURL === repoUrl);
  if (!guide) {
    throw new Error(`Guide not found for repository: ${repoUrl}`);
  }
  
  await syncGuideFromRepo(guide.slug, guide.repoURL);
}

/**
 * Get guide information from repository dispatch payload
 */
export function getGuideFromPayload(payload: any): { slug: string; repoURL: string } | null {
  if (!payload?.guide_repo) {
    return null;
  }
  
  const repoUrl = `https://github.com/${payload.guide_repo}`;
  const guide = GuideList.find(g => g.repoURL === repoUrl);
  
  return guide || null;
}

/**
 * Auto-sync guides (disabled - use manual sync or webhooks instead)
 */
export async function autoSyncGuides(): Promise<void> {
  // Auto-sync is now disabled to prevent unnecessary API calls
  // Use manual sync commands or repository webhooks instead
  return;
}
