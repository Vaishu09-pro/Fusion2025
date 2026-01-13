import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import githubPages from "@astrojs/github-pages";

export default defineConfig({
  integrations: [react()],
  site: "https://vaishu09-pro.github.io",
  base: "/Fusion2025",
  output: "static",
  adapter: githubPages()
});
