# Cloudflare Pages Setup

The GitHub Actions deploy workflow expects these repo settings:

## Secrets

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## Variables

- `CLOUDFLARE_PAGES_PROJECT`

If `CLOUDFLARE_PAGES_PROJECT` is not set, workflows default to
`e2eonrails-com`.

## Source Dispatch

The gem repo
[`shakacode/cypress-playwright-on-rails`](https://github.com/shakacode/cypress-playwright-on-rails)
dispatches `docs-updated` events to this repo. Configure these secrets in the
gem repo:

- `DOCS_DISPATCH_APP_ID`
- `DOCS_DISPATCH_APP_KEY`

Those should identify a GitHub App with permission to dispatch workflows for
`shakacode/e2eonrails-com`.
