import type { Metadata } from "next";
import { getStackMatrix } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Skills",
  description: "Skills matrix across .NET, Angular, Next.js, DevOps, AI, SAP, MCP and automation."
};

const requiredSkills = [
  ".NET",
  "Angular",
  "Next.js",
  "TypeScript",
  "Docker",
  "GitHub Actions",
  "SQL Server",
  "SAP",
  "AI agents",
  "MCP",
  "Telegram Bot API",
  "CodeQL",
  "Clean Architecture",
  "Testing",
  "Observability"
];

export default function SkillsPage() {
  const matrix = getStackMatrix();
  return (
    <div className="px-4 py-14">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">Skills matrix</p>
        <h1 className="mt-2 text-4xl font-semibold">Capabilities mapped to projects</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {requiredSkills.map((skill) => {
            const match = matrix.find(
              (item) => item.skill.includes(skill) || skill.includes(item.skill)
            );
            return (
              <article key={skill} className="glass rounded-lg p-5">
                <h2 className="text-xl font-semibold">{skill}</h2>
                <p className="mt-2 text-muted">
                  {match
                    ? `${match.projects} related project signals`
                    : "Documented through related project context"}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
