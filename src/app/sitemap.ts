import fs from 'fs';
import path from 'path';
import { MetadataRoute } from 'next';

const DOMAIN = 'https://meminit.com';
const APP_DIR = path.join(process.cwd(), 'src', 'app');
const EXCLUDE = ['api', '_components', '_lib', '_utils', '_middleware'];

type RouteMeta = {
  url: string;
  lastModified: Date;
};

function getRoutes(dir = '', parent = ''): RouteMeta[] {
  const fullPath = path.join(APP_DIR, dir);
  const entries = fs.readdirSync(fullPath, { withFileTypes: true });
  let routes: RouteMeta[] = [];

  for (const entry of entries) {
    const name = entry.name;
    if (EXCLUDE.includes(name) || name.startsWith('_')) continue;

    const fullEntryPath = path.join(fullPath, name);
    const routePath = path.join('/', parent, name).replace(/\\/g, '/');

    if (entry.isDirectory()) {
      const pagePathTS = path.join(fullEntryPath, 'page.tsx');
      const pagePathJS = path.join(fullEntryPath, 'page.js');

      if (fs.existsSync(pagePathTS) || fs.existsSync(pagePathJS)) {
        const actualPagePath = fs.existsSync(pagePathTS) ? pagePathTS : pagePathJS;
        const stats = fs.statSync(actualPagePath);

        routes.push({
          url: `${DOMAIN}${routePath}`,
          lastModified: stats.mtime,
        });
      }

      routes = routes.concat(getRoutes(path.join(dir, name), path.join(parent, name)));
    }
  }

  return routes;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  const rootPage = ['page.tsx', 'page.js'].find(f => fs.existsSync(path.join(APP_DIR, f)));
  if (rootPage) {
    const stats = fs.statSync(path.join(APP_DIR, rootPage));
    routes.push({
      url: `${DOMAIN}/`,
      lastModified: stats.mtime,
    });
  }

return routes.concat(getRoutes());
}
