export const REPO_OWNER = "aravinthfaz";
export const REPO_NAME = "portfolio";
const API = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;

export const CONTENT_TARGETS = [
  { branch: "main", path: "public/content.json" },
  { branch: "gh-pages", path: "content.json" },
];

const headers = (token: string) => ({
  Accept: "application/vnd.github+json",
  Authorization: `Bearer ${token}`,
  "X-GitHub-Api-Version": "2022-11-28",
});

async function errorMessage(res: Response) {
  try {
    const body = await res.json();
    return `${res.status}: ${body.message ?? res.statusText}`;
  } catch {
    return `${res.status}: ${res.statusText}`;
  }
}

export async function verifyToken(token: string) {
  const res = await fetch(API, { headers: headers(token) });
  if (!res.ok) throw new Error(await errorMessage(res));
  const repo = await res.json();
  if (repo.permissions && !repo.permissions.push) {
    throw new Error("This token can read the repo but cannot write to it.");
  }
}

function toBase64(text: string) {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

function fromBase64(b64: string) {
  const binary = atob(b64.replace(/\n/g, ""));
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

async function getFile(token: string, branch: string, path: string) {
  const res = await fetch(`${API}/contents/${path}?ref=${branch}`, {
    headers: headers(token),
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(await errorMessage(res));
  return (await res.json()) as { sha: string; content: string };
}

export async function loadContent(token: string) {
  const file = await getFile(token, "main", "public/content.json");
  if (!file) throw new Error("public/content.json not found on main");
  return JSON.parse(fromBase64(file.content));
}

export async function saveContent(token: string, content: unknown) {
  const text = JSON.stringify(content, null, 2) + "\n";
  for (const { branch, path } of CONTENT_TARGETS) {
    const existing = await getFile(token, branch, path);
    const res = await fetch(`${API}/contents/${path}`, {
      method: "PUT",
      headers: headers(token),
      body: JSON.stringify({
        message: "Update site content from admin panel",
        content: toBase64(text),
        branch,
        ...(existing ? { sha: existing.sha } : {}),
      }),
    });
    if (!res.ok)
      throw new Error(`Saving to ${branch}: ${await errorMessage(res)}`);
  }
}
