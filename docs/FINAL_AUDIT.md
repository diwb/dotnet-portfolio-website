# Final Audit

Status: approved release candidate for Project 10. The portfolio is implemented, validated locally, deployed publicly with GitHub Pages, protected by CI and CodeQL, and packaged for release `v1.0.0`.

- Audit date: 2026-08-04 22:06:07 -03:00
- Local OS: Windows workspace
- Node version: `v22.22.0`
- npm version used locally: `9.6.7`
- Pinned CI package manager: `npm@10.9.0`
- Next.js version: `16.3.0`
- Repository URL: `https://github.com/diwb/dotnet-portfolio-website`
- SSH URL: `git@github.com:diwb/dotnet-portfolio-website.git`
- Default branch: `main`
- Implementation commit audited by remote checks: `4ba138ac39cbba2642de191ed2c3e63e96af9dd4`
- Public site URL: `https://diwb.github.io/dotnet-portfolio-website/`
- GitHub Pages URL: `https://diwb.github.io/dotnet-portfolio-website/`
- Release URL: `https://github.com/diwb/dotnet-portfolio-website/releases/tag/v1.0.0`

## Remote Evidence

- CI: passed at `https://github.com/diwb/dotnet-portfolio-website/actions/runs/30965030967`
- GitHub Pages: passed at `https://github.com/diwb/dotnet-portfolio-website/actions/runs/30965031035`
- CodeQL: passed at `https://github.com/diwb/dotnet-portfolio-website/actions/runs/30965031019`
- Public homepage: HTTP 200 OK
- Public projects route: HTTP 200 OK
- Public contact route: HTTP 200 OK

## Local Validation Commands

- `npx npm@10.9.0 ci`
- `npm run validate:data`
- `npm run audit:claims`
- `npm run check:links`
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
- `npm run verify:out`
- `npm run test:e2e`
- `npm audit --audit-level=high`
- `npm run report`
- `npm run lighthouse`
- `npm run format`

## Validation Results

- Data validation: passed for 10 projects.
- Claim audit: passed with no forbidden claims.
- Static link validation: passed for 33 URLs.
- Unit/component tests: 120 passed.
- Coverage: statements 93.67%, branches 88.57%, functions 89.36%, lines 97.05%.
- Playwright: 4 passed across desktop and mobile projects.
- Static export: `out` generated and verified.
- Static pages generated: 21 app routes plus generated project case paths.
- Security audit: `npm audit --audit-level=high` found 0 high vulnerabilities.
- Package report: `portfolio-report.json` generated.

## Public Lighthouse

Measured against `https://diwb.github.io/dotnet-portfolio-website/`.

- Performance: 100
- Accessibility: 95
- Best Practices: 96
- SEO: 100
- Thresholds: Performance >= 85, Accessibility >= 95, Best Practices >= 95, SEO >= 95
- Reports: `lighthouse-report.html` and `lighthouse-report.json`

## Release Assets

- `portfolio-static.zip`: static export from `out`
- `portfolio-report.json`: generated portfolio evidence report
- `lighthouse-report.html`: public Lighthouse HTML report
- `lighthouse-report.json`: public Lighthouse JSON report
- `RELEASE_NOTES.md`: release notes for `v1.0.0`
- `SHA256SUMS`: release asset checksums

## SHA256 Checksums

```text
2d9455777bcdcf3dcbf11247545d457da2e5f786ca9b63cb65d0e1cd0d130313  portfolio-static.zip
0cddd7ff5c73b9ec10d86fd53b188a85d1abad035fc6a819ac0e78ff545adcdc  portfolio-report.json
b20ae6e0d974cd1ea26b3748a7072951c191d888cb7a1eb3a32ed979284ee68c  lighthouse-report.html
8a012d15cd609abe272ec53537707507e6dd2136f23c4e5c474db24737a4238a  lighthouse-report.json
da754f2d93547ce114f798bd914ae082d4b4754c73d3b77d8563ce24a96f63f1  RELEASE_NOTES.md
```

## Notes

- The site is a static-first Next.js portfolio configured with `output: "export"`.
- GitHub Pages is configured to publish from GitHub Actions.
- Repository URLs follow the requested `git@github.com:diwb` SSH pattern for the origin.
- The release package is reproducible from the generated `out` directory and accompanied by checksums.
