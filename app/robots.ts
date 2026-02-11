import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/.next/', '/node_modules/'],
    },
    sitemap: 'https://kinetia.tech/sitemap.xml',
  };
}
