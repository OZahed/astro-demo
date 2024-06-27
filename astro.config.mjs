import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import node from "@astrojs/node";

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [tailwind(), svelte(), db()],
  adapter: node({
    mode: "standalone"
  })
});