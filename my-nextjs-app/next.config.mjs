import withSerwistInit from "@serwist/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const withSerwist = withSerwistInit({
  swSrc: "client/sw.ts",
  swDest: "public/sw.js",
  register: false,
  maximumFileSizeToCacheInBytes: 3e7,
  exclude: [/.+\.map$/, /\/site\//],
  reloadOnOnline: false,
});

export default withSerwist(nextConfig);
