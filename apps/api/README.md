# Koya API

Local Express backend for the Koya storefront. It stores development data in `data/store.json` (ignored by git) and exposes:

- `GET /api/health`
- `GET /api/products?category=...&search=...`
- `POST /api/join-requests`
- `POST /api/quote-requests`
- `GET /api/profile`
- `PATCH /api/profile`
- `POST /api/orders`

Roles are represented as `org-admin`, `customer`, `guardian-admin`, and `entrepreneur`. Applications are stored with `pending-review`, `approved`, or `rejected` status and are reviewed at `/admin`.

The current `humanCheck` field is a development placeholder. Before production, replace it with Cloudflare Turnstile or Google reCAPTCHA and verify the token server-side. Stripe Connect should likewise be added only after real authentication and verified seller onboarding are in place.

From the monorepo root, run `pnpm dev:api`. The web app proxies `/api` to `http://localhost:3001`.
