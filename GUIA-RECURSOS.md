# Guía de recursos PNG y videos — Sonríe Salud V5

La V5 queda preparada para que las **imágenes principales que vas a reemplazar sean PNG**. Si conservas exactamente el nombre y la ruta indicados, puedes reemplazar el archivo sin modificar el HTML.

> Importante: PNG funciona muy bien para transparencias, pero puede pesar bastante. Antes de publicar, optimiza las imágenes con Squoosh, TinyPNG o una herramienta equivalente para mantener buena velocidad en celulares.

## 1. Hero / portada principal

| Uso | Archivo | Medida recomendada | Relación |
|---|---|---:|---:|
| Imagen principal del Hero | `assets/images/hero-dental.png` | **1400 × 1400 px** | 1:1 |

- Formato: **PNG**.
- Si el odontólogo/persona debe verse recortado sobre el fondo de la web, usa PNG con transparencia.
- Mantén el sujeto centrado y deja aire alrededor para responsive.
- Peso objetivo: idealmente **< 700 KB**.

## 2. Servicios — iconos/ilustraciones PNG

| Servicio | Archivo |
|---|---|
| Odontología general | `assets/images/services/general.png` |
| Profilaxis / prevención | `assets/images/services/prevention.png` |
| Ortodoncia | `assets/images/services/ortho.png` |
| Estética dental | `assets/images/services/aesthetic.png` |
| Endodoncia | `assets/images/services/endo.png` |
| Implantes y prótesis | `assets/images/services/implant.png` |

- Medida recomendada: **600 × 600 px**.
- Formato: **PNG transparente**.
- Relación: 1:1.
- Diseños simples, con buena silueta y sin fondo rectangular.
- Peso objetivo: **< 150 KB** cada uno.
- El mismo PNG se utiliza como icono frontal y como marca de agua de la tarjeta.

## 3. Noticias y alertas — banners PNG

El carrusel usa una imagen para escritorio y otra para móvil para evitar recortes incorrectos.

| Slide | Escritorio | Móvil |
|---|---|---|
| Promoción | `assets/images/news/promo.png` | `assets/images/news/promo-mobile.png` |
| Evento | `assets/images/news/event.png` | `assets/images/news/event-mobile.png` |
| Fecha especial | `assets/images/news/special.png` | `assets/images/news/special-mobile.png` |

### Escritorio
- **1600 × 720 px**.
- PNG.
- Relación aproximada 20:9.
- Peso objetivo: **< 700 KB**.

### Móvil
- **1080 × 1350 px**.
- PNG.
- Relación 4:5.
- Peso objetivo: **< 600 KB**.

Mantén logos, rostros y textos importantes alejados de los bordes. Si el banner contiene mucho texto, crea una versión específica para móvil en lugar de usar exactamente la misma composición.

## 4. Nuestra identidad — fotografía institucional PNG

| Uso | Archivo | Medida recomendada | Relación |
|---|---|---:|---:|
| Imagen de identidad / experiencia | `assets/images/identity/experiencia-sonrie.png` | **1200 × 1500 px** | 4:5 |

Puede ser una fotografía del equipo, odontólogo con paciente, atención infantil/adulta o un ambiente reconocible de Sonríe Salud.

- Formato: PNG.
- Peso objetivo: idealmente **< 900 KB**.
- Evita colocar texto importante en la parte inferior porque la web agrega una pequeña tarjeta informativa superpuesta.

## 5. Sedes — fotografías PNG

| Sede | Archivo | Medida recomendada |
|---|---|---:|
| Nuevo Chimbote · Sede 1 | `assets/images/clinic-1.png` | **1600 × 900 px** |
| Nuevo Chimbote · Sede 2 | `assets/images/clinic-2.png` | **1600 × 900 px** |

- PNG.
- Relación 16:9.
- Preferible foto horizontal, bien iluminada y nítida.
- Puede ser fachada o ambiente interior reconocible.
- Peso objetivo: **< 900 KB** por fotografía.

