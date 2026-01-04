// Datei: src/app/sitemap.ts

import { MetadataRoute } from 'next';

/**
 * Erstellt automatisch eine sitemap.xml für Google.
 * Jedes Mal, wenn du eine neue öffentliche Seite hinzufügst, trag sie hier ein.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_URL || "https://deine-domain.de";

  // Statische Routen deiner App
  const routes = [
    '',
    '/legal/imprint',
    '/legal/privacy',
    '/auth/signin',
    '/auth/signup',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes];
}