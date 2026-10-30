# Web clínica odontológica — Chimbote / Nuevo Chimbote

Landing page responsiva en HTML, CSS y JavaScript puro.

## Estructura

- `index.html` — contenido, SEO, Open Graph y JSON-LD.
- `assets/css/styles.css` — diseño responsivo y animaciones.
- `assets/js/app.js` — menú, WhatsApp, formulario, analítica y pequeñas interacciones.
- `assets/images/` — recursos SVG de demostración.
- `robots.txt` — reglas de rastreo.
- `sitemap.xml` — sitemap inicial.
- `site.webmanifest` — información básica para navegadores móviles.

## 1. Datos que debes reemplazar antes de publicar

Busca en el proyecto estas cadenas:

- `Clínica Dental Sonrisa` → nombre real de la clínica.
- `51999999999` → WhatsApp real en `assets/js/app.js` (formato Perú: 51 + 9 dígitos, sin + ni espacios).
- `https://www.tudominio.pe/` → dominio real.
- `contacto@tudominio.pe` → correo real.
- `TU_USUARIO` → perfiles reales de Instagram, TikTok y Facebook.
- `REEMPLAZAR POR DIRECCIÓN EXACTA` → direcciones de las dos sedes.
- Enlaces de Google Maps → enlaces reales de cada sede.
- Horarios del footer.
- Lista de servicios reales.
- Misión y visión definitivas.

## 2. Videos de testimonios

Actualmente existen dos tarjetas de muestra. Puedes reemplazar el bloque `.video-placeholder` por un `iframe` de YouTube u otro reproductor.

Ejemplo:

```html
<iframe
  src="https://www.youtube.com/embed/ID_DEL_VIDEO"
  title="Testimonio de paciente"
  loading="lazy"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen>
</iframe>
```

Si se muestran pacientes identificables, usa únicamente testimonios e imágenes con la autorización correspondiente.

## 3. Google Analytics 4

En `assets/js/app.js` cambia:

```js
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";
```

por tu Measurement ID real, por ejemplo `G-ABC1234567`.

La web cargará Analytics solo después de que el visitante acepte la analítica en el aviso incluido.

Eventos preparados:

- `generate_lead` — formulario de reserva.
- `whatsapp_click` — clics hacia WhatsApp.
- `social_click` — redes sociales.
- `map_click` — Google Maps.
- `testimonial_placeholder_click` — temporal, mientras se colocan videos reales.

## 4. SEO local

El `index.html` ya incluye:

- title y meta description orientados a Chimbote / Nuevo Chimbote.
- canonical.
- Open Graph y Twitter Card.
- `robots`.
- datos estructurados JSON-LD con `Dentist` para dos sedes.
- contenido semántico con un único H1 y secciones H2/H3.
- `robots.txt` y `sitemap.xml`.

Después de publicar:

1. Configura Google Search Console.
2. Envía `sitemap.xml`.
3. Mantén una ficha de Google Business Profile correcta para cada sede.
4. Usa fotografías reales, buenas y optimizadas.
5. Crea páginas específicas para servicios importantes si quieres crecer en SEO (ej. `/ortodoncia-chimbote/`).
6. Valida los datos estructurados con Rich Results Test.

## 5. Ejecutar localmente

Puedes abrir `index.html` directamente o servir la carpeta con un servidor local.

Con Python:

```bash
python -m http.server 8080
```

Luego abre `http://localhost:8080`.

## 6. Próximas mejoras recomendadas

- Fotografías reales de las sedes y equipo.
- Página individual por servicio para SEO.
- Integración de testimonios reales.
- Google Business Profile por sede.
- Search Console + GA4.
- Política de privacidad y términos adaptados al negocio.
- Optimización WebP/AVIF de fotografías reales.
