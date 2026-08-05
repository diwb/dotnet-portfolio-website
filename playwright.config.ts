import { defineConfig, devices } from "@playwright/test";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const port = Number(process.env.PORT ?? 3000);
const basePath = isGithubPages ? "/dotnet-portfolio-website" : "";

export default defineConfig({
  testDir: "./tests/e2e",
  webServer: {
    command: isGithubPages ? `npx tsx tools/serve-github-pages.ts` : `npx serve out -l ${port}`,
    url: `http://127.0.0.1:${port}${basePath}/`,
    reuseExistingServer: !isGithubPages
  },
  use: {
    baseURL: `http://127.0.0.1:${port}${basePath}`,
    trace: "on-first-retry"
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 5"] } }
  ]
});
