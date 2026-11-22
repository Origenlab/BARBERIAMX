export const site = {
  name: 'BARBERIA.MX',
  shortName: 'Barberia.mx',
  description: 'Directorio independiente de barberías en México con datos públicos de contacto.',
  url: 'https://barberia.mx',
  locale: 'es-MX',
  ogLocale: 'es_MX',
  themeColor: '#11100e',
  image: '/img/og-barberia.jpg',
  contact: {
    email: 'hola@barberia.mx',
    whatsapp: '5215547868402',
  },
  analytics: {
    ahrefsKey: '907GOmxDj/knyZuKZqp3og',
  },
  navigation: [
    { label: 'Directorio', href: '/directorio/' },
    { label: 'CDMX', href: '/ciudad-de-mexico/' },
    { label: 'Ciudades', href: '/zona/' },
    { label: 'Blog', href: '/blog/' },
  ],
} as const;

export const registrationMessage = [
  'Hola, quiero registrar una barbería en BARBERIA.MX.',
  '',
  'Nombre:',
  'Colonia y ciudad:',
  'Teléfono o WhatsApp:',
  'Servicios y precios:',
  'Sitio o redes sociales:',
].join('\n');

export const whatsappRegistrationUrl = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(registrationMessage)}`;

export default site;
