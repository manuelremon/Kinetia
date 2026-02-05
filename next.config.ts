import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
    prependData: `@use "abstracts/variables" as *; @use "abstracts/mixins" as *;`,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
