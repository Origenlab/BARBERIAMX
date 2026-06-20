/**
 * Directorio real de barberías — Barberia.mx
 * ------------------------------------------------------------------
 * Base de datos tipada del directorio. Modelo inspirado en el
 * directorio real de MEDEDUL (`dulcerias.ts`): SOLO barberías reales,
 * con datos de fuentes públicas. REGLA DE INTEGRIDAD:
 *   - NO inventar ratings ni número de reseñas (`rating`/`resenas` sólo
 *     con datos reales de Google Maps; si no, se omiten).
 *   - `verificacion: 'pendiente'` = listada de fuente pública, falta
 *     confirmación directa.  'confirmada' = verificada.
 *   - `sinWeb: true` = en Google Business/Maps SIN sitio web propio →
 *     candidata a APOYAR con presencia en línea (y prospecto de OrigenLab).
 * Crecer este archivo es el trabajo editorial del directorio.
 */

export type Verificacion = 'pendiente' | 'confirmada';

export interface Barberia {
  nombre: string;
  slug: string;
  // Ubicación
  estado: string;
  estadoSlug: string;
  alcaldiaMunicipio: string;
  zona: string;
  direccion?: string;
  // Contacto (sólo datos reales)
  telefono?: string;
  web?: string;
  instagram?: string;
  /** En Google Business/Maps pero SIN web propia → la apoyamos con un sitio. */
  sinWeb?: boolean;
  // Oferta
  servicios: string[];
  // Reseñas — SOLO datos reales de Google Maps (omitir si no se tienen)
  rating?: number;
  resenas?: number;
  // Trazabilidad
  fuente: string;
  verificacion: Verificacion;
}

