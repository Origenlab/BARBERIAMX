import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const [barberias, articulos, pages] = await Promise.all([
    getCollection('barberias'),
    getCollection('articulos', ({ data }) => !data.draft),
    getCollection('pages'),
  ]);

  const records = [
    ...barberias.map(({ data }) => ({
      title: data.name,
      url: data.cityId === 'guadalajara' ? '/jalisco/guadalajara/' : `/${data.cityId}/${data.cityId}/`,
      type: 'Barberías',
      description: [data.address, data.locality, data.region].filter(Boolean).join(' · '),
      terms: [data.name, data.locality, data.region, data.telephone].filter(Boolean),
    })),
    ...articulos.map(({ id, data }) => ({
      title: data.title,
      url: `/articulos/${id}/`,
      type: 'Artículos',
      description: data.description,
      terms: [data.title, data.category],
    })),
    ...pages
      .filter(({ id }) => !['404', 'buscar'].includes(id))
      .map(({ data }) => ({
        title: data.title,
        url: data.path,
        type: 'Páginas',
        description: data.description,
        terms: [data.title],
      })),
  ];

  return new Response(JSON.stringify(records), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
