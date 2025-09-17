import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { basePath } from "./basepath";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `/${basePath}/`,
});
