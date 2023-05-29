import { RepoBaseUri, Owner, ApiVersion } from '../config/githubConfig';

const headers = {
  Accept: 'application/vnd.github+json',
  //Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
  'X-GitHub-Api-Version': ApiVersion,
  'User-Agent': 'SEPAL-Builds-Self-Service',
};

export async function fetchOpenPullRequests(repo: string) {
  const url = `${RepoBaseUri}${Owner}/${repo}/pulls?state=open`;
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`Failed to fetch open pull requests: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}


