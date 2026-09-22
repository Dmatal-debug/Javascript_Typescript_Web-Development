# GitHub Org Stats — Stack Builders

Small exercise app that fetches repositories from GitHub's Stack Builders organization and reports:
- Repositories with more than 5 stars
- Last 5 updated repositories
- Sum of all repository stars

## Architecture

Three layers, each in its own file:
- `githubRepo.js` — external I/O: calls the GitHub REST API.
- `repoService.js` — pure business logic: the three functionalities above, no side effects.
- `server.js` — HTTP layer: an Express route that wires the two together.

## Requirements

- Node.js 18+ (uses the native `fetch` global)

## Setup

```bash
npm install
