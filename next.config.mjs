import mdx from "@next/mdx";
import createNextIntlPlugin from 'next-intl/plugin';

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: {
    unoptimized: true
  }
};

export default withNextIntl(withMDX(nextConfig));
