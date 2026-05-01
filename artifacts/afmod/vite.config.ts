import { defineConfig } from "vite";
import path from "path";

const rawPort = process.env.PORT;
const port = rawPort ? Number(rawPort) : 3000;
const basePath = process.env.BASE_PATH || "/";

export default defineConfig({
  base: basePath,
  root: path.resolve(import.meta.dirname),
  publicDir: path.resolve(import.meta.dirname, "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index:           path.resolve(import.meta.dirname, "index.html"),
        ministry:        path.resolve(import.meta.dirname, "ministry.html"),
        houses:          path.resolve(import.meta.dirname, "houses.html"),
        cars:            path.resolve(import.meta.dirname, "cars.html"),
        gas:             path.resolve(import.meta.dirname, "gas.html"),
        grocery:         path.resolve(import.meta.dirname, "grocery.html"),
        "my-properties": path.resolve(import.meta.dirname, "my-properties.html"),
        messages:        path.resolve(import.meta.dirname, "messages.html"),
        twitter:         path.resolve(import.meta.dirname, "twitter.html"),
      },
    },
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
