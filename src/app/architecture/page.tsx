import type { Metadata } from "next";
import ArchitectureMap from "@/components/ArchitectureMap";

export const metadata: Metadata = {
  title: "Arquitetura",
  description: "Mapa de arquitetura agrupando projetos do portfólio por área técnica."
};

export default function ArchitecturePage() {
  return (
    <div className="px-4 py-14">
      <div className="mx-auto max-w-7xl">
        <ArchitectureMap />
      </div>
    </div>
  );
}
