import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { LocalizedText } from "@/components/LanguageProvider";
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
    title: project?.title ?? "Projeto",
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
          <LocalizedText
            pt={`Estudo de caso ${project.order}`}
            en={`Case study ${project.order}`}
          />
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
            <LocalizedText pt="Repositório" en="Repository" /> <ExternalLink size={18} />
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
          <Info titlePt="Pontuação" titleEn="Score" items={[formatScore(project)]} />
          <Info titlePt="Stack" titleEn="Stack" items={project.stack} />
          <Info
            titlePt="Evidências"
            titleEn="Evidence"
            items={[
              `CI: ${yes(project.evidence.ci)}`,
              `CodeQL: ${yes(project.evidence.codeql)}`,
              `Tests: ${project.evidence.tests}`,
              `Coverage: ${project.evidence.coverage}`
            ]}
          />
        </div>
        <CaseSection
          titlePt="Problema"
          titleEn="Problem"
          items={[
            `O trabalho técnico muitas vezes desaparece dentro de repositórios. ${project.title} é apresentado aqui como evidência que pode ser revisada rapidamente e depois inspecionada em profundidade.`
          ]}
          itemsEn={[
            `Technical work often disappears into repositories. ${project.title} is presented here as evidence that can be reviewed quickly and then inspected deeply.`
          ]}
        />
        <CaseSection titlePt="Solução" titleEn="Solution" items={project.highlights} />
        <CaseSection titlePt="Arquitetura" titleEn="Architecture" items={project.architecture} />
        <CaseSection
          titlePt="Valor de negócio"
          titleEn="Business Value"
          items={project.businessValue}
        />
        <CaseSection
          titlePt="Valor técnico"
          titleEn="Technical Value"
          items={project.technicalValue}
        />
        <CaseSection titlePt="Limitações" titleEn="Limitations" items={project.limitations} />
        <CaseSection
          titlePt="Aprendizados"
          titleEn="Learnings"
          items={[
            "Tornar evidências visíveis.",
            "Manter afirmações conservadoras.",
            "Preferir verificação repetível em vez de confiança manual."
          ]}
          itemsEn={[
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

function Info({ titlePt, titleEn, items }: { titlePt: string; titleEn: string; items: string[] }) {
  return (
    <section className="glass rounded-lg p-5">
      <h2 className="text-lg font-semibold">
        <LocalizedText pt={titlePt} en={titleEn} />
      </h2>
      <ul className="mt-3 space-y-2 text-sm text-muted">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function CaseSection({
  titlePt,
  titleEn,
  items,
  itemsEn = items
}: {
  titlePt: string;
  titleEn: string;
  items: string[];
  itemsEn?: string[];
}) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold">
        <LocalizedText pt={titlePt} en={titleEn} />
      </h2>
      <ul className="mt-4 grid gap-3">
        {items.map((item, index) => (
          <li key={item} className="rounded border border-line bg-white/5 p-4 text-muted">
            <LocalizedText pt={item} en={itemsEn[index] ?? item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
