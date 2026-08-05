import React from "react";
import Link from "next/link";
import { CheckCircle2, ExternalLink } from "lucide-react";
import { LocalizedText } from "@/components/LanguageProvider";
import type { Project } from "@/data/projects";
import { formatScore } from "@/lib/portfolio";

export default function ProjectsTimeline({ projects }: { projects: Project[] }) {
  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            <LocalizedText pt="Timeline de projetos" en="Projects timeline" />
          </p>
          <h2 className="mt-2 text-3xl font-semibold">
            <LocalizedText
              pt="Dez projetos, um sistema de evidências"
              en="Ten projects, one evidence system"
            />
          </h2>
        </div>
        <p className="max-w-2xl text-muted">
          <LocalizedText
            pt="Cada caso mantém afirmações conectadas a evidências de repositório, postura de CI, releases e limitações documentadas."
            en="Each case keeps claims tied to repository evidence, CI posture, releases and documented limitations."
          />
        </p>
      </div>
      <ol className="grid gap-4">
        {projects.map((project) => (
          <li key={project.id} className="glass rounded-lg p-5">
            <div className="grid gap-4 md:grid-cols-[5rem_1fr_auto] md:items-start">
              <div className="text-3xl font-semibold text-accent">
                {String(project.order).padStart(2, "0")}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  {project.categories.map((category) => (
                    <span
                      key={category}
                      className="rounded border border-line px-2 py-1 text-xs text-muted"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <h3 className="mt-3 text-2xl font-semibold">{project.title}</h3>
                <p className="mt-2 text-muted">{project.subtitle}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.slice(0, 5).map((stack) => (
                    <span key={stack} className="rounded bg-white/8 px-2 py-1 text-xs">
                      {stack}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted">
                  {project.evidence.ci && <Evidence label="CI" />}
                  {project.evidence.codeql && <Evidence label="CodeQL" />}
                  {project.evidence.release && <Evidence label="Release" />}
                </div>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <span className="rounded bg-accent px-3 py-2 font-semibold text-surface">
                  {formatScore(project)}
                </span>
                <Link
                  className="inline-flex items-center gap-2 text-sm text-accent"
                  href={`/projects/${project.id}`}
                >
                  <LocalizedText pt="Caso" en="Case" /> <ExternalLink size={15} />
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Evidence({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <CheckCircle2 size={15} className="text-accent" /> {label}
    </span>
  );
}
