
import express from 'express';
import fetchGitHubRepos from './githubRepo.js';
import { filterMoreThanFiveStars, getLastFiveUpdated, sumAllStars } from './repoService.js';

const app = express();
app.set('json spaces', 2);
app.use(express.json());


app.get('/api/orgs/:org/stats', async (req, res) => {
  try {

    const orgName = req.params.org;
    const githubRepos = await fetchGitHubRepos(orgName);

    const moreThanFive = filterMoreThanFiveStars(githubRepos);
    const lastFive = getLastFiveUpdated(githubRepos);
    const totalStars = sumAllStars(githubRepos);

    // Respuesta con el formato solicitado
    res.json({
      organization: orgName,
      totalStars,
      moreThanFiveStars: moreThanFive.map(r => ({ name: r.name, stars: r.stargazers_count })),
      lastFiveUpdated: lastFive.map(r => ({ name: r.name, updated_at: r.updated_at }))
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Solo arranca el servidor si este archivo se ejecuta directamente (evita problemas en los tests)
if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => console.log('Servidor corriendo en el puerto 3000'));
}
