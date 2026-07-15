# Agent Workflow Scripts

Standard entry points that portable agent-workflow skills call, so a skill can
run `.agents/bin/<name>` in any repo without knowing this repo's specific
commands. Each script is a thin, repo-owned wrapper. A script that is **absent**
means that capability is n/a here.

| Script | Purpose | This repo runs |
| --- | --- | --- |
| `setup` | Install dependencies | `npm --prefix prototypes/docusaurus install` |
| `validate` | Pre-push gate | `npm run build:full` |
| `test` | Run tests | `npm run audit:docs` |
| `lint` | Lint / format | n/a |
| `build` | Build / type-check | `npm run build:full` |
| `docs` | Docs checks | `npm run audit:docs` |
| `ci-detect` | CI change detector | n/a |

`test` and `docs` validate prepared documentation; run `build` or `validate`
first when starting from a clean checkout.

Non-command policy lives in [`../agent-workflow.yml`](../agent-workflow.yml).
