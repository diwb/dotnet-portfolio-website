# Testing

Test layers:

- Unit tests for data, aggregation, validation and formatting.
- Component tests for timeline, dashboard, architecture map and 3D fallback.
- Playwright smoke tests for navigation and accessibility basics.
- CLI validation through `portfoliotool`.

Run:

```bash
npm run test
npm run test:e2e
npm run validate:data
npm run audit:claims
```
