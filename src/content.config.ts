import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Tools — side projects and software. Garage vibe, some half-broken, that's fine.
const tools = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tools' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(), // one-liner: what problem it solves
    tags: z.array(z.string()).default([]), // free-form, e.g. ["work", "fooling-around"]
    status: z.enum(['active', 'archived', 'half-broken']).default('active'),
    url: z.string().url().optional(), // link out if it's live somewhere
    draft: z.boolean().default(false),
  }),
});

// Notes ("Margins") — short, transient musings. No theme required.
const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { tools, notes };
