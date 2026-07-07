import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, "..");

const upstreamRoot = path.join(workspaceRoot, "content", "upstream");
const docusaurusRoot = path.join(workspaceRoot, "prototypes", "docusaurus");
const sourceDocs = path.join(upstreamRoot, "docs");
const targetDocs = path.join(docusaurusRoot, "docs");
const targetStaticImg = path.join(docusaurusRoot, "static", "img");

async function exists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function copyIfExists(source, target) {
  if (await exists(source)) {
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.copyFile(source, target);
    return true;
  }
  return false;
}

async function main() {
  if (!(await exists(sourceDocs))) {
    throw new Error(`Synced docs missing at ${sourceDocs}. Run npm run sync:docs first.`);
  }

  await fs.rm(targetDocs, { recursive: true, force: true });
  await fs.mkdir(path.dirname(targetDocs), { recursive: true });
  await fs.cp(sourceDocs, targetDocs, { recursive: true });

  const upstreamSidebars = path.join(upstreamRoot, "sidebars.ts");
  if (!(await exists(upstreamSidebars))) {
    throw new Error(`Synced sidebars.ts missing at ${upstreamSidebars}`);
  }
  await fs.copyFile(upstreamSidebars, path.join(docusaurusRoot, "sidebars.ts"));

  const brandSource = path.join(upstreamRoot, "static", "img", "brand");
  const brandTarget = path.join(targetStaticImg, "brand");
  await fs.rm(brandTarget, { recursive: true, force: true });
  if (await exists(brandSource)) {
    await fs.mkdir(targetStaticImg, { recursive: true });
    await fs.cp(brandSource, brandTarget, { recursive: true });
  }

  await copyIfExists(path.join(brandTarget, "icon-tile.svg"), path.join(targetStaticImg, "icon-tile.svg"));
  await copyIfExists(path.join(brandTarget, "favicon.ico"), path.join(targetStaticImg, "favicon.ico"));
  await copyIfExists(path.join(brandTarget, "social-card.png"), path.join(targetStaticImg, "social-card.png"));
  await copyIfExists(path.join(brandTarget, "lockup-dark.svg"), path.join(targetStaticImg, "lockup-dark.svg"));
  await copyIfExists(path.join(brandTarget, "lockup-light.svg"), path.join(targetStaticImg, "lockup-light.svg"));

  console.log(`Prepared docs at ${targetDocs}`);
  console.log(`Prepared sidebars.ts at ${path.join(docusaurusRoot, "sidebars.ts")}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
