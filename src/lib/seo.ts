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

export function localBusinessSchema(input: {
  name: string;
  description: string;
  path: string;
  address: string;
  neighborhood: string;
  borough: string;
  postalCode?: string | undefined;
  telephone: string;
  latitude?: number | undefined;
  longitude?: number | undefined;
  hours: Array<{ day: string; value: string }>;
}) {
  const daySchema: Record<string, string> = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
  };

  return {
    '@context': context,
    '@type': 'HairSalon',
    '@id': `${absoluteUrl(input.path)}#business`,
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    telephone: input.telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: input.address,
      addressLocality: 'Ciudad de México',
      addressRegion: 'CDMX',
      ...(input.postalCode ? { postalCode: input.postalCode } : {}),
      addressCountry: 'MX',
    },
    ...(input.latitude !== undefined && input.longitude !== undefined ? {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: input.latitude,
        longitude: input.longitude,
      },
    } : {}),
    ...(input.hours.length > 0 ? { openingHoursSpecification: input.hours.flatMap(({ day, value }) =>
      value.split(',').flatMap((range) => {
        const [opens, closes] = range.trim().split('–');
        if (!opens || !closes) return [];
        return [{
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: `https://schema.org/${daySchema[day]}`,
          opens,
          closes,
        }];
      }),
    ) } : {}),
  };
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replaceAll('<', '\\u003c');
}
