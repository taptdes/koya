# Koya environments and deployment

Koya uses three isolated environments:

| Environment | Git branch | Frontend | API | Data and payments |
| --- | --- | --- | --- | --- |
| Development | `dev` | Local Vite or Vercel preview | Local API or `koya-api-development` | Development Firebase, local/dev Postgres, Stripe test mode |
| Staging | `staging` | `staging.koya.example.com` | `koya-api-staging.onrender.com` | Staging Firebase, staging Render Postgres, Stripe test mode |
| Production | `main` | `koya.example.com` | `api.koya.example.com` | Production Firebase, production Render Postgres, Stripe live mode |

## Local development

```bash
cd websites/koya
cp apps/api/.env.example apps/api/.env
pnpm install
pnpm dev:api
pnpm dev:web
```

The local Vite proxy sends `/api` requests to `http://localhost:3001`. Local development currently uses the API's file-backed store. Do not use that store for staging or production.

## Vercel

Create three Vercel projects, or one project with separate Preview/Production settings:

1. Set the project root directory to `apps/web`.
2. Use `pnpm build` as the build command and `dist` as the output directory.
3. Set `VITE_API_URL` separately for development, staging, and production.
4. Keep `apps/web/vercel.json` enabled so React Router paths work on refresh.

Recommended branch mapping:

- Production project: `main` → `https://api.koya.example.com`
- Staging project: `staging` → `https://koya-api-staging.onrender.com`
- Preview deployments: feature branches → development API or a temporary preview API

## Render

`render.yaml` defines three API web services:

- `koya-api-development` from `dev`
- `koya-api-staging` from `staging`
- `koya-api-production` from `main`

Create or sync the blueprint in the Render dashboard, then add the secret values for each service. Each service uses `/api/health` as its health check.

Render web services must listen on the `PORT` supplied by Render and be reachable on `0.0.0.0`; the API is configured for both in [server.mjs](./apps/api/src/server.mjs).

## Firebase

Create three Firebase projects:

- `koya-development`
- `koya-staging`
- `koya-production`

Enable Firebase Authentication in each project. Keep admin users, test accounts, seller accounts, and customer data isolated between projects. The API should verify Firebase ID tokens and enforce roles server-side; the frontend must never be trusted to decide whether someone is an org admin.

## Database and Stripe

Create one Render Postgres database per environment and set its `DATABASE_URL` in the matching Render service. Migrate the current file-backed data model into tables for users, roles, applications, guardians, products, orders, favorites, payouts, and audit events before staging launch.

Use Stripe test-mode keys for development and staging. Use Stripe live keys only in production. Stripe Connect onboarding and webhooks must be handled by the API, not directly from the browser.

## Required environment variables

Copy the matching example from [`infra/env`](./infra/env) when configuring a deployment. Never commit a real `.env` file or secret. The main variables are:

- `APP_ENV`
- `VITE_API_URL` for Vercel
- `FRONTEND_ORIGIN` for API CORS
- `DATABASE_URL`
- `FIREBASE_PROJECT_ID`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `CAPTCHA_SECRET_KEY`

## Promotion flow

1. Develop on a feature branch and run CI locally.
2. Open a pull request into `dev`; CI runs automatically.
3. Merge into `dev` for exploration and development deployment.
4. Promote the tested commit into `staging` for pre-launch review.
5. Test applications, role permissions, seller onboarding, checkout, payouts, and webhooks in staging.
6. Promote the approved commit into `main` for production.

Never point staging at production Firebase, Postgres, Stripe, CAPTCHA, or API credentials.