## 6. Testimonios — formato de video

Para los videos que vas a probar, usa preferentemente:

- **Contenedor:** MP4 (`.mp4`).
- **Codec de video:** H.264 / AVC.
- **Audio:** AAC.
- **FPS:** 25 o 30.
- **Horizontal:** 1920 × 1080, relación 16:9.
- **Vertical:** 1080 × 1920, relación 9:16; la V5 evita deformarlo y lo muestra con `object-fit: contain`.
- **Bitrate orientativo:** 3–6 Mbps en 1080p.
- **Duración sugerida:** 30–90 segundos.
- **Peso práctico si se alojará directamente en la web:** 10–30 MB por testimonio.

Guarda los archivos, por ejemplo, como:

```text
assets/videos/testimonio-01.mp4
assets/videos/testimonio-02.mp4
assets/videos/testimonio-03.mp4
```

Y en `index.html` usa:

```html
data-video-url="assets/videos/testimonio-01.mp4"
```

La web ya carga el video **solo cuando el usuario presiona Play**, por lo que no descarga todos los testimonios al abrir la página.

### ¿Puedo usar MOV?

Puedes enviarme un `.mov` para trabajar, pero **no recomiendo publicarlo directamente**. Muchos iPhone graban MOV con HEVC/H.265 y la compatibilidad web no es tan uniforme. Para producción conviene convertirlo a MP4 H.264 + AAC.

### ¿Puedo subir 2 o 3 videos para probar?

Sí. Con **2 o 3 videos MP4** podemos probar perfectamente el carrusel. Puedes adjuntarlos tal como los tienes; si vienen en MOV u otro formato, primero revisamos codec, orientación, resolución y peso y luego los dejamos en un formato web compatible.

## 7. Portada de cada testimonio

Antes de reproducir el video se muestra una portada. Puede mantenerse como recurso separado.

- Medida recomendada: **1280 × 720 px**.
- PNG si deseas unificar el flujo de trabajo.
- Relación 16:9.
- Ideal: fotograma limpio del testimonio, con autorización del paciente.

## 8. Logo

`assets/images/logo-sonrie-salud.png`

El logo oficial ya está en PNG transparente y no necesita modificación.

## Resumen rápido

| Sector marcado | Formato | Tamaño |
|---|---|---:|
| Hero | PNG | 1400×1400 |
| Servicios | PNG transparente | 600×600 |
| Noticias desktop | PNG | 1600×720 |
| Noticias móvil | PNG | 1080×1350 |
| Identidad | PNG | 1200×1500 |
| Sedes | PNG | 1600×900 |
| Video horizontal | MP4 H.264/AAC | 1920×1080 |
| Video vertical | MP4 H.264/AAC | 1080×1920 |

## Ajuste V6: imagen Hero y videos locales

### Hero principal
La imagen sigue siendo `assets/images/hero-dental.png`, pero en escritorio el layout le asigna una columna más amplia (hasta aproximadamente 700 px dentro del contenedor). La imagen conserva su proporción original (`height: auto` + `object-fit: contain`), de modo que una futura versión más horizontal no será recortada por CSS.

Si vas a mantener la composición actual, **1400x1400 PNG** funciona bien. Si deseas que el Hero se perciba todavía más ancho, puedes exportarla como **1600x1200 PNG (4:3)**; la V6 respetará esa proporción sin recortarla.

### Testimonios MP4
El HTML V6 ya contiene:

- `assets/videos/testimonio-01.mp4`
- `assets/videos/testimonio-02.mp4`
- `assets/videos/testimonio-03.mp4`

No basta con que el archivo termine en `.mp4`: para máxima compatibilidad web se recomienda **H.264/AVC para video + AAC para audio**.

Si el navegador no puede reproducirlo, la interfaz muestra una advertencia para revisar la ruta o el códec.

Para pruebas locales usa un servidor HTTP (por ejemplo Live Server) en lugar de abrir la página directamente mediante `file://`.
