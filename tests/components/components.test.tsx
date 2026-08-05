import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ArchitectureMap from "@/components/ArchitectureMap";
import EvidenceDashboard from "@/components/EvidenceDashboard";
import ProjectGalaxyPanel from "@/components/ProjectGalaxyPanel";
import ProjectsTimeline from "@/components/ProjectsTimeline";
import { getProjects } from "@/lib/portfolio";

describe("components", () => {
  it("renders the evidence dashboard in Portuguese by default", () => {
    render(<EvidenceDashboard />);
    expect(
      screen.getByRole("heading", { name: "Sinais de engenharia revisáveis" })
    ).toBeInTheDocument();
    expect(screen.getByText("Total de projetos")).toBeInTheDocument();
  });

  it("renders a compact evidence dashboard", () => {
    render(<EvidenceDashboard compact />);
    expect(screen.getByText("Resultado médio")).toBeInTheDocument();
  });

  it("renders the architecture map with text alternative", () => {
    render(<ArchitectureMap />);
    expect(
      screen.getByRole("heading", { name: "Áreas dos projetos e cobertura técnica" })
    ).toBeInTheDocument();
    expect(screen.getByText(/Alternativa textual/)).toBeInTheDocument();
  });

  it("renders the projects timeline", () => {
    render(<ProjectsTimeline projects={getProjects().slice(0, 2)} />);
    expect(screen.getByText(".NET Enterprise Template")).toBeInTheDocument();
    expect(screen.getByText("Angular Enterprise Dashboard")).toBeInTheDocument();
    expect(screen.getAllByText("Caso")).toHaveLength(2);
  });

  it("renders the 3D fallback by default for reduced motion safety", () => {
    render(<ProjectGalaxyPanel projects={getProjects()} />);
    expect(screen.getByTestId("project-galaxy-fallback")).toBeInTheDocument();
  });
});
