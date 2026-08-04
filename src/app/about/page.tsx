import type { Metadata } from "next";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "About",
  description: "Professional profile and engineering values."
};

export default function AboutPage() {
  return (
    <div className="px-4 py-14">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">About</p>
        <h1 className="mt-2 text-4xl font-semibold">{profile.role}</h1>
        <p className="mt-5 text-xl leading-8 text-muted">{profile.summary}</p>
        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Problems I Focus On</h2>
          <p className="mt-3 leading-8 text-muted">
            Reliable backend foundations, integration boundaries, DevOps automation, AI agent
            architecture and technical portfolios that make engineering quality visible.
          </p>
        </section>
        <section className="mt-10 grid gap-4 md:grid-cols-2">
          {profile.workingStyle.map((item) => (
            <div key={item} className="glass rounded-lg p-5">
              {item}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
