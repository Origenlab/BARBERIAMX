/**
 * Content Collections — Barberia.mx (Astro 6 + Markdown).
 * Stack canónico OrigenLab: contenido editorial en Markdown, schema Zod strict.
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articulos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articulos' }),
  schema: z
    .object({
      title: z.string().max(70),
      description: z.string().max(160),
      category: z.enum(['Guías', 'Técnicas', 'Negocios', 'Tendencias', 'Estilo de vida']),
      publishDate: z.coerce.date().optional(),
      author: z.string().default('La Redacción'),
      readingMinutes: z.number().int().positive().optional(),
      draft: z.boolean().default(false),
    })
    .strict(),
});

export const collections = { articulos };
