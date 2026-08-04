# Architecture

The site is static-first and uses Next.js App Router with `output: "export"`.

Core boundaries:

- `src/data`: versioned portfolio content and profile configuration.
- `src/lib`: pure aggregation, validation and formatting logic.
- `src/components`: reusable UI sections.
- `src/app`: static routes and metadata.
- `tools`: portfolio CLI and audit helpers.

Production output is the `/out` folder. The published site must not require SSR, API routes, Server Actions, a database or a Node runtime.
