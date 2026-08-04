import { categories, projects, type Project } from "@/data/projects";

export function getProjects(): Project[] {
  return [...projects].sort((a, b) => a.order - b.order);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

export function getAverageScore(): number {
  const scored = projects.filter((project) => typeof project.finalScore === "number");
  return Math.round(
    scored.reduce((total, project) => total + (project.finalScore ?? 0), 0) / scored.length
  );
}

export function getEvidenceStats() {
  return {
    totalProjects: projects.length,
    averageScore: getAverageScore(),
    ciProjects: projects.filter((project) => project.evidence.ci).length,
    codeqlProjects: projects.filter((project) => project.evidence.codeql).length,
    releasedProjects: projects.filter((project) => project.evidence.release).length,
    dockerProjects: projects.filter((project) => project.evidence.docker).length,
    categories: categories.map((category) => ({
      category,
      count: projects.filter((project) => project.categories.includes(category)).length
    }))
  };
}

export function getStackMatrix() {
  const skills = new Map<string, { projects: number; projectIds: string[] }>();
  for (const project of projects) {
    for (const item of project.stack) {
      const current = skills.get(item) ?? { projects: 0, projectIds: [] };
      current.projects += 1;
      current.projectIds.push(project.id);
      skills.set(item, current);
    }
  }
  return [...skills.entries()]
    .map(([skill, value]) => ({ skill, ...value }))
    .sort((a, b) => b.projects - a.projects || a.skill.localeCompare(b.skill));
}

export function getProjectsByCategory(category: string): Project[] {
  return getProjects().filter((project) => project.categories.includes(category));
}

export function formatScore(project: Project): string {
  return project.finalScore ? `${project.finalScore}/100` : project.metrics.scoreLabel;
}
