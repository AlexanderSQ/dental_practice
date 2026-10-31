# Sonríe Salud Web · V4

Esta versión refuerza la conversión visual de la landing manteniendo la identidad principal de Sonríe Salud.

## Cambios V4

- Barra de navegación conservada en `#231f44`, con enlaces blancos y CTA celeste.
- Bloque de proceso rediseñado como ruta visual de 3 pasos con iconografía odontológica.
- Servicios rediseñados con iconos protagonistas, marca de agua dental, frase gancho y CTA destacado.
- Botones de servicios con color de marca, viñeta telefónica/WhatsApp y flecha de acción.
- Ortodoncia se muestra como servicio más consultado para reforzar jerarquía visual.
- Microinteracciones de elevación, iconos y CTA sin animaciones agresivas.
- Nuevos recursos de proceso en `assets/images/process/`.

Landing informativa responsive para Sonríe Salud, rediseñada con una estética más luminosa, familiar y dinámica. La identidad usa principalmente `#a4ccfb`, `#ccecfc` y blanco; `#231f44` queda reservado para texto, pequeños acentos y footer.

## Principales mejoras de esta versión

- Header claro y navegación más ligera.
- Hero más cálido para público familiar, niños y adultos.
- Reducción importante de grandes bloques oscuros.
- Tarjetas de servicios más visuales y con microinteracciones.
- **Noticias y alertas convertidas en carrusel** con desktop + mobile banners.
- Carrusel de noticias con autoplay suave cada 8 s, control Pausar/Reanudar, pausa al interactuar y respeto por `prefers-reduced-motion`.
- Testimonios mantienen carrusel manual para no reproducir/mover videos automáticamente.
- Ambas sedes corregidas a **Nuevo Chimbote**.
- Redes sociales con colores originales de Instagram, TikTok y Facebook.
- Animaciones de entrada más completas, pero de poca distancia y sin parallax.
- Guía completa de imágenes y videos en `GUIA-RECURSOS.md`.

## Ejecutar localmente

Puedes abrir `index.html` directamente, aunque para una prueba más real conviene levantar un servidor local.

Con Python:

```bash
python -m http.server 8080
```

Luego visita `http://localhost:8080`.

## Configuración rápida

### WhatsApp

En `assets/js/app.js` cambia:

```js
const WHATSAPP_NUMBER = "51999999999";
```

por el número real en formato `51` + 9 dígitos, sin `+` ni espacios.

### Google Analytics

Cuando tengas una propiedad GA4, reemplaza:

```js
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";
```

La web ya incluye consentimiento antes de cargar Analytics.

### Sedes

En `index.html` reemplaza las direcciones y enlaces de Google Maps de:

- Nuevo Chimbote · Sede 1
- Nuevo Chimbote · Sede 2

También actualiza esos datos en el JSON-LD del `<head>`.

## Contenido multimedia

Consulta `GUIA-RECURSOS.md` para ver las rutas exactas, dimensiones, formatos y pesos recomendados de cada imagen, banner, portada y video.