"use client";

import React from "react";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { LocalizedText } from "@/components/LanguageProvider";
import type { Project } from "@/data/projects";

const ProjectGalaxy = dynamic(() => import("./ProjectGalaxy"), {
  ssr: false,
  loading: () => <Fallback />
});

export default function ProjectGalaxyPanel({ projects }: { projects: Project[] }) {
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = () => setReducedMotion(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reducedMotion ? <Fallback /> : <ProjectGalaxy projects={projects} />;
}

function Fallback() {
  return (
    <div
      className="rounded-lg border border-line bg-white/5 p-6"
      data-testid="project-galaxy-fallback"
    >
      <h2 className="text-2xl font-semibold">
        <LocalizedText pt="Mapa 2D de engenharia" en="2D engineering map fallback" />
      </h2>
      <p className="mt-2 text-muted">
        <LocalizedText
          pt="A camada 3D é opcional e fica desativada quando o usuário prefere reduzir movimento."
          en="The 3D layer is optional and disabled when reduced motion is preferred."
        />
      </p>
    </div>
  );
}
