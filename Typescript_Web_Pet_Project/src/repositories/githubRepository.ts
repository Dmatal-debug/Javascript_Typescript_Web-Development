export interface GitHubRepo {
  name: string;
  stargazers_count: number;
  updated_at: string;
}

interface FetchResponse {
  ok: boolean;
  status: number;
  statusText: string;
  json(): Promise<unknown>;
}

type FetchFn = (url: string) => Promise<FetchResponse>;

export class GithubRepository {
  constructor(private readonly fetchFn: FetchFn = fetch) {}

  async getOrgRepositories(orgName: string): Promise<GitHubRepo[]> {
    const params = new URLSearchParams({
      per_page: '100',
      type: 'public',
      sort: 'updated',
    });
    const url = `https://api.github.com/orgs/${orgName}/repos?${params.toString()}`;
    const response = await this.fetchFn(url);

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as GitHubRepo[];
  }
}
