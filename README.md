# Commerce Admin UI

React + Vite admin dashboard for the FlowWorks commerce platform. Split out of the original monorepo — this repo is fully self-contained.

## Layout
- `src/` — the admin app (`@commerce/admin`, root package of this repo).
- `packages/api-client/`, `packages/types/` — local copies of the small shared HTTP client + type helpers (previously monorepo-shared `@commerce/api-client`/`@commerce/types`, now duplicated per-repo since they have no build step).

## Setup
```
pnpm install
cp .env.example .env.local   # point VITE_API_BASE_URL at wherever the api repo is running
pnpm run dev                 # admin on :5174
```

Requires the `ecommerce-api` repo running separately (default expected at http://localhost:4000).

## Scripts
`dev`, `build`, `lint`, `typecheck`, `test`.

## Docker
`docker build -t ecommerce-admin --build-arg VITE_API_BASE_URL=/api/v1 .` then serve the `dist/` output via nginx (see `Dockerfile`/`nginx.conf`).
