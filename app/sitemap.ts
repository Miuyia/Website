import type { MetadataRoute } from 'next';
import { getAllPostMeta } from '@/lib/posts';
import { travelPlaces } from '@/lib/travel';

const SITE_URL = 'https://{{YOUR_DOMAIN}}';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPostMeta();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
{ url: `${SITE_URL}/travel`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/resume`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'yearly',
    priority: 0.7,
  }));

  const travelRoutes: MetadataRoute.Sitemap = travelPlaces.map(place => ({
    url: `${SITE_URL}/travel/${place.slug}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes, ...travelRoutes];
}
