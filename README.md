# e2eonrails.com

Documentation site for **E2E on Rails**, the Rails test bridge for Cypress and
Playwright.

The site mirrors the React on Rails docs publication model:

1. Canonical docs live in
   [`shakacode/cypress-playwright-on-rails`](https://github.com/shakacode/cypress-playwright-on-rails).
2. This repo syncs those docs into `content/upstream/`.
3. `npm run prepare:docs` copies synced docs into the Docusaurus app.
4. GitHub Actions rebuilds on push, PR, manual dispatch, and
   `docs-updated` repository-dispatch events from the gem repo.

## Develop

```bash
npm install
npm --prefix prototypes/docusaurus install
E2E_ON_RAILS_REPO=/Users/justin/.codex/worktrees/4ca4/cypress-playwright-on-rails npm run build:full
npm run dev
```

## Scripts

- `npm run sync:docs` - sync docs from the gem repo.
- `npm run prepare:docs` - copy synced docs/assets into Docusaurus.
- `npm run audit:docs` - validate required docs, assets, and sidebar entries.
- `npm run build:full` - sync, prepare, audit, and build the static site.
- `npm run cloudflare:deploy` - build and deploy with Wrangler.
