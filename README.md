# Portfolio

A personal portfolio where every piece of public content (hero, headings, about text, projects, skills, achievements, gallery, social links, SEO) lives in Postgres and is managed from an admin panel at `/admin`. Only forms, navigation and the footer layout are defined in code.

**Stack:** Next.js 16 (App Router, Server Components, Server Actions) · TypeScript strict · Tailwind CSS v4 · shadcn/ui (Radix) · Neon Postgres · Drizzle ORM · Zod · next-safe-action · react-hook-form · bcrypt · jose · Cloudinary · framer-motion.

## Setup

1. **Install**

   ```bash
   npm install
   ```

2. **Environment.** Copy the template and fill in real values:

   ```bash
   cp .env.example .env
   ```

   | Variable | Notes |
   | --- | --- |
   | `DATABASE_URL` | Neon connection string (`?sslmode=require`). |
   | `JWT_SECRET` | 32+ random characters, e.g. `openssl rand -base64 48`. |
   | `JWT_EXPIRES_IN` | Session length, e.g. `2h`, `7d`. |
   | `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` | The admin account created by `db:seed` (password 8+ characters). |
   | `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | From the Cloudinary console. |
   | `LOG_DIR` | Optional, defaults to `logs`. |

   Every variable is validated with Zod when the server starts; a missing or invalid one stops startup with a list of what is wrong.

3. **Database**

   ```bash
   npm run db:generate   # only after changing server/db/schema/*: writes a new migration
   npm run db:migrate    # applies migrations in server/db/migrations to Neon
   npm run db:seed       # placeholder content for every table + the admin account
   ```

   The seed copies a few public Cloudinary demo images into your account under `portfolio/seed/`. Re-running it clears and refills the content tables and resets the admin password to the one in `.env`.

4. **Run**

   ```bash
   npm run dev
   ```

   Open http://localhost:3000 for the site and http://localhost:3000/admin to sign in. The session cookie is always `Secure`; Chrome, Edge and Firefox accept it on `localhost`.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Deploy

1. Create a Neon database and a Cloudinary account, and set every variable from `.env.example` in your host's environment settings.
2. Run `npm run db:migrate` (and `npm run db:seed` once, if you want the placeholder content) against the production `DATABASE_URL`.
3. Deploy with `npm run build` and `npm start`, or connect the repository to a host such as Vercel.

**Serverless hosts:** log files need a writable disk. On read-only filesystems the logger falls back to the console (your host's log viewer). The rate limiter keeps counts in memory, so on multi-instance hosts each instance counts separately.

## How it fits together

```
app/(site)/        public pages: each renders its ordered, visible page_sections
app/admin/         login + admin panel (layout re-checks the session on every request)
proxy.ts           quick JWT check that redirects /admin/* to the login page
instrumentation.ts env validation at startup + logging of uncaught server errors
server/
  env.ts           validated environment (server-only)
  db/              Drizzle schema, Neon client, query functions, migrations, seed
  actions/         Server Actions, all built on server/utils/safe-action.ts
  utils/           auth (jose), password (bcrypt), cloudinary, errors, logger, rate-limit, seo
shared/            Zod schemas, constants and the client error hook shared by client and server
components/        ui/ (shadcn), site/ (public blocks, animations), admin/ (forms, tables)
logs/              app-YYYY-MM-DD.log, error-YYYY-MM-DD.log, auth-YYYY-MM-DD.log (gitignored)
```

- **Validation:** one Zod schema per form in `shared/schemas`, used by react-hook-form on the client and by the Server Action on the server.
- **Errors:** actions throw typed errors (`server/utils/errors.ts`); the safe-action client maps them to `{ code, status, message, field? }` and logs them; `useActionError` turns them into field errors and toasts.
- **Content:** empty fields hide their block; sections can be hidden and reordered per page in **Admin → Page sections**.
- **Images:** uploaded through a signed server-side Cloudinary upload. Only the URL and `public_id` are stored. Replacing or deleting an image removes the old asset from Cloudinary.
