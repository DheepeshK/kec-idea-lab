import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXTAUTH_URL?.replace(/\/+$/, '') || 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/about', '/facilities', '/team', '/events', '/calendar', '/contact'];

  return staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));
}
