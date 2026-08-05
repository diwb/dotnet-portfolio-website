import {
  existsSync,
  mkdirSync,
  rmSync,
  statSync,
  copyFileSync,
  readdirSync,
  createReadStream
} from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve, sep } from "node:path";

const repoName = "dotnet-portfolio-website";
const basePath = `/${repoName}`;
const port = Number(process.env.PORT ?? 3000);
const outDir = resolve("out");
const rootDir = resolve(".tmp/github-pages");
const servedDir = join(rootDir, repoName);

function copyRecursive(source: string, target: string) {
  const stats = statSync(source);
  if (stats.isDirectory()) {
    mkdirSync(target, { recursive: true });
    for (const entry of readdirSync(source)) {
      copyRecursive(join(source, entry), join(target, entry));
    }
    return;
  }
  copyFileSync(source, target);
}

function contentType(filePath: string) {
  switch (extname(filePath)) {
    case ".html":
      return "text/html; charset=utf-8";
    case ".css":
      return "text/css; charset=utf-8";
    case ".js":
      return "text/javascript; charset=utf-8";
    case ".json":
    case ".webmanifest":
      return "application/json; charset=utf-8";
    case ".svg":
      return "image/svg+xml";
    case ".txt":
      return "text/plain; charset=utf-8";
    case ".wasm":
      return "application/wasm";
    default:
      return "application/octet-stream";
  }
}

if (!existsSync(outDir)) {
  console.error("Run the static build before starting the GitHub Pages simulator.");
  process.exit(1);
}

rmSync(rootDir, { recursive: true, force: true });
copyRecursive(outDir, servedDir);

const server = createServer((request, response) => {
  const rawUrl = new URL(request.url ?? "/", `http://127.0.0.1:${port}`);
  let pathname = decodeURIComponent(rawUrl.pathname);

  if (pathname === "/") {
    response.writeHead(302, { Location: `${basePath}/` });
    response.end();
    return;
  }

  if (!pathname.startsWith(`${basePath}/`) && pathname !== basePath) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  pathname = pathname.slice(basePath.length) || "/";
  const relativePath = pathname.replace(/^\/+/, "");
  let filePath = normalize(join(servedDir, relativePath));

  if (!filePath.startsWith(`${servedDir}${sep}`) && filePath !== servedDir) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = join(filePath, "index.html");
  }

  if (!existsSync(filePath) && !extname(filePath)) {
    filePath = join(servedDir, relativePath, "index.html");
  }

  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  response.writeHead(200, { "Content-Type": contentType(filePath) });
  createReadStream(filePath).pipe(response);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Serving GitHub Pages simulation at http://127.0.0.1:${port}${basePath}/`);
});
