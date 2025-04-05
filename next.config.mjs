const nextConfig = {
  /* config options here */

  // Add webpack config required by Reown AppKit/Wagmi for SSR
  webpack: (config) => {
    // Exclude server-only packages from client bundles
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default nextConfig;
