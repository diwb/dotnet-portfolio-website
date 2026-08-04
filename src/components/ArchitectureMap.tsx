import React from "react";
import { categories } from "@/data/projects";
import { getProjectsByCategory } from "@/lib/portfolio";

export default function ArchitectureMap() {
  return (
    <section aria-labelledby="architecture-map-heading">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          Architecture map
        </p>
        <h2 id="architecture-map-heading" className="mt-2 text-3xl font-semibold">
          Project areas and technical coverage
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {categories.map((category) => {
          const projects = getProjectsByCategory(category);
          return (
            <article key={category} className="glass rounded-lg p-5">
              <h3 className="text-xl font-semibold">{category}</h3>
              <p className="mt-2 text-sm text-muted">{projects.length} linked projects</p>
              <ul className="mt-4 space-y-2 text-sm">
                {projects.map((project) => (
                  <li key={project.id} className="rounded border border-line bg-white/5 px-3 py-2">
                    {project.title}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
      <p className="mt-6 text-sm text-muted">
        Text alternative: the portfolio groups projects across Backend, Frontend, AI, Integration,
        DevOps, Data, Architecture and Automation.
      </p>
    </section>
  );
}
