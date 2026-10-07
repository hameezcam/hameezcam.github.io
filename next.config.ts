import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/home", destination: "/index.html" },
      { source: "/about", destination: "/about.html" },
      { source: "/experience", destination: "/experience.html" },
      { source: "/projects", destination: "/projects.html" },
      { source: "/certifications", destination: "/certifications.html" },
      { source: "/education", destination: "/education.html" },
      { source: "/skills", destination: "/skills.html" },
      { source: "/contact", destination: "/contact.html" },
    ];
  },
};

export default nextConfig;
