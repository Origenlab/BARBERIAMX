import type { APIRoute } from 'astro';
import site from '@config/site';

export const GET: APIRoute = () =>
  new Response(JSON.stringify({
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#f7f5f0',
    theme_color: site.themeColor,
    lang: site.locale,
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }), { headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' } });
