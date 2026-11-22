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

const barberiasCdmx = defineCollection({
  loader: file('src/data/barberias-cdmx.json'),
  schema: z.object({
    id: z.string().regex(/^cdmx-[a-z0-9-]+$/),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    name: z.string().min(1),
    borough: z.enum([
      'Álvaro Obregón',
      'Azcapotzalco',
      'Benito Juárez',
      'Coyoacán',
      'Cuajimalpa de Morelos',
      'Cuauhtémoc',
      'Gustavo A. Madero',
      'Iztacalco',
      'Iztapalapa',
      'La Magdalena Contreras',
      'Miguel Hidalgo',
      'Milpa Alta',
      'Tláhuac',
      'Tlalpan',
      'Venustiano Carranza',
      'Xochimilco',
    ]),
    boroughSlug: z.string().regex(/^[a-z0-9-]+$/),
    neighborhood: z.string().min(1),
    address: z.string().min(1),
    postalCode: z.string().regex(/^\d{5}$/).optional(),
    telephone: z.string().min(1),
    services: z.array(z.string().min(1)).min(1),
    hours: z.array(z.object({
      day: z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),
      label: z.enum(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']),
      value: z.string().min(1),
    }).strict()),
    verificationStatus: z.enum(['verified', 'reviewed', 'partial']),
    verifiedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    sources: z.array(z.url()).min(1),
    isNew: z.boolean(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    description: z.string().min(1).max(400),
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

export const collections = { pages, barberias, barberiasCdmx, articulos };
