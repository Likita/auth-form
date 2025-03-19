import type { Config } from "@react-router/dev/config";

export default {
  basename: "/auth-form/",
  ssr: false,
  staticBuild: true,
  // Handle client-side routing for GitHub Pages
  future: {
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
  },
} satisfies Config;
