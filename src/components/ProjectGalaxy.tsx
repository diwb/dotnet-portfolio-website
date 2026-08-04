"use client";

import { Canvas } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import React, { useMemo } from "react";
import type { Project } from "@/data/projects";

export default function ProjectGalaxy({ projects }: { projects: Project[] }) {
  const nodes = useMemo(
    () =>
      projects.map((project, index) => {
        const angle = (index / projects.length) * Math.PI * 2;
        return { project, x: Math.cos(angle) * 3, y: Math.sin(angle) * 2, z: (index % 3) - 1 };
      }),
    [projects]
  );

  return (
    <div className="h-[420px] rounded-lg border border-line" aria-label="3D project galaxy">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} frameloop="demand">
        {React.createElement("ambientLight", { intensity: 1.5 })}
        {React.createElement("pointLight", { position: [4, 4, 4], intensity: 2 })}
        {nodes.map(({ project, x, y, z }) => (
          <React.Fragment key={project.id}>
            {React.createElement(
              "group",
              { position: [x, y, z] },
              React.createElement(
                "mesh",
                null,
                React.createElement("sphereGeometry", { args: [0.12, 16, 16] }),
                React.createElement("meshStandardMaterial", {
                  color: project.order === 10 ? "#f5b74f" : "#39d0a4"
                })
              ),
              <Text position={[0.22, 0, 0]} fontSize={0.12} color="#e7edf5" anchorX="left">
                {project.order}
              </Text>
            )}
          </React.Fragment>
        ))}
      </Canvas>
    </div>
  );
}
