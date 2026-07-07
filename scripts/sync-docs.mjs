import { execFileSync } from "node:child_process";
import { mkdtempSync } from "node:fs";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, "..");

const upstreamRoot = path.join(workspaceRoot, "content", "upstream");
const docsTarget = path.join(upstreamRoot, "docs");
const staticTarget = path.join(upstreamRoot, "static");

async function exists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

function cloneRepo(repoUrl, ref) {
  const tmpDir = mkdtempSync(path.join(os.tmpdir(), "e2e-on-rails-docs-"));
  try {
    execFileSync("git", ["clone", "--depth", "1", "--branch", ref, repoUrl, tmpDir], {
      stdio: "inherit",
    });
  } catch {
    execFileSync("git", ["clone", "--depth", "1", repoUrl, tmpDir], {
      stdio: "inherit",
    });
  }
  return tmpDir;
}

async function main() {
  const configuredRepo = process.env.E2E_ON_RAILS_REPO;
  const localRepo = configuredRepo
    ? path.resolve(configuredRepo)
    : path.resolve(workspaceRoot, "../cypress-playwright-on-rails");

  let sourceRepo = localRepo;
  let ephemeralClone = null;

  if (!(await exists(path.join(sourceRepo, "docs")))) {
    const repoUrl =
      process.env.E2E_ON_RAILS_REPO_URL ??
      "https://github.com/shakacode/cypress-playwright-on-rails.git";
    const ref = process.env.E2E_ON_RAILS_REF ?? "master";
    console.log(`Local source repo missing. Cloning ${repoUrl} (${ref})...`);
    ephemeralClone = cloneRepo(repoUrl, ref);
    sourceRepo = ephemeralClone;
  }

  await fs.rm(upstreamRoot, { recursive: true, force: true });
  await fs.mkdir(upstreamRoot, { recursive: true });

  await fs.cp(path.join(sourceRepo, "docs"), docsTarget, { recursive: true });
  await fs.copyFile(path.join(sourceRepo, "README.md"), path.join(upstreamRoot, "README.md"));

  const sidebarsSource = path.join(sourceRepo, "docs", "sidebars.ts");
  if (!(await exists(sidebarsSource))) {
    throw new Error(`docs/sidebars.ts not found in source repo at ${sidebarsSource}`);
  }
  await fs.copyFile(sidebarsSource, path.join(upstreamRoot, "sidebars.ts"));

  const brandSource = path.join(sourceRepo, "docs", "assets", "brand");
  if (await exists(brandSource)) {
    await fs.mkdir(path.join(staticTarget, "img"), { recursive: true });
    await fs.cp(brandSource, path.join(staticTarget, "img", "brand"), { recursive: true });
  }

  console.log(`Synced docs from ${sourceRepo}`);
  console.log(`Docs target: ${docsTarget}`);

  if (ephemeralClone) {
    await fs.rm(ephemeralClone, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
