export default async function fetchGitHubRepos(orgName, fetchFn = fetch) {
  const params = new URLSearchParams({
    per_page: '100',
    type: 'public',
    sort: 'updated',
  });
  const url = `https://api.github.com/orgs/${orgName}/repos?${params.toString()}`;
  const response = await fetchFn(url);

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
