/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    include: [
      "**/unit/*.{test,spec}.?(c|m)[jt]s?(x)",
      "**/integration/**/*.{test,spec}.?(c|m)[jt]s?(x)",
      "./src/_tests_/*.{test,spec}.?(c|m)[jt]s?(x)",
    ],
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/_tests_/setupTests.ts",
  },
});
