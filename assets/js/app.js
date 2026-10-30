(() => {
  "use strict";

  // =============================================================
  // CONFIGURACION RAPIDA - reemplaza estos valores antes de publicar
  // =============================================================
  const WHATSAPP_NUMBER = "51999999999"; // Ejemplo Peru: 51 + 9 digitos, sin + ni espacios
  const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // Deja este placeholder si no usaras GA4 aun

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
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 3200);
  }

  function isWhatsappConfigured() {
    return /^51\d{9}$/.test(WHATSAPP_NUMBER) && WHATSAPP_NUMBER !== "51999999999";
  }

  function openWhatsApp(message, source = "general") {
    if (!isWhatsappConfigured()) {
      showToast("Configura WHATSAPP_NUMBER en assets/js/app.js con el número real de la clínica.");
      return;
    }

    trackEvent("whatsapp_click", {
      source,
      page_location: window.location.href
    });

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function trackEvent(name, params = {}) {
    if (typeof window.gtag === "function") {
      window.gtag("event", name, params);
    }
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
    window.gtag = function gtag(){ window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });
  }

  function setupAnalyticsConsent() {
    if (!cookieBanner) return;
    const analyticsConfigured = /^G-[A-Z0-9]+$/i.test(GA_MEASUREMENT_ID) && GA_MEASUREMENT_ID !== "G-XXXXXXXXXX";
    if (!analyticsConfigured) return;

    const consent = localStorage.getItem("analytics_consent");
    if (consent === "accepted") {
      loadGoogleAnalytics();
      return;
    }
    if (consent === "rejected") return;

    cookieBanner.hidden = false;

    $("#analytics-accept")?.addEventListener("click", () => {
      localStorage.setItem("analytics_consent", "accepted");
      cookieBanner.hidden = true;
      loadGoogleAnalytics();
    });

    $("#analytics-reject")?.addEventListener("click", () => {
      localStorage.setItem("analytics_consent", "rejected");
      cookieBanner.hidden = true;
    });
  }

  // Header / menu movil
  const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 10);
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

  // Animaciones al entrar al viewport
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reducedMotion && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    $$(".reveal").forEach((element) => revealObserver.observe(element));
  } else {
    $$(".reveal").forEach((element) => element.classList.add("visible"));
  }

  // Resalta la seccion activa del menu
  if ("IntersectionObserver" in window) {
    const sections = $$("main section[id]");
    const navLinks = $$(".main-nav a[href^='#']");
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
      });
    }, { rootMargin: "-35% 0px -55%", threshold: 0.01 });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  // Botones de WhatsApp por servicio
  $$(".js-whatsapp-service").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const service = link.dataset.service || "Información general";
      const message = [
        "Hola, vengo desde la página web de la clínica.",
        `Me gustaría recibir información sobre: ${service}.`,
        "¿Podrían orientarme, por favor?"
      ].join("\n");
      openWhatsApp(message, `service_${service.toLowerCase().replace(/\s+/g, "_")}`);
    });
  });

  // Formulario de reserva -> WhatsApp
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
      "Hola, deseo solicitar una cita odontológica.",
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

    trackEvent("generate_lead", {
      lead_source: "booking_form",
      service,
      location
    });

    openWhatsApp(messageLines.join("\n"), "booking_form");
  });

  // Redes y Maps
  $$(".js-social").forEach((link) => {
    link.addEventListener("click", () => trackEvent("social_click", { network: link.dataset.network || "unknown" }));
  });
  $$(".js-map-link").forEach((link) => {
    link.addEventListener("click", () => trackEvent("map_click", { destination: link.href }));
  });

  // Videos de muestra aun no configurados
  $$(".video-play").forEach((button, index) => {
    button.addEventListener("click", () => {
      showToast("Este bloque está listo para insertar el video testimonial real.");
      trackEvent("testimonial_placeholder_click", { position: index + 1 });
    });
  });

  // Evita seleccionar fechas pasadas
  const dateInput = bookingForm?.querySelector('input[name="date"]');
  if (dateInput) {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const localDate = new Date(today.getTime() - offset * 60000).toISOString().split("T")[0];
    dateInput.min = localDate;
  }

  $("#year").textContent = new Date().getFullYear();
  setupAnalyticsConsent();
})();
