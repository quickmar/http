import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "happy-dom",
    root: "./",
    coverage: {
      reporter: ["text", "html"],
      exclude: ["node_modules/"],
    },
  },
});
