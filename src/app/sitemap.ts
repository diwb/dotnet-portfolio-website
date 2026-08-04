export const dynamic = "force-static";

import { siteConfig } from "@/data/profile";
import { getProjects } from "@/lib/portfolio";

export default function sitemap() {
  const baseRoutes = [
    "",
    "/projects",
    "/evidence",
    "/architecture",
    "/skills",
    "/about",
    "/contact"
  ];
  return [
    ...baseRoutes.map((route) => ({ url: `${siteConfig.url}${route}`, lastModified: new Date() })),
    ...getProjects().map((project) => ({
      url: `${siteConfig.url}/projects/${project.id}`,
      lastModified: new Date()
    }))
  ];
}
