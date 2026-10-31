(() => {
  "use strict";

  // =============================================================
  // CONFIGURACION RAPIDA - reemplaza estos valores antes de publicar
  // =============================================================
  const WHATSAPP_NUMBER = "51999999999"; // Peru: 51 + 9 digitos, sin + ni espacios
  const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // Reemplazar cuando se configure GA4

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const header = $(".site-header");
  const menuButton = $(".menu-toggle");
  const menu = $(".main-nav");
  const toast = $("#toast");
  const bookingForm = $("#booking-form");
  const cookieBanner = $("#cookie-banner");

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 3400);
  }

  function trackEvent(name, params = {}) {
    if (typeof window.gtag === "function") window.gtag("event", name, params);
  }

  function slugify(value) {
    return String(value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_|_$/g, "");
  }

  function isWhatsappConfigured() {
    return /^51\d{9}$/.test(WHATSAPP_NUMBER) && WHATSAPP_NUMBER !== "51999999999";
  }

  function openWhatsApp(message, source = "general") {
    if (!isWhatsappConfigured()) {
      showToast("Configura WHATSAPP_NUMBER en assets/js/app.js con el número real de Sonríe Salud.");
      return;
    }

    trackEvent("whatsapp_click", { source, page_location: window.location.href });
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function loadGoogleAnalytics() {
    if (!/^G-[A-Z0-9]+$/i.test(GA_MEASUREMENT_ID) || GA_MEASUREMENT_ID === "G-XXXXXXXXXX") return;
    if ($(`script[data-ga4="${GA_MEASUREMENT_ID}"]`)) return;

    const externalScript = document.createElement("script");
    externalScript.async = true;
    externalScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    externalScript.dataset.ga4 = GA_MEASUREMENT_ID;
    document.head.appendChild(externalScript);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });
  }

  function setupAnalyticsConsent() {
    if (!cookieBanner) return;
    const analyticsConfigured = /^G-[A-Z0-9]+$/i.test(GA_MEASUREMENT_ID) && GA_MEASUREMENT_ID !== "G-XXXXXXXXXX";
    if (!analyticsConfigured) return;

    let consent = null;
    try { consent = localStorage.getItem("analytics_consent"); } catch (_) { /* no-op */ }

    if (consent === "accepted") {
      loadGoogleAnalytics();
      return;
    }
    if (consent === "rejected") return;

    cookieBanner.hidden = false;

    $("#analytics-accept")?.addEventListener("click", () => {
      try { localStorage.setItem("analytics_consent", "accepted"); } catch (_) { /* no-op */ }
      cookieBanner.hidden = true;
      loadGoogleAnalytics();
    });

    $("#analytics-reject")?.addEventListener("click", () => {
      try { localStorage.setItem("analytics_consent", "rejected"); } catch (_) { /* no-op */ }
      cookieBanner.hidden = true;
    });
  }

  // Header y navegación móvil
  const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 8);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  menuButton?.addEventListener("click", () => {
    const isOpen = menu?.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(Boolean(isOpen)));
    document.body.classList.toggle("menu-open", Boolean(isOpen));
  });

  $$(".main-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      menu?.classList.remove("open");
      document.body.classList.remove("menu-open");
      menuButton?.setAttribute("aria-expanded", "false");
    });
  });

  // Animaciones suaves al entrar al viewport
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reducedMotion && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    $$(".reveal").forEach((element) => revealObserver.observe(element));
  } else {
    $$(".reveal").forEach((element) => element.classList.add("visible"));
  }

  // Sección activa del menú
  if ("IntersectionObserver" in window) {
    const sections = $$("main section[id]");
    const navLinks = $$(".main-nav a[href^='#']");
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: "-35% 0px -55%", threshold: 0.01 });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  // WhatsApp por servicio
  $$(".js-whatsapp-service").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const service = link.dataset.service || "Información general";
      const message = [
        "Hola, vengo desde la página web de Sonríe Salud.",
        `Me gustaría recibir información sobre: ${service}.`,
        "¿Podrían orientarme, por favor?"
      ].join("\n");
      openWhatsApp(message, `service_${slugify(service)}`);
    });
  });

  // Reserva -> WhatsApp
  bookingForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!bookingForm.reportValidity()) return;

    const formData = new FormData(bookingForm);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const service = String(formData.get("service") || "").trim();
    const location = String(formData.get("location") || "").trim();
    const date = String(formData.get("date") || "").trim();
    const time = String(formData.get("time") || "").trim();
    const notes = String(formData.get("notes") || "").trim();

    const messageLines = [
      "Hola, deseo solicitar una cita odontológica en Sonríe Salud.",
      "",
      `Nombre: ${name}`,
      `Teléfono: ${phone}`,
      `Servicio: ${service}`,
      `Sede: ${location}`,
      `Fecha preferida: ${date}`,
      `Horario preferido: ${time}`
    ];

    if (notes) messageLines.push(`Comentario: ${notes}`);
    messageLines.push("", "Entiendo que la fecha y hora deben ser confirmadas por la clínica.");

    trackEvent("generate_lead", { lead_source: "booking_form", service, location });
    openWhatsApp(messageLines.join("\n"), "booking_form");
  });

  // Redes, mapas y noticias
  $$(".js-social").forEach((link) => {
    link.addEventListener("click", () => trackEvent("social_click", { network: link.dataset.network || "unknown" }));
  });
  $$(".js-map-link").forEach((link) => {
    link.addEventListener("click", () => trackEvent("map_click", { destination: link.href }));
  });
  $$(".news-card > a").forEach((link, index) => {
    link.addEventListener("click", () => trackEvent("news_click", { position: index + 1 }));
  });

  // Carrusel de testimonios: manual, accesible y sin autoplay.
  $$("[data-carousel]").forEach((carousel) => {
    const track = $(".carousel-track", carousel);
    const slides = $$(".testimonial-slide", carousel);
    const prev = $(".carousel-prev", carousel);
    const next = $(".carousel-next", carousel);
    const dotsContainer = $(".carousel-dots", carousel);
    const status = $(".carousel-status", carousel);
    if (!track || slides.length === 0) return;

    let current = 0;
    let pointerStartX = null;

    const dots = slides.map((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot";
      dot.setAttribute("aria-label", `Ir al testimonio ${index + 1}`);
      dot.addEventListener("click", () => goTo(index, "dot"));
      dotsContainer?.appendChild(dot);
      return dot;
    });

    function goTo(index, source = "control") {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;

      slides.forEach((slide, slideIndex) => {
        const active = slideIndex === current;
        slide.setAttribute("aria-hidden", String(!active));
        $(".video-play", slide)?.setAttribute("tabindex", active ? "0" : "-1");
      });

      dots.forEach((dot, dotIndex) => dot.setAttribute("aria-current", String(dotIndex === current)));
      if (status) status.textContent = `${current + 1} / ${slides.length}`;
      trackEvent("testimonial_slide", { position: current + 1, source });
    }

    prev?.addEventListener("click", () => goTo(current - 1, "previous"));
    next?.addEventListener("click", () => goTo(current + 1, "next"));

    carousel.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") { event.preventDefault(); goTo(current - 1, "keyboard"); }
      if (event.key === "ArrowRight") { event.preventDefault(); goTo(current + 1, "keyboard"); }
    });

    carousel.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse") return;
      pointerStartX = event.clientX;
    }, { passive: true });

    carousel.addEventListener("pointerup", (event) => {
      if (pointerStartX === null) return;
      const distance = event.clientX - pointerStartX;
      pointerStartX = null;
      if (Math.abs(distance) < 48) return;
      goTo(current + (distance < 0 ? 1 : -1), "swipe");
    }, { passive: true });

    goTo(0, "initial");
  });

  // Carga el video únicamente después del clic. Mantiene la carga inicial liviana.
  $$(".video-play").forEach((button, index) => {
    button.addEventListener("click", () => {
      const url = String(button.dataset.videoUrl || "").trim();
      if (!url) {
        showToast("Este testimonio está listo: agrega la URL de inserción en data-video-url dentro de index.html.");
        trackEvent("testimonial_placeholder_click", { position: index + 1 });
        return;
      }

      const media = button.closest(".testimonial-media");
      if (!media) return;

      if (/\.(mp4|webm)(\?.*)?$/i.test(url)) {
        const video = document.createElement("video");
        video.src = url;
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        video.preload = "metadata";
        media.replaceChildren(video);
      } else if (/^(https:\/\/)?(www\.)?(youtube\.com\/embed\/|player\.vimeo\.com\/video\/)/i.test(url)) {
        const iframe = document.createElement("iframe");
        iframe.src = url;
        iframe.title = `Testimonio de paciente ${index + 1}`;
        iframe.loading = "lazy";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        iframe.allowFullscreen = true;
        media.replaceChildren(iframe);
      } else {
        showToast("Usa una URL embed de YouTube/Vimeo o un archivo .mp4/.webm para este testimonio.");
        return;
      }

      trackEvent("testimonial_play", { position: index + 1 });
    });
  });

  // Evita seleccionar fechas pasadas
  const dateInput = bookingForm?.querySelector('input[name="date"]');
  if (dateInput) {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    dateInput.min = new Date(today.getTime() - offset * 60000).toISOString().split("T")[0];
  }

  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
  setupAnalyticsConsent();
})();
