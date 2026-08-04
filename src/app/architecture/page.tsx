import type { Metadata } from "next";
import ArchitectureMap from "@/components/ArchitectureMap";

export const metadata: Metadata = {
  title: "Architecture",
  description: "Architecture map grouping portfolio projects by technical area."
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
