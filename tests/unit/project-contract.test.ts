import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";
import { categories } from "@/data/projects";

describe("project contract coverage", () => {
  for (const project of projects) {
    it(`${project.id} keeps GitHub URLs in the DIWB namespace`, () => {
      expect(project.repoUrl).toMatch(/^https:\/\/github\.com\/diwb\/[a-z0-9-]+$/);
      expect(project.links.every((link) => link.href.startsWith("https://github.com/diwb/"))).toBe(
        true
      );
    });

    it(`${project.id} has readable recruiter copy`, () => {
      expect(project.title).not.toMatch(/lorem|todo|tbd/i);
      expect(project.subtitle).not.toMatch(/lorem|todo|tbd/i);
      expect(project.highlights.join(" ")).not.toMatch(/lorem|todo|tbd/i);
    });

    it(`${project.id} has technical evidence flags`, () => {
      expect(typeof project.evidence.ci).toBe("boolean");
      expect(typeof project.evidence.codeql).toBe("boolean");
      expect(typeof project.evidence.release).toBe("boolean");
      expect(typeof project.evidence.docker).toBe("boolean");
    });

    it(`${project.id} maps to at least one supported architecture category`, () => {
      expect(project.categories.some((category) => categories.includes(category))).toBe(true);
    });

    it(`${project.id} has no empty text arrays`, () => {
      for (const list of [
        project.categories,
        project.stack,
        project.highlights,
        project.architecture,
        project.businessValue,
        project.technicalValue,
        project.limitations
      ]) {
        expect(list.every((item) => item.trim().length > 0)).toBe(true);
      }
    });

    it(`${project.id} keeps limitations realistic`, () => {
      expect(project.limitations.join(" ").toLowerCase()).toMatch(
        /evidence|coverage|runtime|examples|depends|release|performance|remote|production|environment|claims|benchmarks|throughput|patterns|infrastructure/
      );
    });
  }
});
