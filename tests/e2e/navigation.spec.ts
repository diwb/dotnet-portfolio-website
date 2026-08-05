import { expect, test } from "@playwright/test";

const basePath = process.env.GITHUB_PAGES === "true" ? "/dotnet-portfolio-website" : "";
const route = (path: string) => `${basePath}${path}`;

test("home, projects, case and contact are statically reachable in pt-BR", async ({ page }) => {
  const failedAssetRequests: string[] = [];
  page.on("response", (response) => {
    const url = response.url();
    if (
      (url.includes("/_next/static/") || url.endsWith("manifest.webmanifest")) &&
      response.status() >= 400
    ) {
      failedAssetRequests.push(`${response.status()} ${url}`);
    }
  });

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(route("/"));
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.getByRole("heading", { name: "DIWB Engineering OS" })).toBeVisible();
  await expect(page.getByText("Portfólio de engenharia estático")).toBeVisible();
  await expect(page.getByRole("link", { name: /Ver projetos/ })).toBeVisible();

  const bodyStyles = await page.locator("body").evaluate((body) => {
    const styles = window.getComputedStyle(body);
    return {
      color: styles.color,
      margin: styles.marginTop,
      backgroundImage: styles.backgroundImage
    };
  });
  expect(bodyStyles.margin).toBe("0px");
  expect(bodyStyles.backgroundImage).toContain("gradient");
  await expect(page.locator(".cockpit-grid")).toBeVisible();

  await page.goto(route("/projects/"));
  await expect(page.getByRole("heading", { name: /Dez projetos/ })).toBeVisible();

  await page.goto(route("/projects/dotnet-enterprise-template/"));
  await expect(page.getByRole("heading", { name: ".NET Enterprise Template" })).toBeVisible();
  await expect(page.getByText("Estudo de caso 1")).toBeVisible();

  await page.goto(route("/contact/"));
  await expect(page.getByRole("heading", { name: "Pontos de contato estáticos" })).toBeVisible();

  expect(failedAssetRequests).toEqual([]);
});

test("language toggle switches from Portuguese to English", async ({ page }) => {
  await page.goto(route("/"));
  await expect(page.getByText("Portfólio de engenharia estático")).toBeVisible();
  await page.getByRole("button", { name: "EN" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByText("Static engineering portfolio")).toBeVisible();
  await expect(page.getByRole("link", { name: /View projects/ })).toBeVisible();
});

test("skip link and reduced motion fallback are available", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(route("/projects/"));
  await expect(page.getByText("Mapa 2D de engenharia")).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Pular para o conteúdo" })).toBeFocused();
});
