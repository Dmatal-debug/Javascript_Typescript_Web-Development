export default async function fetchGitHubRepos(orgName, fetchFn = fetch) {
  
  const url = `https://api.github.com/orgs/${orgName}/repos?per_page=100`;
  const response = await fetchFn(url);

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
