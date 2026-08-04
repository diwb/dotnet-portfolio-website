import { describe, expect, it } from "vitest";
import { getStackMatrix } from "@/lib/portfolio";

const expectedSignals = [
  ".NET",
  "Docker",
  "GitHub Actions",
  "CodeQL",
  "Angular",
  "Next.js",
  "TypeScript",
  "SQL Server",
  "MCP",
  "OpenAI",
  "SAP",
  "Telegram Bot API",
  "Clean Architecture",
  "Observability"
];

describe("skills matrix signals", () => {
  const matrix = getStackMatrix();

  for (const signal of expectedSignals) {
    it(`includes ${signal}`, () => {
      expect(
        matrix.some((item) => item.skill.includes(signal) || signal.includes(item.skill))
      ).toBe(true);
    });
  }

  it("orders high-frequency skills first", () => {
    expect(matrix[0].projects).toBeGreaterThanOrEqual(matrix[1].projects);
  });

  it("stores the source project ids for each skill", () => {
    expect(matrix.every((item) => item.projectIds.length === item.projects)).toBe(true);
  });
});
