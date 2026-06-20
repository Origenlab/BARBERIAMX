/**
 * Directorio real de barberías — Barberia.mx
 * ------------------------------------------------------------------
 * Base de datos tipada del directorio. Modelo inspirado en el
 * directorio real de MEDEDUL (`dulcerias.ts`): SOLO barberías reales,
 * con datos de fuentes públicas. REGLA DE INTEGRIDAD:
 *   - NO inventar ratings ni número de reseñas. El campo `rating`/`resenas`
 *     se llena SOLO con datos reales de Google Maps (si no, se omite).
 *   - `verificacion: 'pendiente'` = listada de fuente pública, falta
 *     confirmación directa (teléfono/visita).  'confirmada' = verificada.
 * Crecer este archivo es el trabajo editorial del directorio (ver SOP).
 */

export type Verificacion = 'pendiente' | 'confirmada';

export interface Barberia {
  nombre: string;
  slug: string;
  // Ubicación
  estado: string;          // ej. 'Ciudad de México'
  estadoSlug: string;      // ej. 'ciudad-de-mexico'
  alcaldiaMunicipio: string;
  zona: string;            // colonia/barrio
  direccion?: string;      // sólo si es real/pública
  // Contacto (sólo datos reales)
  telefono?: string;
  web?: string;
  instagram?: string;
  // Oferta
  servicios: string[];
  // Reseñas — SOLO datos reales de Google Maps (omitir si no se tienen)
  rating?: number;
  resenas?: number;
  // Trazabilidad
  fuente: string;          // de dónde salió el dato
  verificacion: Verificacion;
}

/**
 * SEED inicial — barberías reales de fuentes públicas (jun 2026).
 * Pendiente de confirmación directa. SIN ratings inventados.
 */
