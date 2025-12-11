markdown# SISTEMA DE PRODUCCIÓN DE CONTENIDO

## Manual Técnico y Editorial para Barberia.mx

---

**Clasificación:** Documento Maestro de Producción
**Versión:** 2.3 Professional
**Fecha de Creación:** Noviembre 2024
**Última Actualización:** Diciembre 2025
**Nivel de Cumplimiento:** Obligatorio 100%
**Responsable:** Equipo de Desarrollo Web

---

## ÍNDICE GENERAL

1. [Propósito y Alcance del Sistema](#1-propósito-y-alcance-del-sistema)
2. [Arquitectura del Proyecto](#2-arquitectura-del-proyecto)
3. [Sistema de Nomenclatura](#3-sistema-de-nomenclatura)
4. [Protocolo de Investigación y Recopilación de Datos](#4-protocolo-de-investigación-y-recopilación-de-datos)
5. [Sistema de Componentes: Card de Listado](#5-sistema-de-componentes-card-de-listado)
6. [Sistema de Componentes: Página de Detalle](#6-sistema-de-componentes-página-de-detalle)
7. [Taxonomía y Sistema de Clasificación](#7-taxonomía-y-sistema-de-clasificación)
8. [Cobertura Geográfica y Estructura Regional](#8-cobertura-geográfica-y-estructura-regional)
9. [Protocolo de Entrada de Datos](#9-protocolo-de-entrada-de-datos)
10. [Sistema de Validación y Control de Calidad](#10-sistema-de-validación-y-control-de-calidad)
11. [Gestión de Contadores y Métricas](#11-gestión-de-contadores-y-métricas)
12. [Optimización SEO On-Page](#12-optimización-seo-on-page)
13. [Ejemplo Completo de Implementación](#13-ejemplo-completo-de-implementación)
14. [Errores Comunes y Soluciones](#14-errores-comunes-y-soluciones)
15. [Anexos Técnicos](#15-anexos-técnicos)

---

## 1. PROPÓSITO Y ALCANCE DEL SISTEMA

### 1.1 Declaración de Propósito

Este documento constituye el **sistema oficial y obligatorio de producción de contenido** para Barberia.mx. Define los estándares técnicos, editoriales y de calidad que garantizan:

| Objetivo                     | Descripción                                                              |
| ---------------------------- | ------------------------------------------------------------------------ |
| **Homogeneidad Estructural** | Arquitectura HTML idéntica en todas las páginas del directorio           |
| **Consistencia Visual**      | Sistema de diseño unificado basado en componentes reutilizables          |
| **Excelencia SEO**           | Optimización on-page para posicionamiento en búsquedas locales           |
| **Escalabilidad Geográfica** | Arquitectura preparada para expansión nacional                           |
| **Integridad de Datos**      | Información verificada exclusivamente de fuentes oficiales (Google Maps) |
| **Eficiencia Operativa**     | Flujo de trabajo estandarizado para producción masiva de contenido       |

### 1.2 Página de Referencia Canónica

**Archivo de referencia obligatorio:**

```
/ciudad-de-mexico/barberia-roma-norte-cuauhtemoc.html
```

Esta página representa el **estándar de oro** que toda página nueva debe replicar en:

- ✅ Estructura HTML semántica completa
- ✅ Metadatos SEO correctamente implementados
- ✅ Sistema de breadcrumbs funcional
- ✅ Layout responsivo optimizado
- ✅ Integración de componentes interactivos
- ✅ Estilos CSS embebidos correctos
- ✅ Scripts de funcionalidad (horarios, favoritos)

**Principio Fundamental:** Cada página nueva es una **instancia del patrón establecido**, no una interpretación libre del diseño.

### 1.3 Restricciones Críticas del Sistema

| Restricción                       | Razón                             | Consecuencia de Violación |
| --------------------------------- | --------------------------------- | ------------------------- |
| **NO incluir URLs de sitios web** | Política editorial del directorio | Contenido rechazado       |
| **NO modificar CSS global**       | Mantener consistencia visual      | Rollback obligatorio      |
| **NO modificar JS global**        | Evitar bugs en producción         | Rollback obligatorio      |
| **Datos SOLO de Google Maps**     | Garantizar veracidad              | Contenido eliminado       |
| **Formato de archivo estricto**   | SEO y mantenibilidad              | Renombrado obligatorio    |

### 1.4 Flujo de Trabajo de Producción

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    FLUJO DE PRODUCCIÓN DE BARBERÍA                          │
└─────────────────────────────────────────────────────────────────────────────┘

    ┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
    │ INVESTIGACIÓN│     │  DESARROLLO  │     │  VALIDACIÓN  │     │ PUBLICACIÓN  │
    │   DE DATOS   │────▶│   TÉCNICO    │────▶│  DE CALIDAD  │────▶│    FINAL     │
    └──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
           │                    │                    │                    │
           ▼                    ▼                    ▼                    ▼
    ┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
    │ • Búsqueda   │     │ • Crear Card │     │ • Checklist  │     │ • Actualizar │
    │   Google Maps│     │   en listado │     │   completo   │     │   contadores │
    │ • Verificar  │     │ • Crear pág. │     │ • Test links │     │ • Verificar  │
    │   datos      │     │   de detalle │     │ • Test resp. │     │   indexación │
    │ • Estructurar│     │ • Completar  │     │ • SEO audit  │     │ • Monitorear │
    │   YAML       │     │   metadatos  │     │              │     │   métricas   │
    └──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

---

## 2. ARQUITECTURA DEL PROYECTO

### 2.1 Estructura de Directorios

```
BARBERIA.MX/
│
├── index.html                              # Página principal (Home)
├── zona.html                               # Hub de estados/regiones
│
├── css/
│   └── style.css                           # ⚠️ NO MODIFICAR - Estilos globales
│
├── js/
│   ├── app.js                              # ⚠️ NO MODIFICAR - JavaScript principal
│   └── components.js                       # ⚠️ NO MODIFICAR - Carga de componentes
│
├── components/
│   ├── header.html                         # Header reutilizable (nav principal)
│   └── footer.html                         # Footer reutilizable
│
├── [ESTADO]/                               # Carpeta por estado (kebab-case)
│   ├── index.html                          # Listado de barberías del estado
│   └── barberia-[colonia]-[alcaldia].html  # Páginas de detalle individuales
│
├── img/
│   ├── og/                                 # Imágenes Open Graph por estado
│   ├── barberias/                          # (Futuro) Fotos de establecimientos
│   └── icons/                              # Iconos del sistema
│
└── .audit/
    └── DOCUMENTO-BARBERIAS.md              # Este documento
```

### 2.2 Jerarquía de Navegación

```
                         ┌─────────────────┐
                         │   index.html    │
                         │     (Home)      │
                         └────────┬────────┘
                                  │
              ┌───────────────────┼───────────────────┐
              │                   │                   │
        ┌─────▼─────┐       ┌─────▼─────┐       ┌─────▼─────┐
        │ zona.html │       │  (Otros)  │       │  (Otros)  │
        │  Estados  │       │           │       │           │
        └─────┬─────┘       └───────────┘       └───────────┘
              │
    ┌─────────┴─────────────────────────────────┐
    │                                           │
┌───▼────────────┐  ┌───────────────┐  ┌───────────────┐
│ciudad-de-mexico│  │    jalisco    │  │  nuevo-leon   │
│   /index.html  │  │  /index.html  │  │  /index.html  │
│  (245 barb.)   │  │   (Futuro)    │  │   (Futuro)    │
└───────┬────────┘  └───────────────┘  └───────────────┘
        │
    ┌───┴────────────────────────────────┐
    │                                    │
┌───▼──────────────────┐  ┌──────────────▼─────────────┐
│barberia-roma-norte-  │  │barberia-polanco-miguel-    │
│cuauhtemoc.html       │  │hidalgo.html                │
│(Página de detalle)   │  │(Página de detalle)         │
└──────────────────────┘  └────────────────────────────┘
```

### 2.3 Reglas de Navegación

| Regla                      | Descripción                                                   |
| -------------------------- | ------------------------------------------------------------- |
| **Máximo 3 clics**         | Desde Home a cualquier barbería en máximo 3 clics             |
| **Breadcrumb obligatorio** | Todas las páginas de detalle deben tener breadcrumb           |
| **Back links**             | Cada nivel debe permitir regresar al anterior                 |
| **Consistencia de rutas**  | URLs absolutas desde raíz (/) para todos los enlaces internos |

---

## 3. SISTEMA DE NOMENCLATURA

### 3.1 Nomenclatura de Carpetas por Estado

**Formato:** `[nombre-estado-en-minusculas]`

| Regla                     | Correcto           | Incorrecto         |
| ------------------------- | ------------------ | ------------------ |
| Minúsculas                | `ciudad-de-mexico` | `Ciudad-de-Mexico` |
| Guiones para espacios     | `nuevo-leon`       | `nuevo leon`       |
| Sin acentos               | `queretaro`        | `querétaro`        |
| Sin caracteres especiales | `san-luis-potosi`  | `san_luis_potosí`  |

**Ejemplos de carpetas por estado:**

```
/ciudad-de-mexico/      # CDMX
/estado-de-mexico/      # Estado de México
/nuevo-leon/            # Nuevo León
/jalisco/               # Jalisco
/quintana-roo/          # Quintana Roo
/baja-california/       # Baja California
/baja-california-sur/   # Baja California Sur
/san-luis-potosi/       # San Luis Potosí
/aguascalientes/        # Aguascalientes
```

### 3.2 Nomenclatura de Archivos de Detalle

**Formato estricto:** `barberia-[colonia]-[alcaldia-municipio].html`

| Elemento               | Descripción                        | Ejemplo      |
| ---------------------- | ---------------------------------- | ------------ |
| `barberia-`            | Prefijo obligatorio                | `barberia-`  |
| `[colonia]`            | Nombre de colonia en kebab-case    | `roma-norte` |
| `-`                    | Separador                          | `-`          |
| `[alcaldia-municipio]` | Alcaldía o municipio en kebab-case | `cuauhtemoc` |
| `.html`                | Extensión                          | `.html`      |

**Ejemplos correctos:**

```html
barberia-roma-norte-cuauhtemoc.html barberia-polanco-miguel-hidalgo.html
barberia-condesa-cuauhtemoc.html barberia-del-valle-benito-juarez.html
barberia-santa-fe-alvaro-obregon.html barberia-coyoacan-centro-coyoacan.html
barberia-lindavista-gustavo-a-madero.html barberia-providencia-guadalajara.html
barberia-andares-zapopan.html barberia-chapultepec-guadalajara.html
barberia-centro-monterrey.html
barberia-valle-oriente-san-pedro-garza-garcia.html
barberia-cumbres-monterrey.html
```

**Ejemplos incorrectos:**

```html
thebarbersspa-roma-norte.html barberia_roma_norte_cuauhtemoc.html
Barberia-Roma-Norte-Cuauhtemoc.html barberia-roma-norte.html
roma-norte-cuauhtemoc.html
```

### 3.3 Justificación de la Nomenclatura

**¿Por qué NO usar el nombre del negocio?**

| Razón                         | Explicación                                                       |
| ----------------------------- | ----------------------------------------------------------------- |
| **SEO optimizado**            | "barberia polanco" tiene más búsquedas que "barber kings polanco" |
| **Independencia del negocio** | Si el negocio cierra, la URL sigue siendo válida para otro        |
| **Consistencia**              | Todas las URLs siguen el mismo patrón predecible                  |
| **Escalabilidad**             | Facilita automatización futura                                    |
| **Búsquedas locales**         | Coincide con cómo buscan los usuarios: "barbería + zona"          |

---

## 4. PROTOCOLO DE INVESTIGACIÓN Y RECOPILACIÓN DE DATOS

### 4.1 Fuente Única de Datos: Google Maps

**REGLA CRÍTICA:** Todos los datos deben obtenerse **exclusivamente** de Google Maps.

**Proceso de búsqueda:**

1. Abrir Google Maps (maps.google.com)
2. Buscar: "barbería [colonia] [ciudad]" o "barber shop [colonia]"
3. Seleccionar establecimiento con buena calificación (≥4.0)
4. Verificar que tenga información completa

### 4.2 Datos Obligatorios a Recopilar

```yaml
# ══════════════════════════════════════════════════════════════════
# FICHA DE DATOS OBLIGATORIOS
# ══════════════════════════════════════════════════════════════════

informacion_basica:
  nombre_negocio: "" # Nombre exacto como aparece en Google Maps
  direccion_calle: "" # Calle y número
  colonia: "" # Colonia/barrio
  alcaldia_municipio: "" # Alcaldía (CDMX) o Municipio (otros estados)
  codigo_postal: "" # CP de 5 dígitos
  estado: "" # Nombre completo del estado

contacto:
  telefono: "" # Solo números, 10 dígitos
  # NOTA: NO incluir sitio web

metricas_google:
  rating: 0.0 # Calificación de 1.0 a 5.0
  numero_resenas: 0 # Cantidad total de reseñas

horarios: # Formato 24h: "HH:MM - HH:MM" o "Cerrado"
  lunes: ""
  martes: ""
  miercoles: ""
  jueves: ""
  viernes: ""
  sabado: ""
  domingo: ""
```

### 4.3 Datos Opcionales (Si están disponibles)

```yaml
# ══════════════════════════════════════════════════════════════════
# FICHA DE DATOS OPCIONALES
# ══════════════════════════════════════════════════════════════════

contacto_adicional:
  whatsapp: "" # Número de WhatsApp si es diferente

servicios: # Lista de servicios con precios
  - nombre: ""
    precio: 0

resenas_destacadas: # 3-5 reseñas reales de Google Maps
  - autor: ""
    fecha_relativa: "" # "Hace 2 semanas", "Hace 1 mes"
    rating: 5
    texto: ""
    servicio_mencionado: "" # Si menciona un servicio específico

caracteristicas: # Amenidades/características
  - "Estacionamiento"
  - "WiFi gratis"
  - "Acepta tarjetas"
  - "Citas en línea"
```

### 4.4 Criterios de Selección de Barberías

| Criterio                 | Mínimo Requerido                | Ideal                 |
| ------------------------ | ------------------------------- | --------------------- |
| **Rating**               | ≥ 4.0 estrellas                 | ≥ 4.5 estrellas       |
| **Número de reseñas**    | ≥ 20 reseñas                    | ≥ 50 reseñas          |
| **Información completa** | Dirección + Teléfono + Horarios | Todo + Fotos          |
| **Actividad reciente**   | Reseñas en últimos 3 meses      | Reseñas en último mes |
| **Horarios publicados**  | Al menos 5 días                 | 7 días completos      |

### 4.5 Información que NO se debe incluir

| Prohibido                  | Razón                                   |
| -------------------------- | --------------------------------------- |
| **URL del sitio web**      | Política editorial del directorio       |
| **Redes sociales**         | Pueden cambiar o eliminarse             |
| **Precios no verificados** | Solo precios confirmados en Google Maps |
| **Información inventada**  | Todo debe ser verificable               |
| **Fotos descargadas**      | Derechos de autor                       |

---

## 5. SISTEMA DE COMPONENTES: CARD DE LISTADO

### 5.1 Ubicación del Código

**Archivo:** `/[estado]/index.html`

**Sección a localizar:**

```html

```

### 5.2 Estructura Completa de la Card

```html
Premium Nuevo Verificado [Nombre del Negocio] ★ [4.9] ([156]) [Colonia],
[Alcaldía] [Tag 1] [Tag 2] [Tag 3] Desde $[Precio] Ver más →
```

### 5.3 Sistema de Badges

| Clase CSS                | Uso                    | Criterio de Asignación              | Color       |
| ------------------------ | ---------------------- | ----------------------------------- | ----------- |
| `barberia-badge-premium` | Barberías de alta gama | Rating ≥4.8 + Precio promedio ≥$400 | Dorado      |
| `barberia-badge-new`     | Recién agregadas       | Agregadas en últimos 30 días        | Azul accent |
| `barberia-badge`         | Verificadas            | Datos 100% confirmados              | Negro       |

**Reglas de badges:**

- Máximo **1 badge** por card
- Prioridad: Premium > Nuevo > Verificado
- Si no cumple ningún criterio, no mostrar badge

### 5.4 Especificaciones de Contenido

| Elemento      | Longitud           | Formato             | Ejemplo                   |
| ------------- | ------------------ | ------------------- | ------------------------- |
| **Nombre**    | Máx. 35 caracteres | Título capitalizado | "The Barber's Spa"        |
| **Rating**    | 1 decimal          | X.X                 | "4.9"                     |
| **Reseñas**   | Número entero      | (XXX)               | "(156)"                   |
| **Ubicación** | Máx. 40 caracteres | Colonia, Alcaldía   | "Roma Norte, Cuauhtémoc"  |
| **Tags**      | Máx. 3             | Palabras cortas     | "Premium", "Spa", "Barba" |
| **Precio**    | Número entero      | $XXX                | "$250"                    |

---

## 6. SISTEMA DE COMPONENTES: PÁGINA DE DETALLE

### 6.1 Estructura General del Documento

```html

```

### 6.2 Bloque HEAD Completo

```html
[Nombre Negocio] - [Colonia] | Barberia.mx /* COPIAR ESTILOS COMPLETOS DE:
/ciudad-de-mexico/barberia-roma-norte-cuauhtemoc.html Incluye secciones: -
Breadcrumb Bar - Detail Page Layout - Gallery Section - Detail Content - Sidebar
Contact Card - Reviews Section - Responsive Breakpoints */
```

### 6.3 Breadcrumb Bar

```html
═══════════════════════════════════════════════════════════════ --> Inicio /
Estados / [Nombre del Estado] / [Nombre del Negocio]
```

### 6.4 Galería de Imágenes

```html
Ver todas las fotos
```

### 6.5 Contenido Principal (Layout de 2 Columnas)

```html
Premium Verificado [Nombre del Negocio] [Colonia], [Alcaldía], [Estado] ★ ★ ★ ★
★ [4.9] [156] reseñas Acerca de [Párrafo 1: Descripción general del negocio,
ambiente, estilo] [Párrafo 2: Especialidades, servicios destacados, experiencia]
[Párrafo 3: Diferenciadores, por qué elegirlos] Servicios y Precios [Nombre del
Servicio] [Duración estimada] $[Precio] Horario Abierto ahora Cerrado ahora -->
Lunes [HH:MM] - [HH:MM] Martes [HH:MM] - [HH:MM] Miércoles [HH:MM] - [HH:MM]
Jueves [HH:MM] - [HH:MM] Viernes [HH:MM] - [HH:MM] Sábado [HH:MM] - [HH:MM]
Domingo [HH:MM] - [HH:MM] Cerrado --> Reseñas de Clientes [4.9] ★★★★★ [156]
reseñas 5 [132] 4 [16] 3 [5] 2 [2] 1 [1] [XX] [Nombre del Autor] [Hace X tiempo]
★★★★★ [Texto de la reseña] [Servicio adquirido] Ver todas las reseñas ([N])
Servicios desde $[Precio Mínimo] Contactar por WhatsApp Llamar: [XX XXXX XXXX]
Agendar cita (Próximamente) [Calle y Número] [Colonia] [Alcaldía/Municipio] C.P.
[XXXXX], [Estado] [XX XXXX XXXX] Mapa próximamente Compartir Guardar Enviar
```

### 6.6 Footer y Scripts

```html
document.addEventListener('DOMContentLoaded', function() { // Resaltar día
actual const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves',
'Viernes', 'Sábado']; const today = days[new Date().getDay()];
document.querySelectorAll('.hours-day').forEach(el => { if (el.textContent ===
today) { el.closest('.hours-item').classList.add('today'); } }); // Verificar si
está abierto (lógica básica) const now = new Date(); const currentHour =
now.getHours(); const currentMinutes = now.getMinutes(); const currentTime =
currentHour * 60 + currentMinutes; // Obtener horario del día actual const
todayItem = document.querySelector('.hours-item.today .hours-time'); if
(todayItem && !todayItem.classList.contains('hours-closed')) { const timeText =
todayItem.textContent; const [open, close] = timeText.split(' - ').map(t => {
const [h, m] = t.split(':').map(Number); return h * 60 + m; }); const statusEl =
document.querySelector('.hours-status'); if (currentTime >= open && currentTime
<= close) { statusEl.classList.remove('closed'); statusEl.classList.add('open');
statusEl.querySelector('span:last-child').textContent = 'Abierto ahora'; } else
{ statusEl.classList.remove('open'); statusEl.classList.add('closed');
statusEl.querySelector('span:last-child').textContent = 'Cerrado ahora'; } } });
```

---

## 7. TAXONOMÍA Y SISTEMA DE CLASIFICACIÓN

### 7.1 Sistema de Tags

Los tags clasifican las barberías para facilitar filtrado y búsqueda. Máximo **3 tags** por barbería.

#### Tags por Categoría de Servicio

| Categoría                 | Tags Disponibles                                       | Uso                            |
| ------------------------- | ------------------------------------------------------ | ------------------------------ |
| **Estilo Premium**        | Premium, Lujo, Spa, VIP, Ejecutivo                     | Barberías de alta gama ($400+) |
| **Estilo Tradicional**    | Clásico, Tradicional, Vintage, Navaja, Afeitado        | Estilo barbería clásica        |
| **Estilo Moderno**        | Moderno, Urbano, Fade, Degradado, Diseño, Color, Tinte | Estilos contemporáneos         |
| **Servicios Adicionales** | Barba, Facial, Masaje, Manicura, Spa                   | Servicios complementarios      |
| **Conveniencia**          | Citas online, Sin cita, Express, Domicilio             | Modalidad de atención          |
| **Público Objetivo**      | Familiar, Niños, Caballeros                            | Tipo de clientela              |
| **Precio**                | Económico, Accesible                                   | Rango de precios bajos         |

#### Matriz de Asignación de Tags

| Tipo de Barbería              | Tag 1       | Tag 2     | Tag 3        |
| ----------------------------- | ----------- | --------- | ------------ |
| Premium con spa               | Premium     | Spa       | Facial       |
| Tradicional mexicana          | Tradicional | Navaja    | Barba        |
| Moderna urbana                | Fade        | Moderno   | Diseño       |
| Familiar económica            | Familiar    | Económico | Niños        |
| Ejecutiva en zona corporativa | Ejecutivo   | Premium   | Citas online |

### 7.2 Sistema de Badges

| Badge          | Clase CSS                | Criterios de Asignación                                         |
| -------------- | ------------------------ | --------------------------------------------------------------- |
| **Premium**    | `barberia-badge-premium` | Rating ≥4.8 AND Precio promedio ≥$400 AND Servicios de spa/lujo |
| **Nuevo**      | `barberia-badge-new`     | Agregado al directorio en últimos 30 días                       |
| **Verificado** | `barberia-badge`         | Datos confirmados al 100% en Google Maps                        |

### 7.3 Categorización de Precios

| Categoría     | Rango de Precios | Tags Asociados       |
| ------------- | ---------------- | -------------------- |
| **Económico** | $80 - $150       | Económico, Accesible |
| **Estándar**  | $150 - $300      | (Sin tag de precio)  |
| **Premium**   | $300 - $500      | Premium              |
| **Lujo**      | $500+            | Lujo, VIP, Spa       |

---

## 8. COBERTURA GEOGRÁFICA Y ESTRUCTURA REGIONAL

### 8.1 Ciudad de México (CDMX)

#### Alcaldías y Colonias Prioritarias

| Alcaldía                | Colonias Principales                                                                                  | Prioridad |
| ----------------------- | ----------------------------------------------------------------------------------------------------- | --------- |
| **Cuauhtémoc**          | Roma Norte, Roma Sur, Condesa, Hipódromo, Juárez, Centro Histórico, San Rafael, Santa María la Ribera | Alta      |
| **Benito Juárez**       | Del Valle, Narvarte, Portales, Mixcoac, Insurgentes                                                   | Alta      |
| **Miguel Hidalgo**      | Polanco, Lomas de Chapultepec, Anzures, Tacubaya, Escandón                                            | Alta      |
| **Coyoacán**            | Coyoacán Centro, Del Carmen, Churubusco, Villa Coyoacán                                               | Media     |
| **Álvaro Obregón**      | Santa Fe, San Ángel, Guadalupe Inn, Florida                                                           | Media     |
| **Tlalpan**             | Coapa, Tlalpan Centro, Pedregal                                                                       | Media     |
| **Azcapotzalco**        | Clavería, Santa Cruz Acayucan                                                                         | Baja      |
| **Gustavo A. Madero**   | Lindavista, Tepeyac, Martín Carrera                                                                   | Baja      |
| **Iztapalapa**          | Centro Iztapalapa                                                                                     | Baja      |
| **Venustiano Carranza** | Centro, Moctezuma                                                                                     | Baja      |

#### Ejemplos de Nomenclatura CDMX

```
/ciudad-de-mexico/barberia-roma-norte-cuauhtemoc.html
/ciudad-de-mexico/barberia-condesa-cuauhtemoc.html
/ciudad-de-mexico/barberia-juarez-cuauhtemoc.html
/ciudad-de-mexico/barberia-polanco-miguel-hidalgo.html
/ciudad-de-mexico/barberia-del-valle-centro-benito-juarez.html
/ciudad-de-mexico/barberia-coyoacan-centro-coyoacan.html
/ciudad-de-mexico/barberia-santa-fe-alvaro-obregon.html
```

### 8.2 Jalisco (Expansión Futura)

| Municipio       | Zonas Principales                                      | Prioridad |
| --------------- | ------------------------------------------------------ | --------- |
| **Guadalajara** | Centro, Providencia, Chapultepec, Lafayette, Americana | Alta      |
| **Zapopan**     | Andares, Puerta de Hierro, Ciudad Granja, Chapalita    | Alta      |
| **Tlaquepaque** | Centro Tlaquepaque                                     | Media     |

```
/jalisco/barberia-providencia-guadalajara.html
/jalisco/barberia-andares-zapopan.html
/jalisco/barberia-chapultepec-guadalajara.html
```

### 8.3 Nuevo León (Expansión Futura)

| Municipio                  | Zonas Principales                   | Prioridad |
| -------------------------- | ----------------------------------- | --------- |
| **Monterrey**              | Centro, Cumbres, Mitras             | Alta      |
| **San Pedro Garza García** | Valle Oriente, Del Valle, Chipinque | Alta      |
| **San Nicolás**            | Centro San Nicolás                  | Media     |

```
/nuevo-leon/barberia-centro-monterrey.html
/nuevo-leon/barberia-valle-oriente-san-pedro-garza-garcia.html
/nuevo-leon/barberia-cumbres-monterrey.html
```

### 8.4 Otros Estados (Expansión Futura)

| Estado           | Ciudades Principales            | Carpeta              |
| ---------------- | ------------------------------- | -------------------- |
| Estado de México | Toluca, Naucalpan, Tlalnepantla | `/estado-de-mexico/` |
| Querétaro        | Querétaro Centro, Juriquilla    | `/queretaro/`        |
| Puebla           | Puebla Centro, Angelópolis      | `/puebla/`           |
| Quintana Roo     | Cancún, Playa del Carmen        | `/quintana-roo/`     |
| Yucatán          | Mérida Centro, Altabrisa        | `/yucatan/`          |

---

## 9. PROTOCOLO DE ENTRADA DE DATOS

### 9.1 Formato YAML Estructurado

Para solicitar la creación de una nueva barbería, proporcionar la información en el siguiente formato:

```yaml
# ══════════════════════════════════════════════════════════════════
# SOLICITUD DE NUEVA BARBERÍA - Barberia.mx
# ══════════════════════════════════════════════════════════════════

metadata:
  fecha_solicitud: "YYYY-MM-DD"
  solicitado_por: "[Nombre]"
  estado_destino: "[nombre-estado]"
  prioridad: "alta" | "media" | "baja"

informacion_basica:
  nombre_negocio: "[Nombre exacto de Google Maps]"
  direccion:
    calle_numero: "[Calle y número]"
    colonia: "[Colonia]"
    alcaldia_municipio: "[Alcaldía o Municipio]"
    codigo_postal: "[XXXXX]"
    estado: "[Estado completo]"

contacto:
  telefono: "[XXXXXXXXXX]"           # Solo 10 dígitos
  whatsapp: "[XXXXXXXXXX]"           # Si es diferente al teléfono
  # NOTA: NO incluir sitio web

metricas:
  rating: 0.0                        # De Google Maps (1.0 - 5.0)
  numero_resenas: 0                  # Total de reseñas

horarios:
  lunes: "HH:MM - HH:MM"            # O "Cerrado"
  martes: "HH:MM - HH:MM"
  miercoles: "HH:MM - HH:MM"
  jueves: "HH:MM - HH:MM"
  viernes: "HH:MM - HH:MM"
  sabado: "HH:MM - HH:MM"
  domingo: "HH:MM - HH:MM"

servicios:
  - nombre: "[Nombre del servicio]"
    precio: 0
    duracion: "[XX min]"            # Opcional
  # Agregar más servicios...

clasificacion:
  badge: "Premium" | "Nuevo" | "Verificado" | ""
  tags:
    - "[Tag 1]"
    - "[Tag 2]"
    - "[Tag 3]"
  precio_desde: 0

descripcion:
  parrafo_1: "[Descripción general - ambiente, estilo, historia]"
  parrafo_2: "[Servicios destacados, especialidades]"
  parrafo_3: "[Diferenciadores, por qué elegirlos]"

resenas:                             # 3-5 reseñas de Google Maps
  - autor: "[Nombre]"
    iniciales: "[XX]"
    fecha: "[Hace X tiempo]"
    rating: 5
    texto: "[Texto de la reseña]"
    servicio: "[Servicio mencionado]"
  # Agregar más reseñas...
```

### 9.2 Ejemplo Completo de Entrada de Datos

```yaml
# ══════════════════════════════════════════════════════════════════
# SOLICITUD DE NUEVA BARBERÍA - Barberia.mx
# ══════════════════════════════════════════════════════════════════

metadata:
  fecha_solicitud: "2025-11-26"
  solicitado_por: "Equipo Editorial"
  estado_destino: "ciudad-de-mexico"
  prioridad: "alta"

informacion_basica:
  nombre_negocio: "Barber Kings Polanco"
  direccion:
    calle_numero: "Av. Presidente Masaryk 456, Local 12"
    colonia: "Polanco V Sección"
    alcaldia_municipio: "Miguel Hidalgo"
    codigo_postal: "11560"
    estado: "Ciudad de México"

contacto:
  telefono: "5555551234"
  whatsapp: "5555551234"

metricas:
  rating: 4.8
  numero_resenas: 89

horarios:
  lunes: "09:00 - 21:00"
  martes: "09:00 - 21:00"
  miercoles: "09:00 - 21:00"
  jueves: "09:00 - 21:00"
  viernes: "09:00 - 21:00"
  sabado: "09:00 - 20:00"
  domingo: "10:00 - 18:00"

servicios:
  - nombre: "Corte ejecutivo"
    precio: 300
    duracion: "30 min"
  - nombre: "Corte + Barba"
    precio: 450
    duracion: "45 min"
  - nombre: "Afeitado clásico con navaja"
    precio: 250
    duracion: "25 min"
  - nombre: "Tratamiento facial"
    precio: 400
    duracion: "40 min"
  - nombre: "Paquete Premium VIP"
    precio: 700
    duracion: "90 min"
  - nombre: "Corte niños (hasta 12 años)"
    precio: 200
    duracion: "25 min"

clasificacion:
  badge: "Premium"
  tags:
    - "Ejecutivo"
    - "Premium"
    - "Lujo"
  precio_desde: 200

descripcion:
  parrafo_1: "Barber Kings Polanco es una barbería de lujo ubicada en el corazón de una de las zonas más exclusivas de la Ciudad de México. Con un ambiente sofisticado que combina elementos clásicos de las barberías tradicionales con un diseño contemporáneo, ofrece una experiencia única para el caballero moderno."
  parrafo_2: "Especializados en cortes ejecutivos y afeitados con navaja, sus barberos cuentan con más de 10 años de experiencia. Destacan por sus tratamientos faciales premium y su Paquete VIP que incluye corte, barba, masaje capilar y tratamiento facial."
  parrafo_3: "Lo que distingue a Barber Kings es su atención personalizada y el uso de productos de primera calidad. Cada visita incluye bebidas de cortesía y un ambiente relajado donde los clientes pueden desconectarse del ritmo acelerado de la ciudad."

resenas:
  - autor: "Roberto Mendoza"
    iniciales: "RM"
    fecha: "Hace 2 semanas"
    rating: 5
    texto: "La mejor barbería de Polanco sin duda. El corte ejecutivo quedó perfecto y el ambiente es muy agradable. Los barberos son muy profesionales."
    servicio: "Corte ejecutivo"
  - autor: "Carlos García"
    iniciales: "CG"
    fecha: "Hace 1 mes"
    rating: 5
    texto: "El Paquete Premium vale cada peso. Salí como nuevo después de casi 2 horas de tratamiento completo. El masaje capilar es increíble."
    servicio: "Paquete Premium VIP"
  - autor: "Miguel Ángel Torres"
    iniciales: "MT"
    fecha: "Hace 3 semanas"
    rating: 4
    texto: "Muy buen servicio, aunque un poco caro. La ubicación es excelente y el personal muy amable. El único detalle es que a veces hay que esperar."
    servicio: "Corte + Barba"
  - autor: "Fernando López"
    iniciales: "FL"
    fecha: "Hace 2 meses"
    rating: 5
    texto: "Llevo viniendo 6 meses y siempre la misma calidad. El afeitado con navaja es de lo mejor que he probado en CDMX."
    servicio: "Afeitado clásico con navaja"
```

---

## 10. SISTEMA DE VALIDACIÓN Y CONTROL DE CALIDAD

### 10.1 Checklist Pre-Publicación Completo

#### 10.1.1 Validación de Datos

```
☐ Datos obtenidos de Google Maps
  ☐ Nombre del negocio verificado
  ☐ Dirección completa y correcta
  ☐ Teléfono funcional (10 dígitos)
  ☐ Horarios actualizados
  ☐ Rating y número de reseñas actuales
  ☐ NO se incluyó URL del sitio web
```

#### 10.1.2 Validación de Nomenclatura

```
☐ Nombre de archivo correcto
  ☐ Formato: barberia-[colonia]-[alcaldia].html
  ☐ Todo en minúsculas
  ☐ Sin acentos ni caracteres especiales
  ☐ Guiones como separadores

☐ Ubicación correcta
  ☐ Archivo en carpeta del estado correspondiente
  ☐ Carpeta del estado en formato kebab-case
```

#### 10.1.3 Validación de Card (Listado)

```
☐ Estructura HTML correcta
  ☐ Link href apunta al archivo correcto
  ☐ Nombre del negocio en <h3>
  ☐ Rating con 1 decimal
  ☐ Número de reseñas entre paréntesis
  ☐ Ubicación: Colonia, Alcaldía
  ☐ Máximo 3 tags
  ☐ Precio desde con formato correcto

☐ Badge (si aplica)
  ☐ Solo 1 badge por card
  ☐ Clase CSS correcta
```

#### 10.1.4 Validación de Página de Detalle

```
☐ Meta tags
  ☐ Title: "[Nombre] - [Colonia] | Barberia.mx"
  ☐ Meta description: 150-160 caracteres
  ☐ Canonical URL correcta
  ☐ Open Graph completo

☐ Breadcrumb
  ☐ Ruta correcta: Inicio > Estados > [Estado] > [Nombre]
  ☐ Links funcionan
  ☐ Aria-labels correctos

☐ Contenido
  ☐ H1 único con nombre del negocio
  ☐ Rating y reseñas coinciden con card
  ☐ Servicios con precios
  ☐ Horarios de los 7 días
  ☐ Mínimo 3 reseñas
  ☐ Descripción de 2-3 párrafos

☐ Sidebar de contacto
  ☐ Precio desde correcto
  ☐ WhatsApp con formato: wa.me/521XXXXXXXXXX
  ☐ Teléfono con formato: tel:+52XXXXXXXXXX
  ☐ Dirección completa con CP
```

#### 10.1.5 Validación de Enlaces

```
☐ Enlaces internos
  ☐ Card enlaza a página de detalle
  ☐ Breadcrumb enlaces funcionan
  ☐ Ruta absoluta desde raíz (/)

☐ Enlaces externos
  ☐ WhatsApp abre correctamente
  ☐ Teléfono marca al número correcto
  ☐ target="_blank" rel="noopener noreferrer"
```

#### 10.1.6 Validación Responsive

```
☐ Desktop (1024px+)
  ☐ Layout de 2 columnas correcto
  ☐ Galería muestra 5 imágenes

☐ Tablet (768px - 1023px)
  ☐ Sidebar debajo del contenido principal
  ☐ Grid de cards ajustado

☐ Mobile (< 768px)
  ☐ Una columna
  ☐ Botones de contacto accesibles
  ☐ Texto legible sin zoom
```

### 10.2 Herramientas de Validación

| Herramienta          | Propósito           | URL                                    |
| -------------------- | ------------------- | -------------------------------------- |
| W3C Validator        | Validación HTML     | validator.w3.org                       |
| Google Rich Results  | Datos estructurados | search.google.com/test/rich-results    |
| PageSpeed Insights   | Rendimiento         | pagespeed.web.dev                      |
| Mobile-Friendly Test | Responsive          | search.google.com/test/mobile-friendly |
| WAVE                 | Accesibilidad       | wave.webaim.org                        |

---

## 11. GESTIÓN DE CONTADORES Y MÉTRICAS

### 11.1 Ubicaciones de Contadores

Cada vez que se agrega una barbería, actualizar contadores en:

#### 11.1.1 Listado del Estado (`/[estado]/index.html`)

```html
Mostrando [NUEVO_TOTAL] barberías en [Estado] Todas [NUEVO_TOTAL] [Nombre
Alcaldía] [NUEVO_TOTAL_ALCALDIA]
```

#### 11.1.2 Página de Zonas (`/zona.html`)

```html
[NUEVO_TOTAL] barberías
```

#### 11.1.3 Página Principal (`/index.html`)

```html
[NUEVO_TOTAL] barberías
```

### 11.2 Fórmulas de Cálculo

```
Total Estado = Σ (Barberías de todas las alcaldías del estado)

Total Alcaldía = Cantidad de archivos barberia-*-[alcaldia].html

Total Nacional = Σ (Totales de todos los estados)
```

### 11.3 Registro de Cambios

Mantener un log de cambios en `.audit/`:

```yaml
# .audit/cambios-YYYY-MM.yaml

- fecha: "2025-12-01"
  accion: "agregar"
  barberia: "Mr. Venez Barberia & Spa"
  archivo: "barberia-del-valle-centro-benito-juarez.html"
  estado: "ciudad-de-mexico"
  alcaldia: "Benito Juarez"
  colonia: "Del Valle Centro"
  datos:
    rating: 4.8
    resenas: 404
    telefono: "5578632861"
    whatsapp: "5578632861"
    precio_desde: 200
    badge: "Premium"
    tags: ["Premium", "Spa", "Barba"]
  contadores_actualizados:
    - "ciudad-de-mexico/index.html results-count: 4 → 5"
    - "ciudad-de-mexico/index.html sidebar 'Todas': 4 → 5"
    - "ciudad-de-mexico/index.html sidebar 'Benito Juarez': 0 → 1"
    - "zona.html CDMX: 4 → 5"
    - "index.html CDMX alcaldias: 4 → 5"
    - "index.html Barberias Destacadas: agregada card"
  fuentes:
    - "https://www.top-rated.online/cities/Benito+Juarez/place/p/3460138/Barberia+%26+Spa+Mr.+Venez"
    - "https://mrvenezbarberiaspa.wixsite.com/mrvenez"

- fecha: "2025-12-01"
  accion: "agregar"
  barberia: "Scalper Studio"
  archivo: "barberia-juarez-cuauhtemoc.html"
  estado: "ciudad-de-mexico"
  alcaldia: "Cuauhtemoc"
  colonia: "Juarez"
  datos:
    rating: 4.8
    resenas: 393
    telefono: "5552046824"
    whatsapp: "5573324799"
    precio_desde: 200
    badge: "Premium"
    tags: ["Premium", "Grooming", "Barba"]
  contadores_actualizados:
    - "ciudad-de-mexico/index.html results-count: 3 → 4"
    - "ciudad-de-mexico/index.html sidebar 'Todas': 3 → 4"
    - "ciudad-de-mexico/index.html sidebar 'Cuauhtemoc': 2 → 3"
    - "zona.html CDMX: 245 → 4"
    - "index.html CDMX alcaldias: 245 → 4"
    - "index.html Barberias Destacadas: agregada card"
  fuentes:
    - "https://www.timeoutmexico.mx/ciudad-de-mexico/shopping/barberia-scalper-studio-juarez"
    - "https://www.scalperstudio.com/contacto/"

- fecha: "2025-11-26"
  accion: "agregar"
  barberia: "Barber Kings Polanco"
  archivo: "barberia-polanco-miguel-hidalgo.html"
  estado: "ciudad-de-mexico"
  alcaldia: "Miguel Hidalgo"
  contadores_actualizados:
    - "ciudad-de-mexico/index.html: 245 → 246"
    - "zona.html CDMX: 245 → 246"
    - "index.html CDMX: 245 → 246"
    - "sidebar Miguel Hidalgo: 21 → 22"
```

---

## 12. OPTIMIZACIÓN SEO ON-PAGE

### 12.1 Estructura de URLs

| Nivel   | Formato                                        | Ejemplo                                                            |
| ------- | ---------------------------------------------- | ------------------------------------------------------------------ |
| Home    | `/`                                            | `barberia.mx/`                                                     |
| Zonas   | `/zona.html`                                   | `barberia.mx/zona.html`                                            |
| Estado  | `/[estado]/`                                   | `barberia.mx/ciudad-de-mexico/`                                    |
| Detalle | `/[estado]/barberia-[colonia]-[alcaldia].html` | `barberia.mx/ciudad-de-mexico/barberia-roma-norte-cuauhtemoc.html` |

### 12.2 Títulos y Meta Descriptions

#### Página de Detalle

**Title Tag (50-60 caracteres):**

```
[Nombre Negocio] - [Colonia] | Barberia.mx
```

**Meta Description (150-160 caracteres):**

```
[Nombre] en [Colonia], [Ciudad]. [Servicio principal] desde $[precio].
Horarios, precios y [N] reseñas. Reserva tu cita hoy.
```

**Ejemplos:**

```html
The Barber's Spa - Roma Norte | Barberia.mx Barber Kings Polanco - Polanco |
Barberia.mx
```

### 12.3 Jerarquía de Encabezados

```
H1: [Nombre del Negocio]                    ← Único por página
├── H2: Acerca de
├── H2: Servicios y Precios
├── H2: Horario
└── H2: Reseñas de Clientes
```

### 12.4 Keywords por Tipo de Página

#### Página de Detalle

```yaml
keyword_principal: "barbería [colonia] [ciudad]"
keywords_secundarias:
  - "[nombre negocio]"
  - "barbería [alcaldía]"
  - "barber shop [colonia]"
  - "corte de cabello [zona]"
  - "barbería cerca de [zona]"
```

### 12.5 Datos Estructurados (Schema.org)

**LocalBusiness Schema (Implementación Futura):**

```json
{
  "@context": "https://schema.org",
  "@type": "BarberShop",
  "name": "[Nombre del Negocio]",
  "image": "[URL de imagen]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Calle y Número]",
    "addressLocality": "[Colonia]",
    "addressRegion": "[Estado]",
    "postalCode": "[CP]",
    "addressCountry": "MX"
  },
  "telephone": "+52[TELEFONO]",
  "openingHoursSpecification": [...],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "[X.X]",
    "reviewCount": "[N]"
  }
}
```

---

## 13. EJEMPLO COMPLETO DE IMPLEMENTACIÓN

### Caso: Agregar "Barber Kings Polanco" en Miguel Hidalgo, CDMX

#### Paso 1: Crear Nombre de Archivo

```
barberia-polanco-miguel-hidalgo.html
```

#### Paso 2: Agregar Card en Listado

**Archivo:** `/ciudad-de-mexico/index.html`

**Ubicación:** Dentro de `<div class="barberias-grid-large">`

```html
Premium Barber Kings Polanco ★ 4.8 (89) Polanco, Miguel Hidalgo Ejecutivo
Premium Lujo Desde $200 Ver más →
```

#### Paso 3: Crear Página de Detalle

**Archivo:** `/ciudad-de-mexico/barberia-polanco-miguel-hidalgo.html`

Usar la plantilla completa de la Sección 6, reemplazando todas las variables con los datos del YAML de ejemplo de la Sección 9.2.

#### Paso 4: Actualizar Contadores

| Archivo                        | Ubicación                | Cambio    |
| ------------------------------ | ------------------------ | --------- |
| `/ciudad-de-mexico/index.html` | results-count            | 245 → 246 |
| `/ciudad-de-mexico/index.html` | sidebar "Todas"          | 245 → 246 |
| `/ciudad-de-mexico/index.html` | sidebar "Miguel Hidalgo" | 21 → 22   |
| `/zona.html`                   | card CDMX                | 245 → 246 |
| `/index.html`                  | CDMX count               | 245 → 246 |

#### Paso 5: Verificación Final

```
☐ Card visible en listado de CDMX
☐ Link de card funciona
☐ Página de detalle carga correctamente
☐ Breadcrumb funciona
☐ WhatsApp abre con mensaje correcto
☐ Teléfono marca el número
☐ Horarios muestran día actual resaltado
☐ Contadores actualizados en todos los lugares
☐ Responsive funciona en mobile
```

---

## 14. ERRORES COMUNES Y SOLUCIONES

### 14.1 Errores de Nomenclatura

| Error                                 | Problema                   | Solución                              |
| ------------------------------------- | -------------------------- | ------------------------------------- |
| `TheBarbersSpa-roma-norte.html`       | Incluye nombre del negocio | `barberia-roma-norte-cuauhtemoc.html` |
| `barberia_roma_norte.html`            | Usa guiones bajos          | `barberia-roma-norte-cuauhtemoc.html` |
| `Barberia-Roma-Norte.html`            | Usa mayúsculas             | `barberia-roma-norte-cuauhtemoc.html` |
| `barberia-roma.html`                  | Falta alcaldía             | `barberia-roma-norte-cuauhtemoc.html` |
| `barberia-roma-norte-cuauhtémoc.html` | Tiene acento               | `barberia-roma-norte-cuauhtemoc.html` |

### 14.2 Errores de Estructura

| Error                 | Descripción                      | Solución                             |
| --------------------- | -------------------------------- | ------------------------------------ |
| Múltiples H1          | Más de un `<h1>` en la página    | Dejar solo el del nombre del negocio |
| Badge incorrecto      | Badge no corresponde a criterios | Verificar criterios de asignación    |
| Tags excesivos        | Más de 3 tags                    | Reducir a los 3 más relevantes       |
| Estilos en CSS global | Modificaciones a style.css       | Usar estilos embebidos en `<style>`  |

### 14.3 Errores de Datos

| Error                 | Descripción                 | Solución                          |
| --------------------- | --------------------------- | --------------------------------- |
| URL de sitio web      | Se incluyó web del negocio  | Eliminar completamente            |
| Precio inventado      | Precio no verificado        | Obtener de Google Maps o eliminar |
| Rating desactualizado | Diferente al de Google Maps | Actualizar con dato actual        |
| Horarios incompletos  | Faltan días                 | Completar los 7 días              |

### 14.4 Errores de Enlaces

| Error                    | Descripción                       | Solución                           |
| ------------------------ | --------------------------------- | ---------------------------------- |
| Link roto                | Card apunta a archivo inexistente | Verificar nombre de archivo        |
| Ruta relativa incorrecta | `href="barberia-..."`             | Usar `href="/estado/barberia-..."` |
| WhatsApp sin código país | `wa.me/55...`                     | Usar `wa.me/521...`                |
| Tel sin formato          | `tel:5555...`                     | Usar `tel:+525555...`              |

### 14.5 Errores de Contadores

| Error                    | Descripción                            | Solución                            |
| ------------------------ | -------------------------------------- | ----------------------------------- |
| Contador no actualizado  | Se agregó barbería pero contador igual | Actualizar en todas las ubicaciones |
| Contador incorrecto      | Suma no coincide                       | Recontar archivos en carpeta        |
| Contador de alcaldía mal | Total alcaldía incorrecto              | Verificar asignación de alcaldía    |

---

## 15. ANEXOS TÉCNICOS

### 15.1 Tabla de Variables de Reemplazo

[NOMBRE_NEGOCIO] → Nombre del negocio de Google Maps
[COLONIA] → Nombre de la colonia
[ALCALDIA] → Alcaldía o Municipio
[ESTADO] → Nombre completo del estado
[ESTADO_SLUG] → Estado en kebab-case para URLs
[CODIGO_POSTAL] → CP de 5 dígitos
[TELEFONO] → 10 dígitos sin espacios
[TELEFONO_FORMATEADO] → XX XXXX XXXX
[RATING] → Calificación con 1 decimal
[NUM_RESENAS] → Número entero de reseñas
[PRECIO_DESDE] → Precio mínimo en pesos
[BADGE] → Premium | Nuevo | Verificado | (vacío)
[TAGS] → Máximo 3, separados por coma
[HORARIO_LUNES] → HH:MM - HH:MM o Cerrado
... (demás días)
[DESCRIPCION_P1] → Párrafo 1 de descripción
[DESCRIPCION_P2] → Párrafo 2 de descripción
[DESCRIPCION_P3] → Párrafo 3 de descripción

### 15.2 Códigos de Colores del Sistema

| Elemento      | Variable CSS                         | Valor Hex |
| ------------- | ------------------------------------ | --------- | --- | --------- | ----------- | ------- | --- | ------------ | --------------- | ------- | --- | ------------ | ------------- | -------- |
| Primario      | `--color-primary`                    | `#000000` |
| Accent        | `--color-accent`                     | `#0066FF` |
| Rating Star   | `--color-rating`                     | `#FFB800` |
| Badge Premium | `--ReintentarFContinuarbadge-premium | #B8860B   |     | Badge New | --badge-new | #0066FF |     | Success/Open | --color-success | #22C55E |     | Error/Closed | --color-error | #EF4444` |

15.3 Formato de Mensaje de WhatsApp
Mensaje URL Encoded:
Hola%2C%20encontr%C3%A9%20tu%20barber%C3%ADa%20en%20Barberia.mx%20y%20me%20gustar%C3%ADa%20agendar%20una%20cita
Mensaje decodificado:
Hola, encontré tu barbería en Barberia.mx y me gustaría agendar una cita
URL completa:
https://wa.me/521XXXXXXXXXX?text=Hola%2C%20encontr%C3%A9%20tu%20barber%C3%ADa%20en%20Barberia.mx%20y%20me%20gustar%C3%ADa%20agendar%20una%20cita
15.4 Códigos de Estado/Zona
EstadoCódigoCarpetaCiudad de MéxicoCDMX/ciudad-de-mexico/Estado de MéxicoEDOMEX/estado-de-mexico/JaliscoJAL/jalisco/Nuevo LeónNL/nuevo-leon/QuerétaroQRO/queretaro/PueblaPUE/puebla/Quintana RooQROO/quintana-roo/YucatánYUC/yucatan/
15.5 Comandos de Solicitud Rápida
Para agregar nueva barbería:
Agrega barbería: [nombre], [dirección completa], [colonia], [alcaldía],
[estado], tel:[teléfono], rating:[X.X], reseñas:[N],
horarios:[lun-vie HH-HH, sab HH-HH, dom HH-HH],
servicios:[servicio1 $X, servicio2 $X], tags:[tag1, tag2, tag3]
Para buscar y agregar desde Google Maps:
Busca y agrega barbería real en [Colonia], [Alcaldía], [Estado]
con rating mínimo 4.5 y más de 50 reseñas.

NOTAS FINALES
Reglas de Oro

SIEMPRE verificar datos en Google Maps antes de agregar
NUNCA incluir URLs de sitios web de los negocios
NUNCA modificar css/style.css ni js/app.js
SIEMPRE usar la nomenclatura correcta de archivos
SIEMPRE actualizar TODOS los contadores al agregar una barbería
SIEMPRE validar con el checklist completo antes de publicar
USAR el archivo de referencia: /ciudad-de-mexico/barberia-roma-norte-cuauhtemoc.html

Proceso de Actualización del Documento
Este documento debe actualizarse cuando:

Se agreguen nuevos estados de cobertura
Se modifiquen criterios de clasificación
Se agreguen nuevas funcionalidades al sitio
Se detecten errores o ambigüedades

Control de Versiones

| Versión | Fecha     | Cambios                                                    |
| ------- | --------- | ---------------------------------------------------------- |
| 1.0     | Nov 2024  | Versión inicial                                            |
| 2.0     | Nov 2025  | Expansión profesional completa                             |
| 2.1     | Dic 2025  | Agregada Scalper Studio Juárez, actualización de contadores |
| 2.2     | Dic 2025  | Agregada Mr. Venez Barbería & Spa Del Valle Centro          |
| 2.3     | Dic 2025  | Artículo: Las Mejores Barberías en Ciudad de México         |

FIN DEL DOCUMENTO
Sistema de Producción de Contenido - Barberia.mx
Versión 2.3 Professional
Diciembre 2025

---

Listo, Frank. Este documento está significativamente mejorado con:

- **Estructura profesional de 15 secciones** vs las 10 originales
- **Tablas organizativas** para información técnica
- **Diagramas de flujo** para procesos
- **Especificaciones detalladas** de cada componente
- **Sistema de validación** con checklists exhaustivos
- **Protocolo YAML** estructurado para entrada de datos
- **Cobertura geográfica** expandida con planes de crecimiento
- **Errores y soluciones** documentados
- **Anexos técnicos** con referencias rápidas
