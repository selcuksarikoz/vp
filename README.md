# Vape Paradise

This is a headless B2C storefront built with Next.js 16 and a mocked `json-server` API.

The goal was to build out the core commerce flows, treat the mock data as a true external system, and keep the codebase clean.

## Run

1. Install dependencies

```bash
npm install
```

2. Start the mock API

```bash
npm run api
```

3. Start the app

```bash
npm run dev
```

App: `http://localhost:3000`  
API: `http://localhost:3001`

## Checks

```bash
npm run lint
npm run test
```

## What's Included

- Product listing page
- Product detail page
- Category navigation
- Cart flow
- Product rating display and submission
- Basic tracking preparation (`product view`, `add to cart`)
- **Bonus:** Multi-Shop / Tenant config support via `.env`

## Technical Decisions

- **Zero-Trust Data:** I treated `db.json` like a real external API. I never import it directly. All reads/writes go through HTTP. Zod is used at the API boundary so the UI doesn't break on missing or bad data.
- **React 19 & Server Components:** Used Server Components for data fetching. For mutations (cart actions, ratings), I used Server Actions with React 19's `useOptimistic` and `useTransition` for instant UI updates.
- **Frontend Cart Calculation:** The cart API only stores IDs and quantities. The app resolves the full product data and calculates totals (tax, subtotals) on the frontend.
- **Primitive Tenant Logic:** Added a config layer (`src/lib/config/tenant.ts`) that reads `NEXT_PUBLIC_STORE_NAME`, `NEXT_PUBLIC_STORE_THEME`, and `NEXT_PUBLIC_STORE_LOGO`. This dynamically updates the HTML `data-theme`, metadata, and logo to support the multi-shop bonus requirement without code changes.

## Architecture

- `src/app`: Routes, layout, and page-level rendering
- `src/components`: UI components
- `src/lib/api`: HTTP data access for products, categories, cart, etc.
- `src/actions`: Server actions
- `src/lib/schemas`: Zod schemas
- `src/lib/config`: Tenant config
- `src/lib/analytics`: Basic dataLayer setup

## Data Handling

- Missing prices are handled safely.
- Missing images fall back to placeholders.
- Missing names/labels have defaults.
- Incomplete product variants are filtered out.

## Tracking

Simple structure to prep for a real dataLayer/GTM setup:

- `view_item`
- `add_to_cart`

## Trade-offs

- Search is very basic due to `json-server` limitations. Skipped pagination since the mocked DB is tiny.
- Ratings are open (no auth).
- Design isn't pixel-perfect; focused more on getting the data flows right and the code maintainable.

## If I Had More Time

- Add Redis for caching/invalidation.
- Swap the basic search for something like Algolia.
- Add integration tests for API modules and server actions.
- Move the backend to something like Drizzle if it outgrows `json-server`.
- Implement tRPC or Drizzle ORM/Prisma for a proper database structure with more dummy data and pagination support.
- Add Open Graph metadata for better social sharing.
- Build a dashboard to manage tenant/whitelabel settings instead of hardcoded env variables.
- Implement true multi-tenant architecture with database isolation for each tenant.
