import type { Metadata } from "next";
import ProjectsTimeline from "@/components/ProjectsTimeline";
import ProjectGalaxyPanel from "@/components/ProjectGalaxyPanel";
import { getProjects } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Projects",
  description: "Timeline of ten DIWB engineering portfolio projects."
};

export default function ProjectsPage() {
  const projects = getProjects();
  return (
    <div className="px-4 py-14">
      <div className="mx-auto max-w-7xl">
        <ProjectGalaxyPanel projects={projects} />
        <div className="mt-12">
          <ProjectsTimeline projects={projects} />
        </div>
      </div>
    </div>
  );
}
