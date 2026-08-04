import { existsSync, statSync } from "node:fs";

const required = [
  "out/index.html",
  "out/projects/index.html",
  "out/evidence/index.html",
  "out/robots.txt",
  "out/sitemap.xml"
];
const missing = required.filter((file) => !existsSync(file) || statSync(file).size === 0);

if (missing.length) {
  console.error(`Static export is incomplete:\n${missing.join("\n")}`);
  process.exit(1);
}

console.log("Static export verified.");
