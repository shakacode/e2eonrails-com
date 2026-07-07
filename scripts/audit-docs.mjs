import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, "..");
const docusaurusRoot = path.join(workspaceRoot, "prototypes", "docusaurus");
const docsRoot = path.join(docusaurusRoot, "docs");
const sidebarsFile = path.join(docusaurusRoot, "sidebars.ts");

async function exists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

function stripComments(content) {
  return content
    .split("\n")
    .filter((line) => !/^\s*\/\//.test(line))
    .map((line) => line.replace(/\s\/\/.*$/, ""))
    .join("\n");
}

function extractSidebarDocIds(content) {
  const docIds = new Set();
  const cleanContent = stripComments(content);

  for (const line of cleanContent.split("\n")) {
    const standaloneItem = line.match(/^\s*['"]([^'"\n]+)['"],?\s*$/);
    if (standaloneItem) {
      docIds.add(standaloneItem[1]);
      continue;
    }

    const inlineItems = line.match(/\bitems:\s*\[(.*)\]/);
    if (inlineItems) {
      for (const match of inlineItems[1].matchAll(/['"]([^'"\n]+)['"]/g)) {
        docIds.add(match[1]);
      }
    }
  }

  return [...docIds];
}

async function assertFile(targetPath, label) {
  if (!(await exists(targetPath))) {
    throw new Error(`${label} missing at ${targetPath}`);
  }
}

async function main() {
  await assertFile(path.join(docsRoot, "introduction.md"), "Introduction doc");
  await assertFile(sidebarsFile, "Docusaurus sidebars.ts");
  await assertFile(path.join(docusaurusRoot, "static", "img", "social-card.png"), "Social card");

  const missing = [];
  const sidebarDocIds = extractSidebarDocIds(await fs.readFile(sidebarsFile, "utf8"));
  for (const docId of sidebarDocIds) {
    if (docId.startsWith("http://") || docId.startsWith("https://")) continue;
    const markdown = path.join(docsRoot, `${docId}.md`);
    const mdx = path.join(docsRoot, `${docId}.mdx`);
    if (!(await exists(markdown)) && !(await exists(mdx))) {
      missing.push(docId);
    }
  }

  if (missing.length > 0) {
    throw new Error(`Sidebar references missing docs: ${missing.join(", ")}`);
  }

  console.log("Docs audit passed.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
