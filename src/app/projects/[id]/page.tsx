import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { getProjectById, getProjects, formatScore } from "@/lib/portfolio";

export function generateStaticParams() {
  return getProjects().map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);
  return {
    title: project?.title ?? "Project",
    description: project?.subtitle
  };
}

export default async function ProjectCasePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  return (
    <article className="px-4 py-14">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          Case study {project.order}
        </p>
        <h1 className="mt-3 text-5xl font-semibold">{project.title}</h1>
        <p className="mt-5 text-xl leading-8 text-muted">{project.subtitle}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            className="inline-flex items-center gap-2 rounded bg-accent px-4 py-3 font-semibold text-surface"
            href={project.repoUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            Repository <ExternalLink size={18} />
          </a>
          {project.releaseUrl && (
            <a
              className="inline-flex items-center gap-2 rounded border border-line px-4 py-3 font-semibold"
              href={project.releaseUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              Release <ExternalLink size={18} />
            </a>
          )}
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Info title="Score" items={[formatScore(project)]} />
          <Info title="Stack" items={project.stack} />
          <Info
            title="Evidence"
            items={[
              `CI: ${yes(project.evidence.ci)}`,
              `CodeQL: ${yes(project.evidence.codeql)}`,
              `Tests: ${project.evidence.tests}`,
              `Coverage: ${project.evidence.coverage}`
            ]}
          />
        </div>
        <CaseSection
          title="Problem"
          items={[
            `Technical work often disappears into repositories. ${project.title} is presented here as evidence that can be reviewed quickly and then inspected deeply.`
          ]}
        />
        <CaseSection title="Solution" items={project.highlights} />
        <CaseSection title="Architecture" items={project.architecture} />
        <CaseSection title="Business Value" items={project.businessValue} />
        <CaseSection title="Technical Value" items={project.technicalValue} />
        <CaseSection title="Limitations" items={project.limitations} />
        <CaseSection
          title="Learnings"
          items={[
            "Make evidence visible.",
            "Keep claims conservative.",
            "Prefer repeatable verification over manual confidence."
          ]}
        />
      </div>
    </article>
  );
}

function yes(value: boolean) {
  return value ? "yes" : "not documented";
}

function Info({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="glass rounded-lg p-5">
      <h2 className="text-lg font-semibold">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm text-muted">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function CaseSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <ul className="mt-4 grid gap-3">
        {items.map((item) => (
          <li key={item} className="rounded border border-line bg-white/5 p-4 text-muted">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
