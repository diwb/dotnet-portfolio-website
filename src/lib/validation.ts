import { z } from "zod";
import { projects } from "@/data/projects";

export const forbiddenClaims = ["revolutionary", "world-class", "guaranteed", "best in the world"];

const projectSchema = z.object({
  id: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/),
  order: z.number().int().min(1).max(10),
  title: z.string().min(3),
  subtitle: z.string().min(20),
  repoUrl: z.string().url().startsWith("https://github.com/diwb/"),
  releaseUrl: z.string().url().startsWith("https://github.com/diwb/").optional(),
  finalScore: z.number().int().min(0).max(100).optional(),
  status: z.enum(["released", "portfolio"]),
  categories: z.array(z.string()).min(1),
  stack: z.array(z.string()).min(2),
  highlights: z.array(z.string()).min(2),
  evidence: z.object({
    ci: z.boolean(),
    codeql: z.boolean(),
    tests: z.enum(["documented per project", "available", "not consolidated"]),
    coverage: z.enum(["documented per project", "available", "not consolidated"]),
    release: z.boolean(),
    docker: z.boolean()
  }),
  metrics: z.object({
    scoreLabel: z.string().min(3),
    testCount: z.number().int().positive().optional(),
    coverage: z.number().min(0).max(100).optional()
  }),
  architecture: z.array(z.string()).min(2),
  businessValue: z.array(z.string()).min(2),
  technicalValue: z.array(z.string()).min(2),
  limitations: z.array(z.string()).min(1),
  links: z.array(z.object({ label: z.string().min(2), href: z.string().url() })).min(1)
});

export function validateProjectsData() {
  const parsed = z.array(projectSchema).safeParse(projects);
  const ids = new Set(projects.map((project) => project.id));
  const orders = new Set(projects.map((project) => project.order));
  const unique = ids.size === projects.length && orders.size === projects.length;

  return {
    ok: parsed.success && unique,
    issues: [
      ...(parsed.success ? [] : parsed.error.issues.map((issue) => issue.message)),
      ...(unique ? [] : ["Project ids and order values must be unique"])
    ]
  };
}

export function findClaimIssues(text: string) {
  const lowered = text.toLowerCase();
  return forbiddenClaims.filter((claim) => lowered.includes(claim));
}

export function auditProjectClaims() {
  return projects.flatMap((project) => {
    const text = [
      project.title,
      project.subtitle,
      ...project.highlights,
      ...project.businessValue,
      ...project.technicalValue
    ].join(" ");
    return findClaimIssues(text).map((claim) => ({ projectId: project.id, claim }));
  });
}
