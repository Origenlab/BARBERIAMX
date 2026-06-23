/**
 * SSoT (Single Source of Truth) del sitio — Barberia.mx
 * Stack canónico OrigenLab: Astro 6 + Markdown.
 * Todo dato global del sitio vive aquí (no hardcodear en páginas).
 */

export const site = {
  nombre: 'Barberia.mx',
  tagline: 'El directorio de la barbería mexicana',
  descripcion:
    'Directorio independiente de barberías profesionales en México. En construcción y crecimiento.',
  url: 'https://barberia.mx',
  dominio: 'barberia.mx',
  idioma: 'es-MX',
  themeColor: '#0a0a0a',
  // Contacto (sólo datos reales; completar cuando se confirmen)
  contacto: {
    email: 'hola@barberia.mx',
    whatsapp: '', // ← número real pendiente
  },
  social: {
    instagram: 'https://instagram.com/barberiamx',
    twitter: 'https://twitter.com/barberiamx',
  },
  // Navegación principal
  nav: [
    { label: 'Directorio', href: '/directorio/' },
    { label: 'CDMX', href: '/ciudad-de-mexico/' },
    { label: 'Zonas', href: '/zona/' },
    { label: 'Blog', href: '/blog/' },
  ],
  // Secciones aún no operativas → marcadas honestamente
  proximamente: ['Marketplace', 'Bolsa de empleo', 'Registro de barberías'],
} as const;

export type Site = typeof site;
export default site;
