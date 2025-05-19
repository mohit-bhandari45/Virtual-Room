import path from "path";

module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // if using App Router
  },
  webpack(config: { resolve: { alias: { [x: string]: string; }; }; }) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};