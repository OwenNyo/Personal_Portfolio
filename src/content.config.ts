import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      stack: z.array(z.string()).min(1),
      github: z.string().url(),
      live: z.string().url().optional(),
      image: image(),
      imageAlt: z.string(),
      order: z.number().int(),
    }),
});

export const collections = { projects };
