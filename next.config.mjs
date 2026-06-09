/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
// En GitHub Pages el sitio vive bajo /puppieshousepetshop
const basePath = isProd ? "/puppieshousepetshop" : "";

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
