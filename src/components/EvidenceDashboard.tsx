import React from "react";
import { getEvidenceStats } from "@/lib/portfolio";

export default function EvidenceDashboard({ compact = false }: { compact?: boolean }) {
  const stats = getEvidenceStats();
  const metrics = [
    ["Total projects", stats.totalProjects],
    ["Average scored result", `${stats.averageScore}/100`],
    ["CI documented", stats.ciProjects],
    ["CodeQL documented", stats.codeqlProjects],
    ["Release evidence", stats.releasedProjects],
    ["Docker projects", stats.dockerProjects]
  ];

  return (
    <section aria-labelledby="evidence-heading">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          Evidence dashboard
        </p>
        <h2 id="evidence-heading" className="mt-2 text-3xl font-semibold">
          Reviewable engineering signals
        </h2>
        {!compact && (
          <p className="mt-3 max-w-3xl text-muted">
            Consolidated figures are conservative. Test and coverage details remain documented per
            source project unless this portfolio can verify them automatically.
          </p>
        )}
      </div>
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map(([label, value]) => (
          <div key={label} className="glass rounded-lg p-5">
            <dt className="text-sm text-muted">{label}</dt>
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
              <div className="mt-2 text-sm">{item.count} projects</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
