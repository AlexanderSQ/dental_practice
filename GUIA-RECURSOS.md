# Guía de imágenes, banners y videos — Sonríe Salud V3

Esta guía indica **qué archivos puedes reemplazar**, en qué sección aparecen y qué formato conviene usar. Si mantienes el mismo nombre y la misma ruta, **no necesitas modificar el HTML**.

## 1. Logo

| Sección | Archivo actual | Recomendación |
|---|---|---|
| Header, hero y footer | `assets/images/logo-sonrie-salud.png` | PNG con fondo transparente. Ideal: 800 a 1600 px de ancho. Mantener la proporción original. Peso sugerido: < 180 KB. |

**Importante:** el logo actual es blanco/transparente, por eso el header lo coloca sobre una pequeña cápsula oscura. No es necesario cambiar el color del logo.

## 2. Imagen principal del Hero

| Sección | Archivo actual | Tamaño recomendado | Formato |
|---|---|---:|---|
| Portada principal | `assets/images/hero-dental.svg` | 1400 × 1400 px, relación 1:1 | WebP recomendado; JPG o PNG si hace falta transparencia |

- Si usas una fotografía real: WebP, calidad 75–85, idealmente < 350 KB.
- Mantén al paciente/odontólogo centrado para que el recorte responda bien en móvil.
- Evita texto dentro de la fotografía.

## 3. Tarjetas de servicios — imágenes tipo marca de agua

| Servicio | Archivo |
|---|---|
| Odontología general | `assets/images/services/general.svg` |
| Profilaxis / prevención | `assets/images/services/prevention.svg` |
| Ortodoncia | `assets/images/services/ortho.svg` |
| Estética dental | `assets/images/services/aesthetic.svg` |
| Endodoncia | `assets/images/services/endo.svg` |
| Implantes y prótesis | `assets/images/services/implant.svg` |

**Formato ideal:** SVG. Alternativa: PNG/WebP transparente de 600 × 600 px, relación 1:1 y < 100 KB.

Estas imágenes se muestran con opacidad baja, por lo que deben ser simples, limpias y reconocibles. Evita fotografías complejas en esta sección.

## 4. Noticias y alertas — carrusel de banners

El carrusel admite una versión horizontal para escritorio y una versión vertical para móvil. Esto evita que textos o personas se corten en pantallas pequeñas.

| Slide | Escritorio | Móvil |
|---|---|---|
| Promoción | `assets/images/news/promo.svg` | `assets/images/news/promo-mobile.svg` |
| Evento | `assets/images/news/event.svg` | `assets/images/news/event-mobile.svg` |
| Fecha especial | `assets/images/news/special.svg` | `assets/images/news/special-mobile.svg` |

### Banner de escritorio
- Tamaño recomendado: **1600 × 720 px**.
- Relación aproximada: **20:9**.
- Formato recomendado: **WebP**.
- Peso ideal: **180–350 KB**.
- JPG también funciona para fotografías.

### Banner móvil
- Tamaño recomendado: **1080 × 1350 px**.
- Relación: **4:5**.
- Formato recomendado: **WebP**.
- Peso ideal: **150–300 KB**.

### Recomendación de diseño
- Coloca logos, rostros y mensajes importantes lejos de los bordes.
- Si el banner ya contiene texto, mantén el mensaje corto y con alto contraste.
- Es mejor que el detalle extenso permanezca en el texto HTML del carrusel, no incrustado en la imagen.

Si cambias de `.svg` a `.webp`, actualiza en `index.html` tanto el `src` de escritorio como el `srcset` móvil.

## 5. Testimonios — portadas de video

| Testimonio | Portada actual |
|---|---|
| 1 | `assets/images/testimonial-1.svg` |
| 2 | `assets/images/testimonial-2.svg` |
| 3 | `assets/images/testimonial-3.svg` |
| 4 | `assets/images/testimonial-4.svg` |

**Portada recomendada:** 1280 × 720 px, relación 16:9, WebP/JPG, < 220 KB.

La portada aparece antes de que el visitante reproduzca el video. Lo ideal es usar un fotograma nítido del paciente, siempre con autorización para publicarlo.

## 6. Videos testimoniales

La web admite dos alternativas:

