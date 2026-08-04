# Security

Controls:

- No secrets in the repository
- `.env.example` only uses placeholders
- External links use `rel="noopener noreferrer"`
- No arbitrary HTML execution for project content
- CodeQL workflow
- Dependabot workflow
- `npm audit --audit-level=high` in CI
