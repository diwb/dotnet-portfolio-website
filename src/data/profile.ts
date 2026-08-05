export const siteConfig = {
  name: "DIWB Engineering OS",
  tagline:
    "Um portfólio de engenharia verificável: projetos de .NET, DevOps, IA, integração e arquitetura com CI, CodeQL, testes, cobertura e releases reais.",
  taglineEn:
    "A verifiable engineering portfolio: production-grade .NET, DevOps, AI, integration and architecture projects with real CI, CodeQL, tests, coverage and releases.",
  descriptionPt:
    "Portfólio estático e interativo para projetos de .NET, DevOps, IA, integração e arquitetura orientados por evidências.",
  description:
    "Interactive static portfolio for evidence-driven .NET, DevOps, AI, integration and architecture projects.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://diwb.github.io/dotnet-portfolio-website",
  github: "https://github.com/diwb",
  githubRepository: "https://github.com/diwb/dotnet-portfolio-website",
  gitSshRepository: "git@github.com:diwb/dotnet-portfolio-website.git",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com/in/diwb",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@example.com",
  resumePath: process.env.NEXT_PUBLIC_RESUME_URL ?? "https://www.linkedin.com/in/diwb"
};

export const profile = {
  role: "Engenheiro .NET, DevOps e integração",
  roleEn: ".NET, DevOps and integration engineer",
  summary:
    "Eu desenho sistemas confiáveis, automações e bases técnicas que podem ser revisadas por testes, CI, releases e documentação.",
  summaryEn:
    "I design reliable systems, automation workflows and technical foundations that can be reviewed through tests, CI, releases and documentation.",
  workingStyle: [
    "Evidência antes de afirmações",
    "Entrega static-first quando o produto não precisa de servidor",
    "Segurança, manutenção e deploy desde o primeiro commit",
    "Profundidade técnica traduzida em redução de risco de negócio"
  ],
  workingStyleEn: [
    "Evidence before claims",
    "Static-first delivery when the product does not need a server",
    "Security, maintainability and deployment from the first commit",
    "Technical depth translated into business risk reduction"
  ],
  values: [
    "Arquitetura clara",
    "Verificação automatizada",
    "Experiência acessível",
    "Simplicidade operacional"
  ],
  valuesEn: [
    "Clear architecture",
    "Automated verification",
    "Accessible user experience",
    "Operational simplicity"
  ]
};
