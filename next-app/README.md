# Bright Arena Interiors (Next.js)

This is the Next.js App Router version of the Bright Arena Interiors website. It is self-contained: it does not read any file outside this folder, and it has its own `pnpm-lock.yaml` and `pnpm-workspace.yaml`.

## Requirements

- Node.js 20.9 or newer (validated on 24)
- pnpm 10.28.0 (`corepack enable` picks it up from `packageManager`)

## Commands

```bash
pnpm install
cp .env.example .env.local   # fill in the EmailJS keys
pnpm dev                     # http://localhost:3000
pnpm build && pnpm start     # production build and server
pnpm typecheck               # route types + tsc --noEmit
pnpm lint                    # ESLint (next/core-web-vitals + typescript)
pnpm seo:check               # needs a build: starts `next start`, validates SEO, sitemaps, redirects, 404s
pnpm seo:compare             # needs a build and ../dist from the Vite app: per-page parity diff
pnpm images:optimize         # optimise new or changed images in public/
pnpm test:contact            # Contact form validation unit tests
pnpm verify                  # typecheck + lint + test:contact + images:check + build + seo:check
```

## Environment

| Variable | Used by |
|---|---|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | Both forms (shared EmailJS service) |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Both forms |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | Talk Now project modal (`src/components/ProjectModal.tsx`) |
| `NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID` | **New.** Contact page form (`src/components/ContactForm.tsx`): a separate template |

The first three replace the Vite `VITE_EMAILJS_*` variables, with the same values. The Contact template ID is new: the template has to be created in the EmailJS dashboard first (setup steps in `docs/audit/OUTSTANDING_DECISIONS.md` §1). Until it is set, the Contact form shows its error message and keeps what the visitor typed; no email is attempted. `NEXT_PUBLIC_*` values are inlined at build time, so rebuild after changing them.

## Layout

```
src/app/        routes (Server Components): metadata, static params, sitemaps, robots, 404
src/views/      page components ported from the Vite src/pages/ (renamed: src/pages means Pages Router)
src/sections/   home page sections
src/components/ shared UI: Navbar, Footer, Breadcrumb, transition, modal, SEO, JsonLd
src/data/       SEO registry (pages.ts)
src/lib/        seo.ts (metadata rules), routeSeo.ts (detail page SEO), sitemaps.ts
redirects.ts    the 71 legacy redirects (the only redirect config)
scripts/        validate-seo, compare-with-vite, optimize-images (+ one-off migration helpers)
docs/           migration audit, route/component mapping, SEO plan, progress
```

## Images

Images in `public/` have already been optimised. The output is byte-identical to the Vite build's `vite-plugin-image-optimizer` output (quality 80, same sharp version), so pages render exactly as production does. To add an image, place the original in `public/` and run `pnpm images:optimize`. `scripts/image-manifest.json` records every processed file, so files are never re-compressed. `pnpm images:check` fails if any image has not been processed.

## Moving this folder out of the repository

1. Copy or move `next-app/` anywhere. Leave out `node_modules/`, `.next/` and `.env.local`, or delete them after moving.
2. `cd <new-location>/next-app && pnpm install --frozen-lockfile`
3. Recreate `.env.local` from `.env.example`.
4. `pnpm verify`

`pnpm seo:compare` exits cleanly with a notice when `../dist` does not exist. Pass `--vite-dist=<path>` to compare against a Vite build somewhere else.

## Deploying to Vercel (later)

1. Create a new Vercel project from the repository. Set **Root Directory** to `next-app` (or to the repo root once the app has moved).
2. Framework preset: **Next.js**. Install command: `pnpm install`. Build command: `pnpm build`. Leave the output directory at its default.
3. Add the four `NEXT_PUBLIC_EMAILJS_*` variables (service ID, public key, Talk Now template ID, Contact template ID) for Production and Preview. In the EmailJS dashboard, restrict allowed origins to the production domain and the preview domain.
4. Deploy a preview, then run `node scripts/validate-seo.mjs --base=https://<preview-url>`.
5. Do not add redirects or `trailingSlash` to a `vercel.json`. Both are defined in `next.config.ts`.
6. Point `www.brightarenainteriors.com` at the new project only after the preview passes. The current Vite production project stays untouched until then.
