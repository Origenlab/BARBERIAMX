import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const pages = defineCollection({
  loader: file('src/data/pages.json'),
  schema: z.object({
    id: z.string(),
    path: z.string(),
    title: z.string().min(1),
    description: z.string(),
    canonicalPath: z.string(),
    robots: z.string(),
    image: z.url(),
    bodyClass: z.string(),
    mainHtml: z.string().min(1),
    scripts: z.array(z.string()),
  }).strict(),
});

const barberias = defineCollection({
  loader: file('src/data/barberias.json'),
  schema: z.object({
    id: z.string(),
    cityId: z.enum(['guadalajara', 'merida', 'monterrey', 'puebla', 'queretaro']),
    region: z.string(),
    position: z.number().int().positive(),
    name: z.string().min(1),
    address: z.string(),
    locality: z.string(),
    telephone: z.string(),
    website: z.string(),
  }).strict(),
});

const articulos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articulos' }),
  schema: z.object({
    title: z.string().min(1).max(90),
    description: z.string().min(1).max(180),
    category: z.string().min(1),
    author: z.string().min(1),
    publishDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    image: z.url(),
    draft: z.boolean().default(false),
  }).strict(),
});

export const collections = { pages, barberias, articulos };
