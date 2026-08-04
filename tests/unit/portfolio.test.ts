import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/profile";
import { auditProjectClaims, forbiddenClaims, validateProjectsData } from "@/lib/validation";
import {
  formatScore,
  getEvidenceStats,
  getProjectById,
  getProjects,
  getProjectsByCategory,
  getStackMatrix
} from "@/lib/portfolio";

describe("portfolio data", () => {
  it("has ten ordered projects", () => {
    expect(getProjects()).toHaveLength(10);
    expect(getProjects().map((project) => project.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it("keeps the GitHub repository under diwb", () => {
    expect(siteConfig.githubRepository).toBe("https://github.com/diwb/dotnet-portfolio-website");
    expect(siteConfig.gitSshRepository).toBe("git@github.com:diwb/dotnet-portfolio-website.git");
  });

  it("validates project data", () => {
    expect(validateProjectsData()).toEqual({ ok: true, issues: [] });
  });

  it("has no forbidden claims", () => {
    expect(auditProjectClaims()).toEqual([]);
    expect(forbiddenClaims).toContain("world-class");
  });

  it("computes evidence statistics", () => {
    const stats = getEvidenceStats();
    expect(stats.totalProjects).toBe(10);
    expect(stats.averageScore).toBe(96);
    expect(stats.ciProjects).toBe(10);
    expect(stats.codeqlProjects).toBe(10);
  });

  it("finds projects by id", () => {
    expect(getProjectById("dotnet-ai-agents-framework")?.finalScore).toBe(97);
    expect(getProjectById("missing")).toBeUndefined();
  });

  it("groups projects by category", () => {
    expect(getProjectsByCategory("DevOps").length).toBeGreaterThanOrEqual(3);
    expect(getProjectsByCategory("Nope")).toHaveLength(0);
  });

  it("builds a stack matrix", () => {
    const matrix = getStackMatrix();
    expect(matrix[0].projects).toBeGreaterThan(1);
    expect(matrix.some((item) => item.skill === ".NET")).toBe(true);
  });

  it("formats scored and unscored projects", () => {
    expect(formatScore(projects[0])).toBe("96/100");
    expect(formatScore(projects[9])).toBe("Final score after audit");
  });
});

describe("project quality inventory", () => {
  for (const project of projects) {
    it(`${project.id} has complete case-study fields`, () => {
      expect(project.title.length).toBeGreaterThan(3);
      expect(project.subtitle.length).toBeGreaterThan(20);
      expect(project.repoUrl).toMatch(/^https:\/\/github\.com\/diwb\//);
      expect(project.categories.length).toBeGreaterThan(0);
      expect(project.stack.length).toBeGreaterThanOrEqual(2);
      expect(project.highlights.length).toBeGreaterThanOrEqual(2);
      expect(project.architecture.length).toBeGreaterThanOrEqual(2);
      expect(project.businessValue.length).toBeGreaterThanOrEqual(2);
      expect(project.technicalValue.length).toBeGreaterThanOrEqual(2);
      expect(project.limitations.length).toBeGreaterThanOrEqual(1);
      expect(project.links[0].href).toBe(project.repoUrl);
    });

    it(`${project.id} uses conservative evidence labels`, () => {
      expect(["documented per project", "available", "not consolidated"]).toContain(
        project.evidence.tests
      );
      expect(["documented per project", "available", "not consolidated"]).toContain(
        project.evidence.coverage
      );
      expect(project.metrics.scoreLabel.length).toBeGreaterThan(2);
    });

    it(`${project.id} has a valid score when scored`, () => {
      if (project.finalScore !== undefined) {
        expect(project.finalScore).toBeGreaterThanOrEqual(0);
        expect(project.finalScore).toBeLessThanOrEqual(100);
      }
    });
  }
});