export const barberias: Barberia[] = [
  {
    nombre: 'Scalper Barbería (Polanco)',
    slug: 'scalper-polanco',
    estado: 'Ciudad de México',
    estadoSlug: 'ciudad-de-mexico',
    alcaldiaMunicipio: 'Miguel Hidalgo',
    zona: 'Polanco',
    direccion: 'Alejandro Dumas 84 B, Polanco',
    servicios: ['Corte', 'Barba', 'Afeitado', 'Manicure', 'Pedicure'],
    fuente: 'Listados públicos (AgendaPro/Fresha)',
    verificacion: 'pendiente'
  },
  {
    nombre: 'Scalper Barbería (Condesa)',
    slug: 'scalper-condesa',
    estado: 'Ciudad de México',
    estadoSlug: 'ciudad-de-mexico',
    alcaldiaMunicipio: 'Cuauhtémoc',
    zona: 'Condesa',
    direccion: 'Av. Mazatlán 139, Condesa',
    servicios: ['Corte', 'Barba', 'Afeitado'],
    fuente: 'Listados públicos (AgendaPro/Fresha)',
    verificacion: 'pendiente'
  },
  {
    nombre: 'La Logia Barbería (Condesa)',
    slug: 'la-logia-condesa',
    estado: 'Ciudad de México',
    estadoSlug: 'ciudad-de-mexico',
    alcaldiaMunicipio: 'Cuauhtémoc',
    zona: 'Condesa',
    servicios: ['Corte', 'Barba', 'Afeitado clásico'],
    fuente: 'Listados públicos (cadena con varias sedes en CDMX)',
    verificacion: 'pendiente'
  },
  {
    nombre: 'La Logia Barbería (Roma Norte)',
    slug: 'la-logia-roma-norte',
    estado: 'Ciudad de México',
    estadoSlug: 'ciudad-de-mexico',
    alcaldiaMunicipio: 'Cuauhtémoc',
    zona: 'Roma Norte',
    servicios: ['Corte', 'Barba', 'Afeitado clásico'],
    fuente: 'Listados públicos (cadena con varias sedes en CDMX)',
    verificacion: 'pendiente'
  },
  {
    nombre: 'Bardo’s Barber (Reforma)',
    slug: 'bardos-reforma',
    estado: 'Ciudad de México',
    estadoSlug: 'ciudad-de-mexico',
    alcaldiaMunicipio: 'Cuauhtémoc',
    zona: 'Cuauhtémoc / Reforma',
    direccion: 'Río Tíber 87, Col. Cuauhtémoc',
    telefono: '55 9238 1522',
    web: 'https://www.bardosbarber.com',
    instagram: 'https://instagram.com/bardosbarber',
    servicios: ['Corte', 'Barba', 'Afeitado', 'Facial', 'Spa'],
    fuente: 'Sitio oficial bardosbarber.com / Fresha',
    verificacion: 'pendiente'
  },
  {
    nombre: 'Bardo’s Barber (Roma Norte)',
    slug: 'bardos-roma-norte',
    estado: 'Ciudad de México',
    estadoSlug: 'ciudad-de-mexico',
    alcaldiaMunicipio: 'Cuauhtémoc',
    zona: 'Roma Norte',
    direccion: 'Av. Sonora 123, Mezzanine, Roma Norte',
    telefono: '55 5204 3755',
    web: 'https://www.bardosbarber.com',
    instagram: 'https://instagram.com/bardosbarber',
    servicios: ['Corte', 'Barba', 'Afeitado', 'Facial', 'Spa'],
    fuente: 'Sitio oficial bardosbarber.com / Fresha',
    verificacion: 'pendiente'
  },
  {
    nombre: 'Bardo’s Barber (Condesa)',
    slug: 'bardos-condesa',
    estado: 'Ciudad de México',
    estadoSlug: 'ciudad-de-mexico',
    alcaldiaMunicipio: 'Cuauhtémoc',
    zona: 'Condesa',
    direccion: 'Av. Nuevo León 144, Condesa',
    telefono: '55 9559 5469',
    web: 'https://www.bardosbarber.com',
    instagram: 'https://instagram.com/bardosbarber',
    servicios: ['Corte', 'Barba', 'Afeitado', 'Facial', 'Spa'],
    fuente: 'Sitio oficial bardosbarber.com',
    verificacion: 'pendiente'
  },
  {
    nombre: 'Bardo’s Barber (Polanco)',
    slug: 'bardos-polanco',
    estado: 'Ciudad de México',
    estadoSlug: 'ciudad-de-mexico',
    alcaldiaMunicipio: 'Miguel Hidalgo',
    zona: 'Polanco',
    direccion: 'Homero 1425, local A-2, Polanco',
    telefono: '55 8989 7207',
    web: 'https://www.bardosbarber.com',
    instagram: 'https://instagram.com/bardosbarber',
    servicios: ['Corte', 'Barba', 'Afeitado', 'Facial', 'Spa'],
    fuente: 'Sitio oficial bardosbarber.com',
    verificacion: 'pendiente'
  },
  {
    nombre: 'Bardo’s Barber (Del Valle)',
    slug: 'bardos-del-valle',
    estado: 'Ciudad de México',
    estadoSlug: 'ciudad-de-mexico',
    alcaldiaMunicipio: 'Benito Juárez',
    zona: 'Del Valle',
    direccion: 'Eugenia 1033, Col. del Valle Centro',
    telefono: '55 9804 4589',
    web: 'https://www.bardosbarber.com',
    instagram: 'https://instagram.com/bardosbarber',
    servicios: ['Corte', 'Barba', 'Afeitado', 'Facial', 'Spa'],
    fuente: 'Sitio oficial bardosbarber.com',
    verificacion: 'pendiente'
  },
  {
    nombre: 'Mr. Venez Barbería & Spa (Del Valle)',
    slug: 'mr-venez-del-valle',
    estado: 'Ciudad de México',
    estadoSlug: 'ciudad-de-mexico',
    alcaldiaMunicipio: 'Benito Juárez',
    zona: 'Del Valle',
    direccion: 'Gabriel Mancera 405-A, Del Valle Centro',
    servicios: ['Corte', 'Barba', 'Afeitado', 'Spa'],
    fuente: 'Listados públicos (Google Maps)',
    verificacion: 'pendiente'
  },
  {
    nombre: 'La Única Barbería (Narvarte)',
    slug: 'la-unica-narvarte',
    estado: 'Ciudad de México',
    estadoSlug: 'ciudad-de-mexico',
    alcaldiaMunicipio: 'Benito Juárez',
    zona: 'Narvarte',
    servicios: ['Corte', 'Barba', 'Afeitado'],
    fuente: 'Listados públicos (cadena con varias sucursales en CDMX) — dirección por confirmar',
    verificacion: 'pendiente'
  }
];

/** Conteo real (no inventado). */
export const totalBarberias = barberias.length;
export const totalConfirmadas = barberias.filter(b => b.verificacion === 'confirmada').length;

/** Estados con al menos una barbería real en el directorio. */
export const estadosConDatos = [...new Set(barberias.map(b => b.estadoSlug))];
