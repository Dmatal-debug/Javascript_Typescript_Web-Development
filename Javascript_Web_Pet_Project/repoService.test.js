// server.test.js
import { filterMoreThanFiveStars, getLastFiveUpdated, sumAllStars } from './repoService.js';

// Nuestro FIXTURE: datos simulados preprocesados de GitHub
const mockGithubRepos = [
  { name: 'repo-A', stargazers_count: 10, updated_at: '2026-01-01T10:00:00Z' },
  { name: 'repo-B', stargazers_count: 2,  updated_at: '2026-01-03T10:00:00Z' },
  { name: 'repo-C', stargazers_count: 5,  updated_at: '2026-01-02T10:00:00Z' },
  { name: 'repo-D', stargazers_count: 20, updated_at: '2026-01-05T10:00:00Z' },
  { name: 'repo-E', stargazers_count: 0,  updated_at: '2026-01-04T10:00:00Z' },
  { name: 'repo-F', stargazers_count: 8,  updated_at: '2026-01-06T10:00:00Z' },
];

describe('Pruebas unitarias de las funcionalidades de GitHub', () => {

  test('filterMoreThanFiveStars debería retornar solo repositorios con estrictamente más de 5 estrellas', () => {
    const resultado = filterMoreThanFiveStars(mockGithubRepos);
    
    // Deberían pasar repo-A (10), repo-D (20) y repo-F (8). repo-C tiene 5, así que se descarta.
    expect(resultado).toHaveLength(3);
    expect(resultado.map(r => r.name)).toEqual(['repo-A', 'repo-D', 'repo-F']);
  });

  test('getLastFiveUpdated debería ordenar por fecha descendente y devolver un máximo de 5 elementos', () => {
    const resultado = getLastFiveUpdated(mockGithubRepos);

    expect(resultado).toHaveLength(5);
    // El más nuevo es repo-F (Jan 6), seguido de repo-D (Jan 5), repo-E (Jan 4), etc.
    expect(resultado[0].name).toBe('repo-F');
    expect(resultado[1].name).toBe('repo-D');
  });

  test('sumAllStars debería calcular correctamente la suma total de estrellas', () => {
    // 10 + 2 + 5 + 20 + 0 + 8 = 45
    const total = sumAllStars(mockGithubRepos);
    expect(total).toBe(45);
  });

  test('deberían manejar de forma segura si el argumento no es un array', () => {
    expect(filterMoreThanFiveStars(null)).toEqual([]);
    expect(getLastFiveUpdated(undefined)).toEqual([]);
    expect(sumAllStars('not-an-array')).toBe(0);
  });

});
