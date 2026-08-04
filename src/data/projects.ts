export type ProjectStatus = "released" | "portfolio";

export type Project = {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  repoUrl: string;
  releaseUrl?: string;
  finalScore?: number;
  status: ProjectStatus;
  categories: string[];
  stack: string[];
  highlights: string[];
  evidence: {
    ci: boolean;
    codeql: boolean;
    tests: "documented per project" | "available" | "not consolidated";
    coverage: "documented per project" | "available" | "not consolidated";
    release: boolean;
    docker: boolean;
  };
  metrics: {
    scoreLabel: string;
    testCount?: number;
    coverage?: number;
  };
  architecture: string[];
  businessValue: string[];
  technicalValue: string[];
  limitations: string[];
  links: { label: string; href: string }[];
};

const github = "https://github.com/diwb";

export const projects: Project[] = [
  {
    id: "dotnet-enterprise-template",
    order: 1,
    title: ".NET Enterprise Template",
    subtitle: "Enterprise .NET template with CI, Docker, quality gates and security baseline.",
    repoUrl: `${github}/dotnet-enterprise-template`,
    releaseUrl: `${github}/dotnet-enterprise-template/releases`,
    finalScore: 96,
    status: "released",
    categories: ["Backend", "DevOps", "Architecture"],
    stack: [".NET", "Docker", "GitHub Actions", "CodeQL", "Clean Architecture"],
    highlights: ["Clean architecture foundation", "Docker-ready delivery", "Security checks"],
    evidence: {
      ci: true,
      codeql: true,
      tests: "documented per project",
      coverage: "documented per project",
      release: true,
      docker: true
    },
    metrics: { scoreLabel: "96/100" },
    architecture: ["Domain-first structure", "Application boundaries", "Infrastructure adapters"],
    businessValue: [
      "Reduces project setup time",
      "Creates repeatable delivery standards",
      "Improves auditability"
    ],
    technicalValue: [
      "Reusable .NET baseline",
      "CI and security automation",
      "Container-friendly design"
    ],
    limitations: [
      "Evidence should be confirmed in the source repository before using hard numbers."
    ],
    links: [{ label: "Repository", href: `${github}/dotnet-enterprise-template` }]
  },
  {
    id: "angular-enterprise-dashboard",
    order: 2,
    title: "Angular Enterprise Dashboard",
    subtitle:
      "Enterprise dashboard focused on e2e coverage, accessibility and operational UI quality.",
    repoUrl: `${github}/angular-enterprise-dashboard`,
    releaseUrl: `${github}/angular-enterprise-dashboard/releases`,
    finalScore: 96,
    status: "released",
    categories: ["Frontend", "DevOps", "Testing"],
    stack: ["Angular", "TypeScript", "Playwright", "Testing Library", "GitHub Actions"],
    highlights: ["Accessible dashboard flows", "E2E validation", "Coverage-oriented frontend"],
    evidence: {
      ci: true,
      codeql: true,
      tests: "documented per project",
      coverage: "documented per project",
      release: true,
      docker: false
    },
    metrics: { scoreLabel: "96/100" },
    architecture: ["Feature modules", "Typed UI contracts", "Reusable dashboard components"],
    businessValue: [
      "Improves visibility into workflows",
      "Supports repeatable frontend QA",
      "Reduces UI regression risk"
    ],
    technicalValue: ["Modern Angular patterns", "Tested components", "Accessibility smoke checks"],
    limitations: [
      "Coverage values are intentionally described per project until consolidated automatically."
    ],
    links: [{ label: "Repository", href: `${github}/angular-enterprise-dashboard` }]
  },
  {
    id: "dotnet-ai-agents-framework",
    order: 3,
    title: "AI Agents Framework",
    subtitle:
      "Runtime for agents with OpenAI adapter, orchestration, safety, evals and observability.",
    repoUrl: `${github}/dotnet-ai-agents-framework`,
    releaseUrl: `${github}/dotnet-ai-agents-framework/releases`,
    finalScore: 97,
    status: "released",
    categories: ["AI", "Backend", "Observability"],
    stack: [".NET", "OpenAI", "Evals", "Observability", "GitHub Actions"],
    highlights: ["Agent orchestration", "Safety boundaries", "Evaluation-ready runtime"],
    evidence: {
      ci: true,
      codeql: true,
      tests: "documented per project",
      coverage: "documented per project",
      release: true,
      docker: false
    },
    metrics: { scoreLabel: "97/100" },
    architecture: ["Adapter boundaries", "Orchestration core", "Evaluation hooks"],
    businessValue: [
      "Makes AI behavior easier to inspect",
      "Reduces integration risk",
      "Supports safer automation"
    ],
    technicalValue: [
      "Provider adapter model",
      "Observable agent runs",
      "Testable orchestration paths"
    ],
    limitations: [
      "Runtime claims should remain tied to repository evidence and documented examples."
    ],
    links: [{ label: "Repository", href: `${github}/dotnet-ai-agents-framework` }]
  },
  {
    id: "dotnet-mcp-examples",
    order: 4,
    title: "MCP Examples",
    subtitle:
      "MCP examples covering OAuth/OIDC, protocol shape, testing, security and release flow.",
    repoUrl: `${github}/dotnet-mcp-examples`,
    releaseUrl: `${github}/dotnet-mcp-examples/releases`,
    finalScore: 96,
    status: "released",
    categories: ["AI", "Integration", "Security"],
    stack: [".NET", "MCP", "OAuth", "OIDC", "CodeQL"],
    highlights: ["Protocol examples", "OAuth/OIDC coverage", "Security-aware sample design"],
    evidence: {
      ci: true,
      codeql: true,
      tests: "documented per project",
      coverage: "documented per project",
      release: true,
      docker: false
    },
    metrics: { scoreLabel: "96/100" },
    architecture: ["Protocol boundaries", "Authentication flows", "Documented examples"],
    businessValue: [
      "Clarifies AI tool integration patterns",
      "Reduces auth implementation ambiguity",
      "Improves adoption safety"
    ],
    technicalValue: ["MCP server/client examples", "Security review posture", "Release discipline"],
    limitations: ["Examples are not presented as a full hosted product."],
    links: [{ label: "Repository", href: `${github}/dotnet-mcp-examples` }]
  },
  {
    id: "dotnet-sap-integration-toolkit",
    order: 5,
    title: "SAP Integration Toolkit",
    subtitle:
      "Toolkit for SAP integration with OData, REST, RFC boundary, mock server, Docker and CI.",
    repoUrl: `${github}/dotnet-sap-integration-toolkit`,
    releaseUrl: `${github}/dotnet-sap-integration-toolkit/releases`,
    finalScore: 96,
    status: "released",
    categories: ["Integration", "Backend", "DevOps"],
    stack: [".NET", "SAP", "OData", "REST", "Docker", "GitHub Actions"],
    highlights: ["SAP boundary design", "Mock server strategy", "Container-based validation"],
    evidence: {
      ci: true,
      codeql: true,
      tests: "documented per project",
      coverage: "documented per project",
      release: true,
      docker: true
    },
    metrics: { scoreLabel: "96/100" },
    architecture: ["Integration boundary", "Mockable transport", "Protocol-specific adapters"],
    businessValue: [
      "Lowers ERP integration risk",
      "Supports testing without live SAP dependency",
      "Improves maintainability"
    ],
    technicalValue: ["OData and REST examples", "Docker support", "CI-backed validation"],
    limitations: [
      "RFC behavior is represented as a boundary unless confirmed against live SAP infrastructure."
    ],
    links: [{ label: "Repository", href: `${github}/dotnet-sap-integration-toolkit` }]
  },
  {
    id: "dotnet-sql-server-toolkit",
    order: 6,
    title: "SQL Server Toolkit",
    subtitle:
      "SQL Server toolkit with CLI, Docker SQL Server, integration tests and package-oriented delivery.",
    repoUrl: `${github}/dotnet-sql-server-toolkit`,
    releaseUrl: `${github}/dotnet-sql-server-toolkit/releases`,
    finalScore: 94,
    status: "released",
    categories: ["Data", "Backend", "DevOps"],
    stack: [".NET", "SQL Server", "Docker", "CLI", "GitHub Actions"],
    highlights: ["Database automation", "CLI utilities", "Integration test path"],
    evidence: {
      ci: true,
      codeql: true,
      tests: "documented per project",
      coverage: "documented per project",
      release: true,
      docker: true
    },
    metrics: { scoreLabel: "94/100" },
    architecture: ["CLI boundary", "SQL Server test container", "Package-ready modules"],
    businessValue: [
      "Speeds repeatable database tasks",
      "Reduces manual operations",
      "Improves database delivery confidence"
    ],
    technicalValue: ["Containerized SQL testing", "Typed command surface", "Package workflow"],
    limitations: ["Database performance claims require environment-specific benchmarks."],
    links: [{ label: "Repository", href: `${github}/dotnet-sql-server-toolkit` }]
  },
  {
    id: "dotnet-telegram-automation-framework",
    order: 7,
    title: "Telegram Automation Framework",
    subtitle:
      "Telegram Bot API framework with polling, webhooks, fake API, SQLite, CLI and security checks.",
    repoUrl: `${github}/dotnet-telegram-automation-framework`,
    releaseUrl: `${github}/dotnet-telegram-automation-framework/releases`,
    finalScore: 95,
    status: "released",
    categories: ["Automation", "Backend", "Security"],
    stack: [".NET", "Telegram Bot API", "SQLite", "CLI", "CodeQL"],
    highlights: ["Polling and webhook modes", "Fake API testing", "Automation security posture"],
    evidence: {
      ci: true,
      codeql: true,
      tests: "documented per project",
      coverage: "documented per project",
      release: true,
      docker: false
    },
    metrics: { scoreLabel: "95/100" },
    architecture: ["Bot API adapter", "Storage boundary", "CLI automation layer"],
    businessValue: [
      "Automates notification and workflow tasks",
      "Keeps bot behavior testable",
      "Reduces manual support loops"
    ],
    technicalValue: ["Fake API strategy", "Webhook and polling options", "SQLite-backed examples"],
    limitations: ["Production bot throughput depends on deployment and Telegram rate limits."],
    links: [{ label: "Repository", href: `${github}/dotnet-telegram-automation-framework` }]
  },
  {
    id: "dotnet-devops-starter-kit",
    order: 8,
    title: "DevOps Starter Kit",
    subtitle:
      "CI/CD kit with Docker, API/Worker, secret scan, vulnerability scan, coverage and release.",
    repoUrl: `${github}/dotnet-devops-starter-kit`,
    releaseUrl: `${github}/dotnet-devops-starter-kit/releases`,
    finalScore: 96,
    status: "released",
    categories: ["DevOps", "Backend", "Security"],
    stack: [".NET", "Docker", "GitHub Actions", "CodeQL", "Coverage"],
    highlights: ["CI/CD baseline", "Security and dependency scanning", "Artifact-ready release"],
    evidence: {
      ci: true,
      codeql: true,
      tests: "documented per project",
      coverage: "documented per project",
      release: true,
      docker: true
    },
    metrics: { scoreLabel: "96/100" },
    architecture: ["API and worker split", "Pipeline gates", "Container delivery path"],
    businessValue: [
      "Improves deployment confidence",
      "Reduces release toil",
      "Makes security checks visible"
    ],
    technicalValue: ["Pipeline templates", "Coverage gate", "Secret and vulnerability scans"],
    limitations: ["Deployment targets still need environment-specific configuration."],
    links: [{ label: "Repository", href: `${github}/dotnet-devops-starter-kit` }]
  },
  {
    id: "dotnet-architecture-patterns",
    order: 9,
    title: "Architecture Patterns",
    subtitle:
      "Clean Architecture, Vertical Slice, Modular Monolith and Hexagonal patterns with CLI and tests.",
    repoUrl: `${github}/dotnet-architecture-patterns`,
    releaseUrl: `${github}/dotnet-architecture-patterns/releases`,
    finalScore: 94,
    status: "released",
    categories: ["Architecture", "Backend", "Testing"],
    stack: [".NET", "Clean Architecture", "Vertical Slice", "Modular Monolith", "Hexagonal"],
    highlights: ["Pattern comparison", "CLI examples", "Tested architecture choices"],
    evidence: {
      ci: true,
      codeql: true,
      tests: "documented per project",
      coverage: "documented per project",
      release: true,
      docker: false
    },
    metrics: { scoreLabel: "94/100" },
    architecture: ["Multiple architecture styles", "Bounded examples", "CLI-driven exploration"],
    businessValue: [
      "Makes architecture tradeoffs explicit",
      "Supports maintainability decisions",
      "Improves team communication"
    ],
    technicalValue: ["Side-by-side patterns", "Executable examples", "Documented constraints"],
    limitations: ["Patterns are examples; production adoption depends on domain complexity."],
    links: [{ label: "Repository", href: `${github}/dotnet-architecture-patterns` }]
  },
  {
    id: "dotnet-portfolio-website",
    order: 10,
    title: "Portfolio Website",
    subtitle:
      "Static-first interactive engineering portfolio that turns the previous projects into reviewable evidence.",
    repoUrl: `${github}/dotnet-portfolio-website`,
    releaseUrl: `${github}/dotnet-portfolio-website/releases/tag/v1.0.0`,
    status: "portfolio",
    categories: ["Frontend", "DevOps", "Architecture"],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vitest", "Playwright"],
    highlights: ["Static export", "Evidence dashboard", "Maintainer skill and portfolio CLI"],
    evidence: {
      ci: true,
      codeql: true,
      tests: "available",
      coverage: "available",
      release: false,
      docker: false
    },
    metrics: { scoreLabel: "Final score after audit" },
    architecture: ["Static App Router", "Versioned content model", "CLI validation layer"],
    businessValue: [
      "Turns technical work into recruiter and client narratives",
      "Keeps claims auditable",
      "Deploys without server runtime"
    ],
    technicalValue: [
      "Static export compatibility",
      "Data validation",
      "A11y and performance checks"
    ],
    limitations: ["Remote CI, CodeQL and release URLs must be filled after GitHub runs complete."],
    links: [{ label: "Repository", href: `${github}/dotnet-portfolio-website` }]
  }
];

export const categories = [
  "Backend",
  "Frontend",
  "AI",
  "Integration",
  "DevOps",
  "Data",
  "Architecture",
  "Automation"
];
