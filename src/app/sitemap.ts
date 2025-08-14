import { MetadataRoute } from 'next';
import articles from '@/lib/articles';
import tools from '@/app/tools';

export const dynamic = "force-static";

const DOMAIN = 'https://meminit.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  routes.push({
    url: `${DOMAIN}/`,
    lastModified: new Date(),
  });

  routes.push({
    url: `${DOMAIN}/contact-us`,
    lastModified: new Date()
  });

  routes.push({
    url: '/about-us',
    lastModified: new Date()
  })

  articles.list().forEach((article: any) => {
    routes.push({
      url: `${DOMAIN}/articles/${article.slug}`,
      lastModified: new Date(),
    });
  });

  tools.all.forEach((tool: any) => {
    routes.push({
      url: `${DOMAIN}/tools/${tool.identifier}`,
      lastModified: new Date(),
    });
  });

  return routes;
}