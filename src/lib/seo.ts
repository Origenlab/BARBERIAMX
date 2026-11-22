import site from '@config/site';

const context = 'https://schema.org';

export const absoluteUrl = (path: string) => new URL(path, site.url).toString();

export function organizationSchema() {
  return {
    '@context': context,
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.shortName,
    url: site.url,
    logo: absoluteUrl('/icon-512.png'),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: site.contact.email,
      availableLanguage: 'es',
      areaServed: 'MX',
    },
  };
}

export function websiteSchema() {
  return {
    '@context': context,
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: site.shortName,
    url: site.url,
    inLanguage: site.locale,
    publisher: { '@id': `${site.url}/#organization` },
  };
}

export function webPageSchema(title: string, description: string, path: string) {
  const url = absoluteUrl(path);
  return {
    '@context': context,
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    name: title,
    description,
    url,
    inLanguage: site.locale,
    isPartOf: { '@id': `${site.url}/#website` },
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  author: string;
  image: string;
  publishDate?: Date;
  updatedDate?: Date;
}) {
  return {
    '@context': context,
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    mainEntityOfPage: absoluteUrl(input.path),
    image: input.image,
    inLanguage: site.locale,
    author: { '@type': 'Organization', name: input.author },
    publisher: { '@id': `${site.url}/#organization` },
    ...(input.publishDate ? { datePublished: input.publishDate.toISOString() } : {}),
    ...(input.updatedDate ? { dateModified: input.updatedDate.toISOString() } : {}),
  };
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replaceAll('<', '\\u003c');
}
