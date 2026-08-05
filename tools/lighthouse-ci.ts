import { copyFileSync, existsSync, readdirSync, rmSync } from "node:fs";
import { spawn, spawnSync, type ChildProcess } from "node:child_process";
import { chromium } from "@playwright/test";

const thresholds = {
  performance: 85,
  accessibility: 95,
  "best-practices": 95,
  seo: 95
};

const publicUrl = process.env.LIGHTHOUSE_URL;
const localUrl = "http://127.0.0.1:4173";
const auditUrl = publicUrl ?? localUrl;
let server: ChildProcess | undefined;

async function waitForServer(url: string) {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
  throw new Error(`Timed out waiting for ${url}`);
}

async function startStaticServer() {
  if (!existsSync("out/index.html")) {
    throw new Error("Missing out/index.html. Run npm run build before Lighthouse.");
  }
  server = spawn("npx", ["serve", "out", "-l", "4173"], {
    shell: true,
    stdio: "ignore"
  });
  await waitForServer(localUrl);
}

function findReport(extension: "html" | "json") {
  const files = readdirSync(process.cwd())
    .filter((file) => file.startsWith("lighthouse-report") && file.endsWith(`.${extension}`))
    .sort();
  const canonical = `lighthouse-report.${extension}`;
  return files.includes(canonical) ? canonical : files[0];
}

async function run() {
  for (const file of readdirSync(process.cwd()).filter(
    (item) =>
      item.startsWith("lighthouse-report") && (item.endsWith(".html") || item.endsWith(".json"))
  )) {
    rmSync(file, { force: true });
  }

  if (!publicUrl) {
    await startStaticServer();
  }

  const result = spawnSync(
    "npx",
    [
      "lighthouse",
      auditUrl,
      "--output=html",
      "--output=json",
      "--output-path=./lighthouse-report",
      "--quiet",
      "--preset=desktop",
      "--chrome-flags=--headless --no-sandbox --disable-gpu --disable-dev-shm-usage"
    ],
    {
      shell: true,
      stdio: "inherit",
      env: {
        ...process.env,
        CHROME_PATH: chromium.executablePath()
      }
    }
  );

  if (result.status !== 0) {
    throw new Error(`Lighthouse CLI failed with exit code ${result.status}`);
  }

  const htmlReport = findReport("html");
  const jsonReport = findReport("json");
  if (!htmlReport || !jsonReport) {
    throw new Error("Lighthouse did not produce both HTML and JSON reports.");
  }
  if (htmlReport !== "lighthouse-report.html") copyFileSync(htmlReport, "lighthouse-report.html");
  if (jsonReport !== "lighthouse-report.json") copyFileSync(jsonReport, "lighthouse-report.json");

  const report = JSON.parse(await BunlessReadText("lighthouse-report.json"));
  const scores = Object.fromEntries(
    Object.entries(thresholds).map(([key]) => [
      key,
      Math.round((report.categories[key]?.score ?? 0) * 100)
    ])
  );
  const failures = Object.entries(thresholds).filter(
    ([key, threshold]) => (scores[key] ?? 0) < threshold
  );

  console.log(JSON.stringify({ url: auditUrl, scores, thresholds }, null, 2));

  if (failures.length > 0) {
    throw new Error(`Lighthouse thresholds failed: ${failures.map(([key]) => key).join(", ")}`);
  }
}

async function BunlessReadText(path: string) {
  const { readFile } = await import("node:fs/promises");
  return readFile(path, "utf8");
}

run()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => {
    server?.kill();
  });
