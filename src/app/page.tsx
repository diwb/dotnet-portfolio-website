import Link from "next/link";
import { ArrowRight, Download, ExternalLink } from "lucide-react";
import { siteConfig, profile } from "@/data/profile";
import { getEvidenceStats, getProjects } from "@/lib/portfolio";
import EvidenceDashboard from "@/components/EvidenceDashboard";
import ProjectsTimeline from "@/components/ProjectsTimeline";
import ArchitectureMap from "@/components/ArchitectureMap";

export default function HomePage() {
  const stats = getEvidenceStats();
  const projects = getProjects();

  return (
    <>
      <section className="cockpit-grid border-b border-line px-4 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
              Static engineering portfolio
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-tight md:text-7xl">
              {siteConfig.name}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{siteConfig.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center gap-2 rounded bg-accent px-5 py-3 font-semibold text-surface"
                href="/projects"
              >
                View projects <ArrowRight size={18} />
              </Link>
              <a
                className="inline-flex items-center gap-2 rounded border border-line px-5 py-3 font-semibold text-ink hover:bg-white/8"
                href={siteConfig.resumePath}
              >
                Resume <Download size={18} />
              </a>
              <a
                className="inline-flex items-center gap-2 rounded border border-line px-5 py-3 font-semibold text-ink hover:bg-white/8"
                href={siteConfig.githubRepository}
                rel="noopener noreferrer"
                target="_blank"
              >
                Repository <ExternalLink size={18} />
              </a>
            </div>
          </div>
          <div className="glass rounded-lg p-6" aria-label="Portfolio summary">
            <p className="text-sm uppercase tracking-widest text-muted">{profile.role}</p>
            <p className="mt-4 text-2xl font-semibold leading-snug">{profile.summary}</p>
            <dl className="mt-8 grid grid-cols-2 gap-4">
              <Metric label="Projects" value={stats.totalProjects} />
              <Metric label="Avg score" value={stats.averageScore} suffix="/100" />
              <Metric label="CI evidence" value={stats.ciProjects} />
              <Metric label="CodeQL" value={stats.codeqlProjects} />
            </dl>
          </div>
        </div>
      </section>
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <EvidenceDashboard compact />
        </div>
      </section>
      <section className="border-y border-line bg-black/16 px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <ProjectsTimeline projects={projects.slice(0, 5)} />
          <div className="mt-8">
            <Link className="inline-flex items-center gap-2 text-accent" href="/projects">
              Open full timeline <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <ArchitectureMap />
        </div>
      </section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteConfig.name,
            url: siteConfig.url,
            description: siteConfig.description
          })
        }}
      />
    </>
  );
}

function Metric({ label, value, suffix = "" }: { label: string; value: number; suffix?: string }) {
  return (
    <div className="rounded border border-line bg-white/5 p-4">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-2 text-3xl font-semibold">
        {value}
        {suffix}
      </dd>
    </div>
  );
}
