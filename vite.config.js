import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build",
  },
  server: {
    middleware: [
      (req, res, next) => {
        if (req.method === "GET" && !req.path.startsWith("/api")) {
          res.sendFile(resolve(__dirname, "build", "index.html"));
        } else {
          next();
        }
      },
    ],
  },
});
