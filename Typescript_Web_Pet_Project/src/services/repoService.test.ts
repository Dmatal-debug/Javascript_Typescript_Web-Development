import { GitHubRepo } from '../repositories/githubRepository';
import {
  filterMoreThanFiveStars,
  getLastFiveUpdated,
  sumAllStars,
  getTopFiveByStars,
  getReposAlphabeticalExcludingH,
} from './repoService';

const mockRepos: GitHubRepo[] = [
  { name: 'repo-A', stargazers_count: 10, updated_at: '2026-01-01T10:00:00Z' },
  { name: 'repo-B', stargazers_count: 2, updated_at: '2026-01-03T10:00:00Z' },
  { name: 'repo-C', stargazers_count: 5, updated_at: '2026-01-02T10:00:00Z' },
  { name: 'repo-D', stargazers_count: 20, updated_at: '2026-01-05T10:00:00Z' },
  { name: 'repo-E', stargazers_count: 0, updated_at: '2026-01-04T10:00:00Z' },
  { name: 'repo-F', stargazers_count: 8, updated_at: '2026-01-06T10:00:00Z' },
  { name: 'hapistrano', stargazers_count: 108, updated_at: '2026-01-07T10:00:00Z' },
  { name: 'Hoogle', stargazers_count: 15, updated_at: '2026-01-08T10:00:00Z' },
];

describe('repoService', () => {
  test('filterMoreThanFiveStars retorna solo repos con más de 5 estrellas', () => {
    const result = filterMoreThanFiveStars(mockRepos);
    expect(result.map((r) => r.name)).toEqual(['repo-A', 'repo-D', 'repo-F', 'hapistrano', 'Hoogle']);
  });

  test('getLastFiveUpdated ordena por fecha descendente y devuelve máximo 5', () => {
    const result = getLastFiveUpdated(mockRepos);
    expect(result).toHaveLength(5);
    expect(result[0].name).toBe('Hoogle');
    expect(result[1].name).toBe('hapistrano');
  });

  test('sumAllStars suma todas las estrellas', () => {
    expect(sumAllStars(mockRepos)).toBe(10 + 2 + 5 + 20 + 0 + 8 + 108 + 15);
  });

  test('getTopFiveByStars retorna los 5 repos con más estrellas, orden descendente', () => {
    const result = getTopFiveByStars(mockRepos);
    expect(result.map((r) => r.name)).toEqual(['hapistrano', 'repo-D', 'Hoogle', 'repo-A', 'repo-F']);
  });

  test('getReposAlphabeticalExcludingH excluye los que empiezan con "h" (sin importar mayúsculas) y ordena alfabéticamente', () => {
    const result = getReposAlphabeticalExcludingH(mockRepos);
    expect(result.map((r) => r.name)).toEqual(['repo-A', 'repo-B', 'repo-C', 'repo-D', 'repo-E', 'repo-F']);
  });
});
