# Interactive Portfolio Maintainer

Use this skill to maintain the DIWB Engineering OS portfolio without weakening evidence quality.

## Add a Project

1. Edit `src/data/projects.ts`.
2. Add verified repository URLs under `https://github.com/diwb/`.
3. Fill required fields: id, order, title, subtitle, repoUrl, status, categories, stack, highlights, evidence, metrics, architecture, businessValue, technicalValue, limitations and links.
4. Avoid unverified numbers. Use `documented per project` when tests or coverage are not consolidated.

## Review Claims

- Do not use exaggerated claims such as revolutionary, world-class, guaranteed or best in the world.
- Tie claims to CI, CodeQL, releases, tests, coverage, architecture or docs.
- Keep limitations explicit.

## Validate

Run:

```bash
npm run validate:data
npm run audit:claims
npm run test
npm run build
npm run verify:out
```

## Accessibility

Check keyboard navigation, visible focus, skip link, semantic landmarks, reduced motion and text alternatives for visualizations.

## Performance

Keep 3D optional and lazy-loaded. Do not add production runtime dependencies that break static export.

## Release Notes

Summarize changed projects, evidence updates, validation commands and known limitations. Do not publish `docs/FINAL_AUDIT.md` as complete until CI, CodeQL, Lighthouse, static export and release assets are verified.
