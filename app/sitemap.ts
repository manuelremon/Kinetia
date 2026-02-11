import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kinetia.tech';
  const lastModified = new Date();

  return [
    { url: baseUrl, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/#servicios`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/#sobre`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/#faq`, lastModified, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/#contacto`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
  ];
}
