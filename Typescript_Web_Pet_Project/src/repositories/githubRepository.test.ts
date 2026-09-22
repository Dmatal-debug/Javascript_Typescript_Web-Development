import { GithubRepository, GitHubRepo } from './githubRepository';

describe('GithubRepository', () => {
  const mockRepos: GitHubRepo[] = [
    { name: 'repo-A', stargazers_count: 10, updated_at: '2026-01-01T10:00:00Z' },
  ];

  test('devuelve los repos cuando la respuesta es exitosa', async () => {
    const fakeFetch = jest.fn(async (_url: string) => ({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: async () => mockRepos,
    }));

    const repository = new GithubRepository(fakeFetch);
    const result = await repository.getOrgRepositories('stackbuilders');

    expect(result).toEqual(mockRepos);
    expect(fakeFetch).toHaveBeenCalledWith(
      expect.stringContaining('api.github.com/orgs/stackbuilders/repos')
    );
  });

  test('propaga un error cuando la respuesta no es exitosa', async () => {
    const fakeFetch = jest.fn(async (_url: string) => ({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      json: async () => [],
    }));

    const repository = new GithubRepository(fakeFetch);

    await expect(repository.getOrgRepositories('nonexistent-org')).rejects.toThrow(
      'GitHub API error: 404'
    );
  });
});
