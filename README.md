# DIWB Engineering OS

A static-first interactive engineering portfolio for the public repository `diwb/dotnet-portfolio-website`.

The site presents ten portfolio projects through three reading modes: recruiter summary, technical evidence and client/business value. It is designed to export to plain static files in `/out`, with no production Node runtime, database, API routes or backend requirement.

## Repository

- HTTPS: `https://github.com/diwb/dotnet-portfolio-website`
- SSH: `git@github.com:diwb/dotnet-portfolio-website.git`
- Any repository URL in this project should remain under `git@github.com:diwb` or `https://github.com/diwb/`.

## Stack

- Next.js App Router with `output: "export"`
- React, TypeScript and Tailwind CSS
- Framer Motion-ready UI surface
- Optional React Three Fiber project map with reduced-motion fallback
- Vitest, Testing Library and Playwright
- GitHub Actions, CodeQL and Dependabot

## Commands

```bash
npm install
npm run dev
npm run validate:data
npm run audit:claims
npm run test
npm run test:e2e
npm run build
npm run verify:out
```

## Deployment

The generated `out/` directory can be published to Cloudflare Pages, GitHub Pages, Netlify/Vercel static mode, any static server or shared hosting via FTP.

## Quality Posture

The portfolio avoids unverifiable claims. Scores are recorded from the prompt, while tests and coverage are marked as documented per project unless this repository can verify consolidated numbers.
