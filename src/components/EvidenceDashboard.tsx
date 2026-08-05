import React from "react";
import { LocalizedText } from "@/components/LanguageProvider";
import { getEvidenceStats } from "@/lib/portfolio";

export default function EvidenceDashboard({ compact = false }: { compact?: boolean }) {
  const stats = getEvidenceStats();
  const metrics = [
    ["Total de projetos", "Total projects", stats.totalProjects],
    ["Resultado médio", "Average scored result", `${stats.averageScore}/100`],
    ["CI documentado", "CI documented", stats.ciProjects],
    ["CodeQL documentado", "CodeQL documented", stats.codeqlProjects],
    ["Evidência de release", "Release evidence", stats.releasedProjects],
    ["Projetos com Docker", "Docker projects", stats.dockerProjects]
  ] as const;

  return (
    <section aria-labelledby="evidence-heading">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          <LocalizedText pt="Painel de evidências" en="Evidence dashboard" />
        </p>
        <h2 id="evidence-heading" className="mt-2 text-3xl font-semibold">
          <LocalizedText pt="Sinais de engenharia revisáveis" en="Reviewable engineering signals" />
        </h2>
        {!compact && (
          <p className="mt-3 max-w-3xl text-muted">
            <LocalizedText
              pt="Os números consolidados são conservadores. Detalhes de testes e cobertura continuam documentados por projeto de origem quando este portfólio não consegue verificá-los automaticamente."
              en="Consolidated figures are conservative. Test and coverage details remain documented per source project unless this portfolio can verify them automatically."
            />
          </p>
        )}
      </div>
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map(([labelPt, labelEn, value]) => (
          <div key={labelEn} className="glass rounded-lg p-5">
            <dt className="text-sm text-muted">
              <LocalizedText pt={labelPt} en={labelEn} />
            </dt>
            <dd className="mt-2 text-3xl font-semibold">{value}</dd>
          </div>
        ))}
      </dl>
      {!compact && (
        <div className="mt-8 grid gap-3 md:grid-cols-4">
          {stats.categories.map((item) => (
            <div key={item.category} className="rounded border border-line bg-white/5 p-4">
              <div className="text-sm text-muted">{item.category}</div>
              <div className="mt-2 h-2 rounded bg-white/10">
                <div
                  className="h-2 rounded bg-accent"
                  style={{ width: `${Math.max(12, item.count * 12)}%` }}
                />
              </div>
              <div className="mt-2 text-sm">
                {item.count} <LocalizedText pt="projetos" en="projects" />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
