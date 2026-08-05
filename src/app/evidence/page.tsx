import type { Metadata } from "next";
import EvidenceDashboard from "@/components/EvidenceDashboard";
import { LocalizedText } from "@/components/LanguageProvider";
import { getProjects } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Evidências",
  description: "Evidências de CI, CodeQL, release, cobertura e stack nos projetos do portfólio."
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
                <th className="p-4">
                  <LocalizedText pt="Projeto" en="Project" />
                </th>
                <th className="p-4">
                  <LocalizedText pt="Pontuação" en="Score" />
                </th>
                <th className="p-4">CI</th>
                <th className="p-4">CodeQL</th>
                <th className="p-4">Release</th>
                <th className="p-4">
                  <LocalizedText pt="Testes" en="Tests" />
                </th>
                <th className="p-4">
                  <LocalizedText pt="Cobertura" en="Coverage" />
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-t border-line">
                  <td className="p-4 font-medium">{project.title}</td>
                  <td className="p-4">{project.metrics.scoreLabel}</td>
                  <td className="p-4">
                    {project.evidence.ci ? (
                      <LocalizedText pt="sim" en="yes" />
                    ) : (
                      <LocalizedText pt="não documentado" en="not documented" />
                    )}
                  </td>
                  <td className="p-4">
                    {project.evidence.codeql ? (
                      <LocalizedText pt="sim" en="yes" />
                    ) : (
                      <LocalizedText pt="não documentado" en="not documented" />
                    )}
                  </td>
                  <td className="p-4">
                    {project.evidence.release ? (
                      <LocalizedText pt="sim" en="yes" />
                    ) : (
                      <LocalizedText pt="pendente" en="pending" />
                    )}
                  </td>
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
