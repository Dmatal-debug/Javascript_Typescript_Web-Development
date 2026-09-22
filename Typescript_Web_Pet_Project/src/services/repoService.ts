import { GitHubRepo } from '../repositories/githubRepository';

export function filterMoreThanFiveStars(repos: GitHubRepo[]): GitHubRepo[] {
  return repos.filter((repo) => repo.stargazers_count > 5);
}

export function getLastFiveUpdated(repos: GitHubRepo[]): GitHubRepo[] {
  return [...repos]
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 5);
}

export function sumAllStars(repos: GitHubRepo[]): number {
  return repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
}

export function getTopFiveByStars(repos: GitHubRepo[]): GitHubRepo[] {
  return [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 5);
}

export function getReposAlphabeticalExcludingH(repos: GitHubRepo[]): GitHubRepo[] {
  return repos
    .filter((repo) => !repo.name.toLowerCase().startsWith('h'))
    .sort((a, b) => a.name.localeCompare(b.name));
}
