import { RepoBaseUri, Owner, ApiVersion } from '../config/githubConfig';

export const headers = {
  Accept: 'application/vnd.github+json',
  //Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
  'X-GitHub-Api-Version': ApiVersion,
  'User-Agent': 'SEPAL-Builds-Self-Service',
};

export async function fetchOpenPullRequests(repo: string) {
  const url: string = `${RepoBaseUri}${Owner}/${repo}/pulls?state=all`;
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`Failed to fetch open pull requests: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

export async function downloadRelease(downloadUrl: string): Promise<Blob> {
  try {
    const response = await fetch(downloadUrl, { headers, method: 'GET' });
    if (!response.ok) {
      throw new Error(`Failed to Download release: ${response.status} ${response.statusText}`);
    }
    return await response.blob();
  } catch (error) {
    throw new Error(`Error downloading release: ${error}`);
  }
}


