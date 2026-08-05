import type { Metadata } from "next";
import { LocalizedText } from "@/components/LanguageProvider";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Perfil profissional e valores de engenharia."
};

export default function AboutPage() {
  return (
    <div className="px-4 py-14">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          <LocalizedText pt="Sobre" en="About" />
        </p>
        <h1 className="mt-2 text-4xl font-semibold">
          <LocalizedText pt={profile.role} en={profile.roleEn} />
        </h1>
        <p className="mt-5 text-xl leading-8 text-muted">
          <LocalizedText pt={profile.summary} en={profile.summaryEn} />
        </p>
        <section className="mt-10">
          <h2 className="text-2xl font-semibold">
            <LocalizedText pt="Problemas em que eu foco" en="Problems I Focus On" />
          </h2>
          <p className="mt-3 leading-8 text-muted">
            <LocalizedText
              pt="Bases backend confiáveis, fronteiras de integração, automação DevOps, arquitetura de agentes de IA e portfólios técnicos que tornam a qualidade de engenharia visível."
              en="Reliable backend foundations, integration boundaries, DevOps automation, AI agent architecture and technical portfolios that make engineering quality visible."
            />
          </p>
        </section>
        <section className="mt-10 grid gap-4 md:grid-cols-2">
          {profile.workingStyle.map((item, index) => (
            <div key={item} className="glass rounded-lg p-5">
              <LocalizedText pt={item} en={profile.workingStyleEn[index]} />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
