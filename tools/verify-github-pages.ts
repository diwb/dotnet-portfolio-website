import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const repoName = "dotnet-portfolio-website";
const basePath = `/${repoName}`;
const outDir = "out";
const errors: string[] = [];

function assert(condition: boolean, message: string) {
  if (!condition) errors.push(message);
}

function walk(dir: string, extension: string, files: string[] = []) {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      walk(fullPath, extension, files);
    } else if (fullPath.endsWith(extension)) {
      files.push(fullPath);
    }
  }
  return files;
}

function existsInOut(publicUrl: string) {
  const withoutBase = publicUrl.slice(basePath.length).replace(/^\/+/, "");
  return existsSync(join(outDir, withoutBase));
}

assert(existsSync(join(outDir, ".nojekyll")), "out/.nojekyll is missing.");
assert(existsSync(join(outDir, "_next")), "out/_next is missing.");
assert(existsSync(join(outDir, "index.html")), "out/index.html is missing.");

const htmlFiles = existsSync(outDir) ? walk(outDir, ".html") : [];
assert(htmlFiles.length > 0, "No HTML files were generated in out.");

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const refs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);

  for (const ref of refs) {
    if (ref.startsWith("/") && !ref.startsWith(`${basePath}/`)) {
      errors.push(`${file} contains root-relative reference outside ${basePath}: ${ref}`);
    }

    if (ref.startsWith(`${basePath}/_next/`)) {
      assert(existsInOut(ref), `${file} references missing Next asset: ${ref}`);
    }

    if (ref === `${basePath}/manifest.webmanifest` || ref === `${basePath}/favicon.svg`) {
      assert(existsInOut(ref), `${file} references missing public asset: ${ref}`);
    }
  }
}

const indexHtml = readFileSync(join(outDir, "index.html"), "utf8");
assert(
  indexHtml.includes(`${basePath}/_next/`),
  `out/index.html does not reference Next assets with ${basePath}/_next/.`
);

if (errors.length) {
  console.error(`GitHub Pages export verification failed:\n${errors.join("\n")}`);
  process.exit(1);
}

console.log("GitHub Pages export verified.");
