# Final Audit

Status: approved patch release for Project 10. The GitHub Pages visual break was fixed, validated locally with a project-site simulation, validated publicly after deploy, and packaged for release `v1.0.1`.

- Audit date: 2026-08-05 11:56:08 -03:00
- Local OS: Windows workspace
- Node version: `v22.22.0`
- npm version used locally: `9.6.7`
- Pinned CI package manager: `npm@10.9.0`
- Next.js version: `16.3.0`
- Repository URL: `https://github.com/diwb/dotnet-portfolio-website`
- SSH URL: `git@github.com:diwb/dotnet-portfolio-website.git`
- Default branch: `main`
- Corrected commit: `4e4ae3fb6f13ff45e23e8c478d67cc00413b57af`
- Public site URL: `https://diwb.github.io/dotnet-portfolio-website/`
- GitHub Pages URL: `https://diwb.github.io/dotnet-portfolio-website/`
- Release URL: `https://github.com/diwb/dotnet-portfolio-website/releases/tag/v1.0.1`

## Root Cause

The first GitHub Pages deployment rendered HTML, but CSS, JavaScript and public assets were requested from root-level URLs. GitHub Pages serves this repository as a project site under `/dotnet-portfolio-website/`, so root-relative asset references such as `/_next/static/...`, `/manifest.webmanifest`, `/favicon.svg` and `/resume.pdf` could not resolve correctly from the public deployment.

## Files Changed

- `next.config.mjs`: adds GitHub Pages `basePath`, `assetPrefix` and `NEXT_PUBLIC_BASE_PATH` when `GITHUB_PAGES=true`.
- `public/.nojekyll`: ensures GitHub Pages serves `_next` assets without Jekyll processing.
- `src/lib/paths.ts`: centralizes public asset path prefixing.
- `src/app/layout.tsx`: prefixes manifest and favicon metadata URLs.
- `src/app/page.tsx` and `src/data/profile.ts`: avoids the broken root-relative resume URL.
- `tools/verify-github-pages.ts`: verifies exported HTML uses `/dotnet-portfolio-website` and that referenced assets exist.
- `tools/serve-github-pages.ts`: serves `out` under `/dotnet-portfolio-website/` for local Pages simulation.
- `playwright.config.ts` and `tests/e2e/navigation.spec.ts`: validate routes, CSS application and asset loading under the Pages subpath.
- `.github/workflows/ci.yml`, `.github/workflows/pages.yml`, `.github/workflows/release.yml`: run build, verification, E2E and Lighthouse with `GITHUB_PAGES=true`.
- `.gitignore` and `eslint.config.mjs`: exclude temporary Pages simulation output.
- `package.json` and `package-lock.json`: add `verify:github-pages` and bump to `1.0.1`.

## Remote Evidence

- CI: passed at `https://github.com/diwb/dotnet-portfolio-website/actions/runs/31017019977`
- GitHub Pages: passed at `https://github.com/diwb/dotnet-portfolio-website/actions/runs/31017020084`
- CodeQL: passed at `https://github.com/diwb/dotnet-portfolio-website/actions/runs/31017019901`
- Public homepage: validated with Playwright at `https://diwb.github.io/dotnet-portfolio-website/`
- Public projects route: validated with Playwright at `https://diwb.github.io/dotnet-portfolio-website/projects/`
- Public contact route: validated with Playwright at `https://diwb.github.io/dotnet-portfolio-website/contact/`

## Public Visual And Asset Evidence

- CSS applied: `body` margin computed as `0px`, text color as `rgb(231, 237, 245)`, and gradient background was present.
- Main visual styling applied: `.cockpit-grid` was visible and had computed grid background gradients.
- JavaScript/CSS assets: no failed responses for `/_next/static/` assets during public Playwright validation.
- Public assets: no failed responses for `manifest.webmanifest` or `favicon.svg` during public Playwright validation.
- Generated HTML references confirmed under `/dotnet-portfolio-website/...` for `_next`, `manifest.webmanifest`, `favicon.svg` and internal routes.

## Local Validation Commands

- `npm ci`
- `npm run validate:data`
- `npm run audit:claims`
- `npm run check:links`
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `GITHUB_PAGES=true npm run build`
- `npm run verify:out`
- `npm run verify:github-pages`
- `GITHUB_PAGES=true npm run test:e2e`
- `npm audit --audit-level=high`
- `npm run report`
- `GITHUB_PAGES=true npm run lighthouse`
- `LIGHTHOUSE_URL=https://diwb.github.io/dotnet-portfolio-website/ npm run lighthouse`
- `npm run format`

## Validation Results

- Data validation: passed for 10 projects.
- Claim audit: passed with no forbidden claims.
- Static link validation: passed for 33 URLs.
- Unit/component tests: 120 passed.
- Coverage after patch: statements 89.15%, branches 80.48%, functions 87.5%, lines 92.95%.
- Playwright GitHub Pages simulation: 4 passed across desktop and mobile projects.
- Static export: `out` generated and verified.
- GitHub Pages export verification: passed; `.nojekyll` exists, `_next` exists, root-relative references are under `/dotnet-portfolio-website`, and referenced public/Next assets exist.
- Security audit: `npm audit --audit-level=high` found 0 high vulnerabilities.
- Package report: `portfolio-report.json` generated.

## Lighthouse

Public measurement against `https://diwb.github.io/dotnet-portfolio-website/`.

- Performance: 100
- Accessibility: 100
- Best Practices: 100
- SEO: 100
- Thresholds: Performance >= 85, Accessibility >= 95, Best Practices >= 95, SEO >= 95
- Reports: `lighthouse-report.html` and `lighthouse-report.json`

Local GitHub Pages simulation measurement against `http://127.0.0.1:4173/dotnet-portfolio-website/`.

- Performance: 99
- Accessibility: 100
- Best Practices: 96
- SEO: 100

## Release Assets

- `portfolio-static.zip`: corrected static export from `out`
- `portfolio-report.json`: generated portfolio evidence report
- `lighthouse-report.html`: public Lighthouse HTML report
- `lighthouse-report.json`: public Lighthouse JSON report
- `RELEASE_NOTES.md`: release notes for `v1.0.1`
- `SHA256SUMS`: release asset checksums

## SHA256 Checksums

```text
b9300cf1bb95e18bae7ea461b241911e08b3a111f6ac304641e33caab4bdbea7  portfolio-static.zip
cfbb7697a04e590840d71e755af0e761ea20e4c965d744cacccd85e261749dab  portfolio-report.json
5452a8265f3495b053a036726240208afb0314320db8086efbfccef2f0cbc702  lighthouse-report.html
a3dbf91834d6998f99d9a289d4304e8b609a12b0925039d8ef86602f205b9e30  lighthouse-report.json
47e5d43e6f647ab9267647b165720a2b70dd079bef6ea6a0c7952f9133d9e1b0  RELEASE_NOTES.md
```

## Notes

- The site remains a static-first Next.js portfolio configured with `output: "export"`.
- Local development still uses root paths unless `GITHUB_PAGES=true` is set.
- GitHub Pages, CI and release workflows now build with `GITHUB_PAGES=true`.
- Repository URLs follow the requested `git@github.com:diwb` SSH pattern for the origin.
