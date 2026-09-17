import { jest } from '@jest/globals';
import fetchGitHubRepos from './githubRepo.js';

describe('fetchGitHubRepos', () => {
  
    const mockRepos = [
    { name: 'repo-A', stargazers_count: 10, updated_at: '2026-01-01T10:00:00Z' },
  ];

  test('devuelve los repos cuando la respuesta es exitosa', async () => {
    const fakeFetch = jest.fn().mockResolvedValue({ ok: true, json: async () => mockRepos });

    const result = await fetchGitHubRepos('stackbuilders', fakeFetch);

    expect(result).toEqual(mockRepos);
    expect(fakeFetch).toHaveBeenCalledWith(
      expect.stringContaining('api.github.com/orgs/stackbuilders/repos')
    );
  });

  test('propaga un error cuando la respuesta no es exitosa', async () => {
    const fakeFetch = jest.fn().mockResolvedValue({ ok: false, status: 404, statusText: 'Not Found' });

    await expect(fetchGitHubRepos('nonexistent-org', fakeFetch)).rejects.toThrow('GitHub API error: 404');
  });

});
