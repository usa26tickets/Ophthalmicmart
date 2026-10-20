# Ophthalmicmart Storefront Migration

A responsive storefront migration for Ophthalmicmart, with source-matched catalog browsing, product details, editorial content, and a local cart.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/ophthalmicmart-store/` — the storefront app.
- `artifacts/ophthalmicmart-store/src/data/catalog.ts` — source-derived product and article catalog.
- `artifacts/ophthalmicmart-store/clone-data/` — source captures, inventory, brand tokens, and migration notes.
- `artifacts/ophthalmicmart-store/public/images/` — locally stored source-site assets.

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

- Home, shop, product-detail, About, Blog, and Cart pages.
- Searchable/sortable catalog with a persistent browser cart.
- Checkout and payments are intentionally not connected yet.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
