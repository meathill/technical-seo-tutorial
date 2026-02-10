import type { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/slide-utils';
import { getSlideDataBySlugServer } from '@/lib/slide-data-server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://seo.meathill.com';
  const slugs = getAllSlugs();

  // Create sitemap entries for all slide decks
  const slideEntries = await Promise.all(
    slugs.map(async (slug) => {
      try {
        const slideData = await getSlideDataBySlugServer(slug);
        return {
          url: `${baseUrl}/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: slideData?.day === 1 ? 1.0 : 0.8,
        };
      } catch (error) {
        console.error(`Error generating sitemap entry for ${slug}:`, error);
        // Return a default entry if there's an error
        return {
          url: `${baseUrl}/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        };
      }
    }),
  );

  // Add the homepage
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    ...slideEntries,
  ];

  return routes;
}
