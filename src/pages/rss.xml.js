import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const tools = await getCollection('tools', ({ data }) => !data.draft);
  const notes = await getCollection('notes', ({ data }) => !data.draft);

  const items = [
    ...tools.map((t) => ({
      title: t.data.title,
      pubDate: t.data.date,
      description: t.data.description,
      link: `/tools/${t.id}/`,
    })),
    ...notes.map((n) => ({
      title: n.data.title,
      pubDate: n.data.date,
      description: '',
      link: `/notes/${n.id}/`,
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: "Balshankar",
    description: "Tools and notes.",
    site: context.site,
    items,
  });
}
