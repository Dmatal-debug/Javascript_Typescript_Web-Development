import { Request, Response } from 'express';
import { GithubRepository } from '../repositories/githubRepository';
import {
  filterMoreThanFiveStars,
  getLastFiveUpdated,
  sumAllStars,
  getTopFiveByStars,
  getReposAlphabeticalExcludingH,
} from '../services/repoService';

const githubRepository = new GithubRepository();

export async function getOrgStats(req: Request<{ org: string }>, res: Response): Promise<void> {

  try {
    const orgName = req.params.org;
    const repos = await githubRepository.getOrgRepositories(orgName);

    res.json({
      organization: orgName,
      totalStars: sumAllStars(repos),
      moreThanFiveStars: filterMoreThanFiveStars(repos).map((r) => ({ name: r.name, stars: r.stargazers_count })),
      lastFiveUpdated: getLastFiveUpdated(repos).map((r) => ({ name: r.name, updated_at: r.updated_at })),
      topFiveByStars: getTopFiveByStars(repos).map((r) => ({ name: r.name, stars: r.stargazers_count })),
      alphabeticalExcludingH: getReposAlphabeticalExcludingH(repos).map((r) => r.name),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
}
