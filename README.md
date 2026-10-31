# Sonríe Salud — web odontológica

Landing page responsiva en HTML, CSS y JavaScript puro para Sonríe Salud, orientada a Chimbote y Nuevo Chimbote.

## Estructura principal

- `index.html` — contenido, SEO, Open Graph, JSON-LD y componentes.
- `assets/css/styles.css` — diseño responsive, paleta de marca y transiciones.
- `assets/js/app.js` — menú, WhatsApp, reserva, carrusel, GA4 y eventos.
- `assets/images/logo-sonrie-salud.png` — logo oficial optimizado para web.
- `assets/images/services/` — ilustraciones tipo marca de agua para servicios.
- `assets/images/news/` — banners demostrativos para noticias/promociones.
- `robots.txt`, `sitemap.xml`, `site.webmanifest` — base técnica para publicación.

## Identidad visual aplicada

Paleta solicitada:

- `#a4ccfb` — azul claro.
- `#ccecfc` — celeste muy claro.
- `#231f44` — azul/violeta oscuro principal.
- `#ffffff` — blanco.

El sitio respeta `prefers-reduced-motion`, no utiliza parallax ni movimientos continuos y las animaciones de entrada son cortas y de poca distancia.

## 1. Datos que aún debes reemplazar

Busca estas cadenas antes de publicar:

- `51999999999` — WhatsApp real en `assets/js/app.js` (Perú: 51 + 9 dígitos, sin `+` ni espacios).
- `https://www.tudominio.pe/` — dominio definitivo.
- `REEMPLAZAR POR DIRECCIÓN EXACTA` — dirección de cada sede.
- Enlaces de Google Maps — reemplazar por la URL exacta de cada sede.
- Misión y visión — validar los textos con Sonríe Salud.
- Servicios — confirmar cartera real de tratamientos.

Las redes sociales ya están configuradas:

- Instagram: `https://www.instagram.com/sonriesalud.pe/`
- TikTok: `https://www.tiktok.com/@sonriesalud`
- Facebook: `https://www.facebook.com/sonriesalud.pe`

## 2. Noticias, promociones y eventos

La sección `#noticias` contiene tres tarjetas-banner. En escritorio se muestran en grilla y en móvil funcionan como un scroller horizontal con `scroll-snap`.

Para reemplazar un banner, cambia el `src` de su `<img>` por la imagen real. Mantén idealmente una proporción `16:9`, por ejemplo 1200 × 675 px.

También puedes cambiar el `href` de cada noticia para enviarla a:

- una sección interna,
- WhatsApp,
- una página de campaña,
- un formulario.

## 3. Testimonios en carrusel

Se eligió un carrusel manual, sin autoplay, porque varios videos reproduciéndose o moviéndose automáticamente generan distracción y aumentan el peso inicial de la página.

El carrusel permite:

- flechas anterior/siguiente,
- indicadores,
- teclado (`←` y `→`),
- gesto horizontal en pantallas táctiles,
- carga del video únicamente después del clic.

Para YouTube/Vimeo, en `index.html` busca:

```html
<button class="video-play" data-video-url="">
```

y coloca una URL de inserción, por ejemplo:

```html
data-video-url="https://www.youtube.com/embed/ID_DEL_VIDEO"
```

También admite archivos locales `.mp4` o `.webm`:

```html
data-video-url="assets/videos/testimonio-01.mp4"
```

Para agregar más videos, duplica un bloque `.testimonial-slide`. Si aparecen pacientes identificables, utiliza únicamente videos e información con la autorización correspondiente.

## 4. Servicios con marca de agua

Cada tarjeta usa una ilustración SVG propia como marca de agua. Se configura desde la variable `--service-art` en el atributo `style` de la tarjeta.

Ejemplo:

```html
<article class="service-card" style="--service-art:url('assets/images/services/ortho.svg')">
```

No se usa numeración visible en las tarjetas.

## 5. Reserva y WhatsApp

El formulario no crea una cita definitiva. Prepara el mensaje y abre WhatsApp para que el paciente lo revise y lo envíe.

En `assets/js/app.js` cambia:

```js
const WHATSAPP_NUMBER = "51999999999";
```

por el número real.

## 6. Google Analytics 4

En `assets/js/app.js` cambia:

```js
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";
```

por el Measurement ID real.

Eventos preparados:

- `generate_lead` — envío del formulario de reserva.
- `whatsapp_click` — consultas por WhatsApp.
- `social_click` — clic en redes sociales.
- `map_click` — clic en Google Maps.
- `news_click` — interacción con banners/noticias.
- `testimonial_slide` — navegación del carrusel.
- `testimonial_play` — reproducción de un testimonio configurado.

Analytics solo se carga si el ID está configurado y el visitante acepta la analítica.

## 7. SEO local

El HTML incluye:

- `title` y `meta description` orientados a Chimbote y Nuevo Chimbote.
- canonical.
- Open Graph / Twitter Card.
- JSON-LD con `Organization` y dos entidades `Dentist`.
- enlaces oficiales de redes sociales en `sameAs`.
- estructura semántica H1/H2/H3.
- `robots.txt` y `sitemap.xml`.

Antes de publicar, actualiza dominio, teléfono, direcciones e imágenes reales. Posteriormente conviene conectar Google Search Console y mantener una ficha de Google Business Profile correcta para cada sede.

## 8. Ejecutar localmente

Puedes abrir `index.html` directamente. Para probarlo como sitio web local, desde esta carpeta ejecuta:

```bash
python -m http.server 8080
```

y visita `http://localhost:8080`.

## 9. Mejoras recomendadas para una siguiente iteración

- Fotos reales optimizadas de ambas sedes y del equipo.
- Ubicaciones definitivas de Google Maps.
- WhatsApp real.
- Videos testimoniales autorizados.
- Banners reales de campañas.
- Página individual por servicio para fortalecer SEO local.
- Política de privacidad y textos legales definitivos.
