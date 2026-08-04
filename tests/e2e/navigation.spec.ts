import { expect, test } from "@playwright/test";

test("home, projects, case and contact are statically reachable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "DIWB Engineering OS" })).toBeVisible();

  await page.goto("/projects/");
  await expect(page.getByRole("heading", { name: /Ten projects/ })).toBeVisible();

  await page.goto("/projects/dotnet-enterprise-template/");
  await expect(page.getByRole("heading", { name: ".NET Enterprise Template" })).toBeVisible();

  await page.goto("/contact/");
  await expect(page.getByRole("heading", { name: "Static contact points" })).toBeVisible();
});

test("skip link and reduced motion fallback are available", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/projects/");
  await expect(page.getByText("2D engineering map fallback")).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
});
