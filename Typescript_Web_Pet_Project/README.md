# TypeScript Web Pet Project — GitHub Org Stats

TypeScript migration of the [JavaScript pet project](../Javascript_Web_Pet_Project), same GitHub Stack Builders org stats, plus:
- Top 5 repositories with the most stars
- All repositories alphabetically, excluding any whose name starts with "h"

## Architecture

Layered, same idea as the JS version but formalized with TS types and a Repository-pattern class:
- `src/repositories/githubRepository.ts` — `GithubRepository` class, calls the GitHub REST API
- `src/services/repoService.ts` — pure functions, business logic
- `src/controllers/statsController.ts` — Express request handler
- `src/server.ts` — Express app + route wiring

## Requirements

- Node.js 18+

## Setup

\`\`\`bash
npm install
\`\`\`

## Run

\`\`\`bash
npm start
\`\`\`

\`\`\`bash
curl http://localhost:3000/api/orgs/stackbuilders/stats
\`\`\`

## Test

\`\`\`bash
npm test
npm run test:coverage
\`\`\`

Unit tests use fixture data only — no live calls to GitHub. The `fetch` dependency is injected into `GithubRepository`'s constructor so it can be faked in tests.