### Opción recomendada — YouTube o Vimeo
Usa una URL de inserción en el atributo `data-video-url` del botón del testimonio dentro de `index.html`.

Ejemplo:

```html
<button
  class="video-play"
  type="button"
  data-video-url="https://www.youtube.com/embed/ID_DEL_VIDEO">
</button>
```

Ventajas: la página pesa menos, el streaming se adapta a la conexión y no necesitas alojar archivos grandes en tu servidor.

### Opción local — MP4 / WebM
Puedes colocar videos en `assets/videos/` y usar, por ejemplo:

```html
data-video-url="assets/videos/testimonio-01.mp4"
```

**Especificación recomendada:**
- Contenedor: MP4.
- Video: H.264.
- Audio: AAC.
- Resolución ideal: **1920 × 1080 px (1080p)**.
- Relación: **16:9**.
- FPS: 25 o 30.
- Bitrate orientativo: 3–6 Mbps.
- Peso ideal por video: preferiblemente < 20–30 MB si se aloja localmente.

También se admiten videos verticales 1080 × 1920, pero para una web de escritorio se recomienda editar una versión 16:9 o usar una portada 16:9 para mantener una presentación consistente.

## 7. Fotografías de sedes

| Sección | Archivo actual |
|---|---|
| Nuevo Chimbote — Sede 1 | `assets/images/clinic-1.svg` |
| Nuevo Chimbote — Sede 2 | `assets/images/clinic-2.svg` |

**Tamaño recomendado:** 1600 × 900 px, relación 16:9.

**Formato:** WebP recomendado; JPG si proviene directamente de fotografía. Peso sugerido: 200–400 KB.

Idealmente usa una foto exterior o interior reconocible de cada sede, con buena iluminación y sin información sensible visible.

## 8. Imagen para compartir en WhatsApp / Facebook

Archivo: `assets/images/og-clinica.jpg`

- Tamaño: **1200 × 630 px**.
- Formato: JPG.
- Peso: < 500 KB.
- Debe incluir marca, una fotografía clara y un mensaje corto.

Esta imagen se usa cuando alguien comparte la URL de la web en redes o mensajería compatible con Open Graph.

## 9. Favicon

Archivo: `assets/images/favicon.svg`

Puedes mantener SVG. Si necesitas compatibilidad adicional, también puedes generar `favicon.ico` y PNG de 32 × 32 / 180 × 180.

## 10. Datos que todavía debes reemplazar antes de publicar

1. `WHATSAPP_NUMBER` en `assets/js/app.js`.
2. Direcciones exactas de **Nuevo Chimbote — Sede 1** y **Sede 2** en `index.html`.
3. Enlaces exactos de Google Maps de ambas sedes.
4. Teléfono y direcciones en el bloque JSON-LD de `index.html`.
5. Dominio final `https://www.tudominio.pe/` en SEO, Open Graph, sitemap y JSON-LD.
6. `GA_MEASUREMENT_ID` si se activa Google Analytics 4.
7. Banners, fotos de sedes y testimonios reales.

## Regla práctica para imágenes web

Siempre que sea posible usa **WebP** para fotografías y banners, **SVG** para iconos/ilustraciones y **PNG** solo cuando necesites transparencia compleja. El objetivo es conservar buena calidad con un peso bajo para que la web cargue rápido en celulares.


## Recursos incorporados en V4

La franja “Tu visita, paso a paso” utiliza tres SVG livianos y reemplazables:

| Paso | Archivo | Uso | Recomendación si se reemplaza |
|---|---|---|---|
| Evaluación | `assets/images/process/evaluate.svg` | Evalúa tu sonrisa | SVG cuadrado, `viewBox` 1:1 |
| Opciones | `assets/images/process/options.svg` | Conoce tus opciones | SVG cuadrado, `viewBox` 1:1 |
| Agenda | `assets/images/process/agenda.svg` | Agenda fácilmente | SVG cuadrado, `viewBox` 1:1 |

Los servicios continúan usando los mismos archivos de `assets/images/services/`, pero en V4 aparecen dos veces visualmente: como icono principal de la tarjeta y como marca de agua de fondo. Por ello, reemplazar uno de esos SVG actualiza ambos usos automáticamente.
