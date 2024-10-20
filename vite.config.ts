import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@assets": "/src/assets",
      "@auth/": "/src/auth/",
      "@components": "/src/components",
      "@hooks": "/src/hooks",
      "@pages": "/src/pages",
      "@utils": "/src/utils",
      "@": "/src",
    },
  },
});
