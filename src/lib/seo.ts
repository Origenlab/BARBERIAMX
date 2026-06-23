/**
 * lib/seo.ts — JSON-LD canónico por pageType (Barberia.mx).
 * REGLA DURA OrigenLab: cero `aggregateRating` fabricado. Sólo se emite
 * AggregateRating si se pasan reseñas REALES y verificables.
 */
import site from '@config/site';

const ctx = 'https://schema.org';

/** Organization + WebSite (para el home / global). */
export function orgAndWebsite() {
  return [
    {
      '@context': ctx,
      '@type': 'Organization',
      name: site.nombre,
      url: site.url,
      sameAs: [site.social.instagram, site.social.twitter].filter(Boolean),
    },
    {
      '@context': ctx,
      '@type': 'WebSite',
      name: site.nombre,
      url: site.url,
      inLanguage: site.idioma,
    },
  ];
}

/** Article (para artículos editoriales en Markdown). */
export function article(o: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  author?: string;
  image?: string;
}) {
  return {
    '@context': ctx,
    '@type': 'Article',
    headline: o.title,
    description: o.description,
    mainEntityOfPage: o.url,
    inLanguage: site.idioma,
    ...(o.datePublished ? { datePublished: o.datePublished } : {}),
    author: { '@type': o.author ? 'Person' : 'Organization', name: o.author ?? site.nombre },
    publisher: { '@type': 'Organization', name: site.nombre, url: site.url },
    ...(o.image ? { image: o.image } : {}),
  };
}

/** LocalBusiness (barbería del directorio). reseñas SOLO si son reales. */
export function barberShop(o: {
  name: string;
  url: string;
  city?: string;
  area?: string;
  address?: string;
  rating?: number;   // SOLO dato real (Google Maps)
  reviews?: number;  // SOLO dato real
}) {
  const node: Record<string, unknown> = {
    '@context': ctx,
    '@type': 'HairSalon',
    name: o.name,
    url: o.url,
    ...(o.address ? { address: { '@type': 'PostalAddress', streetAddress: o.address, addressLocality: o.city ?? 'Ciudad de México', addressCountry: 'MX' } } : {}),
    ...(o.area ? { areaServed: { '@type': 'City', name: o.area } } : {}),
  };
  // Sólo AggregateRating con datos reales y verificables.
  if (typeof o.rating === 'number' && typeof o.reviews === 'number' && o.reviews > 0) {
    node.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: String(o.rating),
      reviewCount: String(o.reviews),
    };
  }
  return node;
}

/** Serializa uno o varios nodos a un <script type="application/ld+json">. */
export function jsonLd(data: unknown): string {
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}
