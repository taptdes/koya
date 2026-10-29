# Infrastructure configuration

- `env/*.env.example` documents the variables required by each environment.
- `render.yaml` defines the development, staging, and production API services.
- `apps/web/vercel.json` contains the SPA rewrite used by Vercel.

These files intentionally contain placeholders only. Configure actual secrets in Vercel, Render, Firebase, and Stripe dashboards.
