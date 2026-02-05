import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
    additionalData: `@use "abstracts/variables" as *; @use "abstracts/mixins" as *;`,
    silenceDeprecations: ['legacy-js-api'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
