// Datei: src/app/robots.ts

import { MetadataRoute } from 'next';

/**
 * Diese Datei sagt Suchmaschinen, welche Bereiche sie scannen dürfen.
 * Wir sperren das Admin-Panel und die API-Routen für Google.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_URL || "https://deine-domain.de";

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/', 
        '/api/', 
        '/dashboard/', 
        '/auth/'
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}