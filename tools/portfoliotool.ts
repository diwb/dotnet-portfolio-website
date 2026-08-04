#!/usr/bin/env tsx
import { writeFileSync } from "node:fs";
import { projects } from "../src/data/projects";
import { siteConfig } from "../src/data/profile";
import { auditProjectClaims, validateProjectsData } from "../src/lib/validation";
import { getAverageScore, getEvidenceStats, getStackMatrix } from "../src/lib/portfolio";

const command = process.argv[2] ?? "help";

function validateData() {
  const result = validateProjectsData();
  if (!result.ok) {
    console.error(result.issues.join("\n"));
    process.exit(1);
  }
  console.log(`Validated ${projects.length} projects.`);
}

function checkLinks() {
  const urls = [
    siteConfig.githubRepository,
    siteConfig.github,
    siteConfig.linkedin,
    ...projects.flatMap(
      (project) =>
        [project.repoUrl, project.releaseUrl, ...project.links.map((link) => link.href)].filter(
          Boolean
        ) as string[]
    )
  ];
  const invalid = urls.filter((url) => {
    try {
      const parsed = new URL(url);
      return (
        parsed.hostname === "github.com" &&
        parsed.pathname !== "/diwb" &&
        !parsed.pathname.startsWith("/diwb/")
      );
    } catch {
      return true;
    }
  });
  if (invalid.length) {
    console.error(`Invalid links:\n${invalid.join("\n")}`);
    process.exit(1);
  }
  console.log(`Checked ${urls.length} static links.`);
}

function auditClaims() {
  const issues = auditProjectClaims();
  if (issues.length) {
    console.error(JSON.stringify(issues, null, 2));
    process.exit(1);
  }
  console.log("No forbidden claims found.");
}

function generateReport() {
  const report = {
    generatedAt: new Date().toISOString(),
    repository: siteConfig.githubRepository,
    gitSshRepository: siteConfig.gitSshRepository,
    projectCount: projects.length,
    averageScore: getAverageScore(),
    evidence: getEvidenceStats(),
    stack: getStackMatrix(),
    caveat:
      "Tests and coverage are consolidated only where verified by this portfolio; otherwise evidence is documented per source project."
  };
  writeFileSync("portfolio-report.json", `${JSON.stringify(report, null, 2)}\n`);
  console.log("Wrote portfolio-report.json.");
}

function exportSummary() {
  const summary = [
    "# DIWB Engineering OS Summary",
    "",
    `Repository: ${siteConfig.githubRepository}`,
    `SSH: ${siteConfig.gitSshRepository}`,
    `Projects: ${projects.length}`,
    `Average score: ${getAverageScore()}/100`,
    "",
    ...projects.map(
      (project) => `- ${project.order}. ${project.title}: ${project.metrics.scoreLabel}`
    )
  ].join("\n");
  writeFileSync("portfolio-summary.md", `${summary}\n`);
  console.log("Wrote portfolio-summary.md.");
}

switch (command) {
  case "validate-data":
    validateData();
    break;
  case "check-links":
    checkLinks();
    break;
  case "audit-claims":
    auditClaims();
    break;
  case "generate-report":
    validateData();
    auditClaims();
    generateReport();
    break;
  case "export-summary":
    exportSummary();
    break;
  default:
    console.log(
      "Usage: portfoliotool <validate-data|check-links|generate-report|audit-claims|export-summary>"
    );
}
