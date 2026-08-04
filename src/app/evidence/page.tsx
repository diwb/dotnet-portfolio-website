import type { Metadata } from "next";
import EvidenceDashboard from "@/components/EvidenceDashboard";
import { getProjects } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Evidence",
  description: "CI, CodeQL, release, coverage and stack evidence across portfolio projects."
};

export default function EvidencePage() {
  const projects = getProjects();
  return (
    <div className="px-4 py-14">
      <div className="mx-auto max-w-7xl">
        <EvidenceDashboard />
        <div className="mt-10 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead className="bg-white/8 text-muted">
              <tr>
                <th className="p-4">Project</th>
                <th className="p-4">Score</th>
                <th className="p-4">CI</th>
                <th className="p-4">CodeQL</th>
                <th className="p-4">Release</th>
                <th className="p-4">Tests</th>
                <th className="p-4">Coverage</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-t border-line">
                  <td className="p-4 font-medium">{project.title}</td>
                  <td className="p-4">{project.metrics.scoreLabel}</td>
                  <td className="p-4">{project.evidence.ci ? "yes" : "not documented"}</td>
                  <td className="p-4">{project.evidence.codeql ? "yes" : "not documented"}</td>
                  <td className="p-4">{project.evidence.release ? "yes" : "pending"}</td>
                  <td className="p-4">{project.evidence.tests}</td>
                  <td className="p-4">{project.evidence.coverage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
