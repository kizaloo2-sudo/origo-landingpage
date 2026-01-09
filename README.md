This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Database: leads_assessment table (Supabase)

If you see an error like `Table 'public.leads_assessment' not found`, create the table in your Supabase project using the SQL in `migrations/001_create_leads_assessment.sql`.

Steps:
1. Open your Supabase project → Database → SQL Editor.
2. Paste the SQL from `migrations/001_create_leads_assessment.sql` and run it.
3. Verify the table exists under Database → Tables.

Environment (server secrets):
- For server-side inserts you should set the **SUPABASE_SERVICE_ROLE_KEY** in your server environment (e.g., add to `.env.local` for local dev and as a secret in Vercel). This key must never be exposed to the browser or committed to source control.

If you do not want to use the service role key, ensure you have appropriate Row Level Security (RLS) policies to allow INSERTs from the authenticated principal your server uses.

If inserts fail with errors mentioning `row-level security` or `violates row-level security policy`, either configure an INSERT policy in Supabase for `leads_assessment` or set `SUPABASE_SERVICE_ROLE_KEY` for trusted server-side inserts.

Alternatively, create the table via the Supabase Dashboard (Database → New Table) with these columns:
- `id` (uuid, primary key, default gen_random_uuid())
- `contact_name` (text, not null)
- `contact_email` (text, not null)
- `contact_role` (text)
- `company_industry` (text)
- `answers` (jsonb)
- `score_total` (integer)
- `tier_result` (text)
- `status` (text, default 'new')
- `inserted_at` (timestamptz, default now())

If your database already contains a `created_at` column instead of `inserted_at`, run the migration `migrations/002_add_inserted_at_column.sql` to add `inserted_at` and backfill it from `created_at`.

Steps to run the migration:
1. Open Supabase → Database → SQL Editor.
2. Paste and run the SQL from `migrations/002_add_inserted_at_column.sql`.
3. Verify with:

```sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'leads_assessment'
ORDER BY ordinal_position;
```

After running the migration, you can `SELECT * FROM public.leads_assessment ORDER BY inserted_at DESC LIMIT 5;` to verify insertion timestamps.
