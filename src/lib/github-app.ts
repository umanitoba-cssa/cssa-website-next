import jwt from 'jsonwebtoken';

type TokenCache = { token: string; expiresAt: number };

const APP_ID = process.env.GITHUB_APP_ID;
const PRIVATE_KEY = process.env.GITHUB_PRIVATE_KEY?.replace(/\\n/g, '\n');

const MAX_RETRIES = 5;
const BASE_DELAY_MS = 1000;

let cachedAppJwt: TokenCache | null = null;
const installationIdCache = new Map<string, number>(); // key: `${owner}/${repo}`
const installationTokenCache = new Map<number, TokenCache>(); // key: installation id

function sleep(ms: number) {
    return new Promise(r => setTimeout(r, ms));
}

function ensureConfig() {
    if (!APP_ID) throw new Error('GITHUB_APP_ID must be set');
    if (!PRIVATE_KEY) throw new Error('GITHUB_APP_PRIVATE_KEY must be set');
}

async function getAppJwt(): Promise<string> {
    if (cachedAppJwt && Date.now() < cachedAppJwt.expiresAt - 30_000) return cachedAppJwt.token;
    ensureConfig();
    const now = Math.floor(Date.now() / 1000);
    const payload = {iat: now - 60, exp: now + 9 * 60, iss: Number(APP_ID)};
    const token = jwt.sign(payload as object, PRIVATE_KEY!, {algorithm: 'RS256'});
    cachedAppJwt = {token, expiresAt: (now + 9 * 60) * 1000};
    return token;
}

async function getInstallationId(owner: string, repo: string): Promise<number> {
    const key = `${owner}/${repo}`;
    const cached = installationIdCache.get(key);
    if (cached) return cached;

    const appJwt = await getAppJwt();
    const url = `https://api.github.com/repos/${owner}/${repo}/installation`;
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${appJwt}`,
            Accept: 'application/vnd.github.v3+json',
            'User-Agent': 'cssa-website'
        }
    });

    if (res.status === 404) {
        throw new Error(`GitHub App is not installed on ${owner}/${repo}`);
    }
    if (!res.ok) {
        const body = await res.text().catch(() => '');
        throw new Error(`Failed to get installation id for ${owner}/${repo}: ${res.status} ${res.statusText}${body ? ` - ${body}` : ''}`);
    }

    const data = await res.json();
    installationIdCache.set(key, data.id);
    return data.id;
}

async function createInstallationToken(installationId: number): Promise<TokenCache> {
    const appJwt = await getAppJwt();
    const url = `https://api.github.com/app/installations/${installationId}/access_tokens`;
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${appJwt}`,
            Accept: 'application/vnd.github.v3+json',
            'User-Agent': 'cssa-website'
        }
    });
    if (!res.ok) {
        const body = await res.text().catch(() => '');
        throw new Error(`Failed to create installation token: ${res.status} ${res.statusText}${body ? ` - ${body}` : ''}`);
    }
    const data = await res.json();
    return {token: data.token, expiresAt: new Date(data.expires_at).getTime()};
}

export async function getInstallationTokenForRepo(owner: string, repo: string): Promise<string> {
    const installationId = await getInstallationId(owner, repo);
    const cached = installationTokenCache.get(installationId);
    if (cached && Date.now() < cached.expiresAt - 30_000) return cached.token;
    const fresh = await createInstallationToken(installationId);
    installationTokenCache.set(installationId, fresh);
    return fresh.token;
}

type FetchInput = Parameters<typeof fetch>[0];
type FetchInit = Parameters<typeof fetch>[1];

export async function githubFetchWithApp(input: FetchInput, init: FetchInit = {}, owner?: string, repo?: string, attempt = 1): Promise<Response> {
    const headers: Record<string, string> = {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'cssa-website',
        ...(init?.headers as Record<string, string> || {})
    };

    try {
        if (owner && repo) {
            headers.Authorization = `token ${await getInstallationTokenForRepo(owner, repo)}`;
        } else if (process.env.GITHUB_TOKEN) {
            headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
        }

        const response = await fetch(input, {...init, headers});

        if (response.status === 403) {
            const remaining = response.headers.get('x-ratelimit-remaining');
            const resetHeader = response.headers.get('x-ratelimit-reset');
            if (remaining === '0' && resetHeader) {
                const resetMs = (parseInt(resetHeader, 10) * 1000) - Date.now();
                const waitMs = Math.max(resetMs, 1000);
                await sleep(waitMs + 500);
                if (attempt <= MAX_RETRIES) return githubFetchWithApp(input, init, owner, repo, attempt + 1);
            }
        }

        if ((response.status === 429 || response.status >= 500) && attempt < MAX_RETRIES) {
            const delay = BASE_DELAY_MS * (2 ** (attempt - 1));
            await sleep(delay);
            return githubFetchWithApp(input, init, owner, repo, attempt + 1);
        }

        return response;
    } catch (err) {
        if (attempt < MAX_RETRIES) {
            const delay = BASE_DELAY_MS * (2 ** (attempt - 1));
            await sleep(delay);
            return githubFetchWithApp(input, init, owner, repo, attempt + 1);
        }
        throw err;
    }
}