export const barberias: Barberia[] = [
  // ───── Ciudad de México ─────
  { nombre: 'Scalper Barbería (Polanco)', slug: 'scalper-polanco', estado: 'Ciudad de México', estadoSlug: 'ciudad-de-mexico', alcaldiaMunicipio: 'Miguel Hidalgo', zona: 'Polanco', direccion: 'Alejandro Dumas 84 B, Polanco', servicios: ['Corte', 'Barba', 'Afeitado'], fuente: 'Listados públicos (AgendaPro/Fresha)', verificacion: 'pendiente' },
  { nombre: 'Scalper Barbería (Condesa)', slug: 'scalper-condesa', estado: 'Ciudad de México', estadoSlug: 'ciudad-de-mexico', alcaldiaMunicipio: 'Cuauhtémoc', zona: 'Condesa', direccion: 'Av. Mazatlán 139, Condesa', servicios: ['Corte', 'Barba', 'Afeitado'], fuente: 'Listados públicos (AgendaPro/Fresha)', verificacion: 'pendiente' },
  { nombre: 'La Logia Barbería (Condesa)', slug: 'la-logia-condesa', estado: 'Ciudad de México', estadoSlug: 'ciudad-de-mexico', alcaldiaMunicipio: 'Cuauhtémoc', zona: 'Condesa', servicios: ['Corte', 'Barba', 'Afeitado clásico'], fuente: 'Listados públicos (cadena con varias sedes en CDMX)', verificacion: 'pendiente' },
  { nombre: 'La Logia Barbería (Roma Norte)', slug: 'la-logia-roma-norte', estado: 'Ciudad de México', estadoSlug: 'ciudad-de-mexico', alcaldiaMunicipio: 'Cuauhtémoc', zona: 'Roma Norte', servicios: ['Corte', 'Barba', 'Afeitado clásico'], fuente: 'Listados públicos (cadena con varias sedes en CDMX)', verificacion: 'pendiente' },
  { nombre: 'Bardo’s Barber (Reforma)', slug: 'bardos-reforma', estado: 'Ciudad de México', estadoSlug: 'ciudad-de-mexico', alcaldiaMunicipio: 'Cuauhtémoc', zona: 'Cuauhtémoc / Reforma', direccion: 'Río Tíber 87, Col. Cuauhtémoc', telefono: '55 9238 1522', web: 'https://www.bardosbarber.com', instagram: 'https://instagram.com/bardosbarber', servicios: ['Corte', 'Barba', 'Afeitado', 'Facial', 'Spa'], fuente: 'Sitio oficial bardosbarber.com / Fresha', verificacion: 'pendiente' },
  { nombre: 'Bardo’s Barber (Roma Norte)', slug: 'bardos-roma-norte', estado: 'Ciudad de México', estadoSlug: 'ciudad-de-mexico', alcaldiaMunicipio: 'Cuauhtémoc', zona: 'Roma Norte', direccion: 'Av. Sonora 123, Mezzanine, Roma Norte', telefono: '55 5204 3755', web: 'https://www.bardosbarber.com', instagram: 'https://instagram.com/bardosbarber', servicios: ['Corte', 'Barba', 'Afeitado', 'Facial', 'Spa'], fuente: 'Sitio oficial bardosbarber.com / Fresha', verificacion: 'pendiente' },
  { nombre: 'Bardo’s Barber (Condesa)', slug: 'bardos-condesa', estado: 'Ciudad de México', estadoSlug: 'ciudad-de-mexico', alcaldiaMunicipio: 'Cuauhtémoc', zona: 'Condesa', direccion: 'Av. Nuevo León 144, Condesa', telefono: '55 9559 5469', web: 'https://www.bardosbarber.com', instagram: 'https://instagram.com/bardosbarber', servicios: ['Corte', 'Barba', 'Afeitado', 'Facial', 'Spa'], fuente: 'Sitio oficial bardosbarber.com', verificacion: 'pendiente' },
  { nombre: 'Bardo’s Barber (Polanco)', slug: 'bardos-polanco', estado: 'Ciudad de México', estadoSlug: 'ciudad-de-mexico', alcaldiaMunicipio: 'Miguel Hidalgo', zona: 'Polanco', direccion: 'Homero 1425, local A-2, Polanco', telefono: '55 8989 7207', web: 'https://www.bardosbarber.com', instagram: 'https://instagram.com/bardosbarber', servicios: ['Corte', 'Barba', 'Afeitado', 'Facial', 'Spa'], fuente: 'Sitio oficial bardosbarber.com', verificacion: 'pendiente' },
  { nombre: 'Bardo’s Barber (Del Valle)', slug: 'bardos-del-valle', estado: 'Ciudad de México', estadoSlug: 'ciudad-de-mexico', alcaldiaMunicipio: 'Benito Juárez', zona: 'Del Valle', direccion: 'Eugenia 1033, Col. del Valle Centro', telefono: '55 9804 4589', web: 'https://www.bardosbarber.com', instagram: 'https://instagram.com/bardosbarber', servicios: ['Corte', 'Barba', 'Afeitado', 'Facial', 'Spa'], fuente: 'Sitio oficial bardosbarber.com', verificacion: 'pendiente' },
  { nombre: 'Mr. Venez Barbería & Spa (Del Valle)', slug: 'mr-venez-del-valle', estado: 'Ciudad de México', estadoSlug: 'ciudad-de-mexico', alcaldiaMunicipio: 'Benito Juárez', zona: 'Del Valle', direccion: 'Gabriel Mancera 405-A, Del Valle Centro', sinWeb: true, servicios: ['Corte', 'Barba', 'Afeitado', 'Spa'], fuente: 'Listados públicos (Google Maps)', verificacion: 'pendiente' },
  { nombre: 'La Única Barbería (Narvarte)', slug: 'la-unica-narvarte', estado: 'Ciudad de México', estadoSlug: 'ciudad-de-mexico', alcaldiaMunicipio: 'Benito Juárez', zona: 'Narvarte', sinWeb: true, servicios: ['Corte', 'Barba', 'Afeitado'], fuente: 'Listados públicos (Google Maps) — dirección por confirmar', verificacion: 'pendiente' },

  // ───── Guadalajara, Jalisco ─────
  { nombre: 'Barbería Capital (Lafayette)', slug: 'barberia-capital-gdl', estado: 'Jalisco', estadoSlug: 'jalisco', alcaldiaMunicipio: 'Guadalajara', zona: 'Lafayette', direccion: 'C. Miguel Lerdo de Tejada 2308, Col. Americana, Lafayette', sinWeb: true, servicios: ['Corte', 'Barba', 'Afeitado'], fuente: 'Fresha / Google Maps', verificacion: 'pendiente' },
  { nombre: 'Barbería Meryma’at (Providencia)', slug: 'merymaat-gdl', estado: 'Jalisco', estadoSlug: 'jalisco', alcaldiaMunicipio: 'Guadalajara', zona: 'Providencia', direccion: 'Puerto Bello 1594, Providencia 3a. Secc.', sinWeb: true, servicios: ['Corte', 'Barba', 'Afeitado'], fuente: 'Listados públicos (Google Maps)', verificacion: 'pendiente' },

  // ───── San Pedro Garza García, Nuevo León ─────
  { nombre: 'Sala de Corte (San Pedro)', slug: 'sala-de-corte-spgg', estado: 'Nuevo León', estadoSlug: 'nuevo-leon', alcaldiaMunicipio: 'San Pedro Garza García', zona: 'Del Valle', direccion: 'Av. Manuel Gómez Morín 801, Plaza Comunia local 208, Del Valle', web: 'https://saladecorte.mx', servicios: ['Corte', 'Barba', 'Afeitado', 'Alta peluquería'], fuente: 'Sitio oficial saladecorte.mx', verificacion: 'pendiente' },
  { nombre: 'Villa y Zapata BarberShop (San Pedro)', slug: 'villa-y-zapata-spgg', estado: 'Nuevo León', estadoSlug: 'nuevo-leon', alcaldiaMunicipio: 'San Pedro Garza García', zona: 'Del Valle', direccion: 'Río Amazonas 50, local 8, Del Valle', web: 'https://villayzapata.mx', servicios: ['Corte', 'Barba', 'Afeitado'], fuente: 'Sitio oficial villayzapata.mx', verificacion: 'pendiente' },
  { nombre: 'Kraken Barber Club (San Pedro)', slug: 'kraken-spgg', estado: 'Nuevo León', estadoSlug: 'nuevo-leon', alcaldiaMunicipio: 'San Pedro Garza García', zona: 'Valle Poniente', direccion: 'Eje exterior 10, Privada Valle Poniente', web: 'http://www.krakenbarberclub.com', servicios: ['Corte', 'Barba', 'Afeitado'], fuente: 'Sitio oficial krakenbarberclub.com', verificacion: 'pendiente' },
  { nombre: 'La Barbería 1983 (San Pedro)', slug: 'la-barberia-1983-spgg', estado: 'Nuevo León', estadoSlug: 'nuevo-leon', alcaldiaMunicipio: 'San Pedro Garza García', zona: 'San Pedro', direccion: 'Av. las Torres 208, San Pedro', sinWeb: true, servicios: ['Corte', 'Barba', 'Afeitado'], fuente: 'Listados públicos (Google Maps)', verificacion: 'pendiente' },

  // ───── Puebla ─────
  { nombre: 'The Barber Place (Angelópolis)', slug: 'the-barber-place-pue', estado: 'Puebla', estadoSlug: 'puebla', alcaldiaMunicipio: 'Puebla', zona: 'Angelópolis', direccion: 'Blvd. del Niño Poblano 2510, Reserva Territorial Atlixcáyotl', telefono: '222 216 5184', web: 'https://thebarberplace.com.mx', servicios: ['Corte', 'Barba', 'Afeitado'], fuente: 'Sitio oficial thebarberplace.com.mx', verificacion: 'pendiente' },

  // ───── Querétaro ─────
  { nombre: 'Barbería Juriquilla', slug: 'barberia-juriquilla-qro', estado: 'Querétaro', estadoSlug: 'queretaro', alcaldiaMunicipio: 'Santiago de Querétaro', zona: 'Juriquilla', web: 'https://barberiajuriquilla.com', servicios: ['Corte', 'Barba', 'Afeitado', 'Color', 'Facial'], fuente: 'Sitio oficial barberiajuriquilla.com', verificacion: 'pendiente' },
  { nombre: 'Peluquería y Barbería Uppercut', slug: 'uppercut-qro', estado: 'Querétaro', estadoSlug: 'queretaro', alcaldiaMunicipio: 'Santiago de Querétaro', zona: 'Juriquilla', direccion: 'Blvd. Universitario 496, local 5, Acueducto', telefono: '442 251 0170', sinWeb: true, servicios: ['Corte', 'Barba', 'Afeitado'], fuente: 'Listados públicos (Google Maps/Fresha)', verificacion: 'pendiente' },
  { nombre: 'Barber House Querétaro', slug: 'barber-house-qro', estado: 'Querétaro', estadoSlug: 'queretaro', alcaldiaMunicipio: 'Santiago de Querétaro', zona: 'Juriquilla', direccion: 'Anillo Vial Fray Junípero Serra 2080', sinWeb: true, servicios: ['Corte', 'Barba', 'Afeitado'], fuente: 'Listados públicos (Google Maps/Fresha)', verificacion: 'pendiente' },

  // ───── Mérida, Yucatán ─────
  { nombre: 'Juan Camaney Barbería Tradicional', slug: 'juan-camaney-mid', estado: 'Yucatán', estadoSlug: 'yucatan', alcaldiaMunicipio: 'Mérida', zona: 'Monterreal', direccion: 'Plaza Urban Center, Calle 37 215, Monterreal', web: 'https://juancamaney.com', servicios: ['Corte', 'Barba', 'Afeitado clásico'], fuente: 'Sitio oficial juancamaney.com', verificacion: 'pendiente' },
  { nombre: 'Barbería Arte Suave', slug: 'arte-suave-mid', estado: 'Yucatán', estadoSlug: 'yucatan', alcaldiaMunicipio: 'Mérida', zona: 'Francisco de Montejo', direccion: 'Calle 44 x 53, Francisco de Montejo', sinWeb: true, servicios: ['Corte', 'Barba', 'Afeitado'], fuente: 'Listados públicos (Google Maps)', verificacion: 'pendiente' },
  { nombre: 'Zona Macho Barbería', slug: 'zona-macho-mid', estado: 'Yucatán', estadoSlug: 'yucatan', alcaldiaMunicipio: 'Mérida', zona: 'Benito Juárez Norte', direccion: 'Prol. Paseo Montejo 369, Benito Juárez Norte', sinWeb: true, servicios: ['Corte', 'Barba', 'Afeitado'], fuente: 'Listados públicos (Google Maps)', verificacion: 'pendiente' },
  { nombre: 'Mr. Bárbaro Barbería', slug: 'mr-barbaro-mid', estado: 'Yucatán', estadoSlug: 'yucatan', alcaldiaMunicipio: 'Mérida', zona: 'Centro', direccion: 'C. 14 100, Mérida', sinWeb: true, servicios: ['Corte', 'Barba', 'Afeitado'], fuente: 'Listados públicos (Google Maps)', verificacion: 'pendiente' },
  { nombre: 'La Galería Barber Shop', slug: 'la-galeria-mid', estado: 'Yucatán', estadoSlug: 'yucatan', alcaldiaMunicipio: 'Mérida', zona: 'Barrio de Santiago (Centro)', direccion: 'C. 80 495, entre 59 y 61, Barrio de Santiago', sinWeb: true, servicios: ['Corte', 'Barba', 'Afeitado'], fuente: 'Listados públicos (Google Maps)', verificacion: 'pendiente' }
];

/** Conteos reales (no inventados). */
export const totalBarberias = barberias.length;
export const totalConfirmadas = barberias.filter((b) => b.verificacion === 'confirmada').length;
/** Barberías sin sitio web propio → candidatas a apoyar con una página. */
export const totalSinWeb = barberias.filter((b) => b.sinWeb).length;

/** Estados con al menos una barbería real en el directorio. */
export const estadosConDatos = [...new Set(barberias.map((b) => b.estadoSlug))];
