import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  posts.sort((a, b) => a.data.date < b.data.date ? 1 : -1);
  return rss({
    title: 'Histolore — Fascinating Stories From the Past',
    description: 'Daily history explained clearly: ancient civilizations, wars, mysteries and the people who shaped the world.',
    site: context.site ?? 'https://histolore.com',
    items: posts.map(post => {
      const d = new Date(post.data.date);
      return {
        title:       post.data.title,
        description: post.data.excerpt,
        link:        `/${post.slug}/`,
        pubDate:     isNaN(d.getTime()) ? new Date() : d,
      };
    }),
    customData: '<language>en-us</language>',
  });
}
