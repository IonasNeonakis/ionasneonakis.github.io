import { getPosts } from "@/app/utils/utils";
import { baseURL } from "@/app/resources";
import {routing} from "@/i18n/routing";

export const dynamic = "force-static"

export default async function sitemap() {
  const locales = routing.locales;

  const blogs = locales.flatMap((locale) =>
    getPosts(['src', 'app', '[locale]', 'blog', 'posts', locale]).map((post) => ({
      url: `${baseURL}/${locale}/blog/${post.slug}`,
      lastModified: post.metadata.publishedAt,
    }))
  );

  const works = locales.flatMap((locale) =>
    getPosts(['src', 'app', '[locale]', 'work', 'projects', locale]).map((post) => ({
      url: `${baseURL}/${locale}/work/${post.slug}`,
      lastModified: post.metadata.publishedAt,
    }))
  );

  const routes = locales.flatMap((locale)=>
    ['', '/blog', '/work'].map((route) => ({
      url: `${baseURL}/${locale}${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    }))
  );

  return [...routes, ...blogs, ...works];
}
