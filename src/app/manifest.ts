export const dynamic = "force-static";

import { withBasePath } from "@/lib/paths";

export default function manifest() {
  return {
    name: "DIWB Engineering OS",
    short_name: "DIWB OS",
    lang: "pt-BR",
    start_url: withBasePath("/"),
    display: "standalone",
    background_color: "#0d1117",
    theme_color: "#39d0a4",
    icons: [
      {
        src: withBasePath("/favicon.svg"),
        sizes: "64x64",
        type: "image/svg+xml"
      }
    ]
  };
}
