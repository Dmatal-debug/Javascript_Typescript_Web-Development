
// 1 Repositorios con más de 5 estrellas
export function filterMoreThanFiveStars(repos) {
  if (!Array.isArray(repos)) return [];
  return repos.filter(repo => repo.stargazers_count > 5);
}

// 2 Últimos 5 actualizados
export function getLastFiveUpdated(repos) {
  if (!Array.isArray(repos)) return [];
  return [...repos]
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .slice(0, 5);
}

// 3 Suma de todas las estrellas
export function sumAllStars(repos) {
  if (!Array.isArray(repos)) return 0;
  return repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
}