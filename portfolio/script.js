/* ════════════════════════════════════════════════════
   PORTAFOLIO — script.js
   Galería interactiva con transiciones cinematográficas
   ════════════════════════════════════════════════════ */

// ──────────────────────────────────────────────────────
// 1. DATOS DE TUS FOTOS
//    → Agrega o quita entradas aquí.
//    → "src" debe coincidir exactamente con el nombre
//      de tu archivo dentro de la carpeta /fotos/
// ──────────────────────────────────────────────────────
const photos = [
  {
    src:   "fotos/foto-01.jpg",
    title: "Luz de la tarde",
    desc:  "Buenos Aires, 2024"
  },
  {
    src:   "fotos/foto-02.jpg",
    title: "Retrato urbano",
    desc:  "Ciudad de México, 2024"
  },
  {
    src:   "fotos/foto-03.jpg",
    title: "Silencio",
    desc:  "Patagonia, 2023"
  },
  {
    src:   "fotos/foto-04.jpg",
    title: "El umbral",
    desc:  "Barcelona, 2023"
  },
  {
    src:   "fotos/foto-05.jpg",
    title: "Contraluz",
    desc:  "Lisboa, 2022"
  },
  // ← AGREGA MÁS FOTOS AQUÍ con el mismo formato:
  // { src: "fotos/foto-06.jpg", title: "Tu título", desc: "Lugar, Año" },
];


// ──────────────────────────────────────────────────────
// 2. ESTADO INTERNO
// ──────────────────────────────────────────────────────
let current    = 0;           // índice de la foto activa
let isAnimating = false;      // bloquea clicks durante animación
const DURATION = 650;         // debe coincidir con --dur-slow en CSS (ms)


// ──────────────────────────────────────────────────────
// 3. REFERENCIAS AL DOM
// ──────────────────────────────────────────────────────
const viewer       = document.getElementById("viewer");
const overlay      = document.getElementById("overlay");
const prevBtn      = document.getElementById("prevBtn");
const nextBtn      = document.getElementById("nextBtn");
const counterEl    = document.getElementById("counter");
const titleEl      = document.getElementById("photoTitle");
const descEl       = document.getElementById("photoDesc");
const progressFill = document.getElementById("progressFill");
const thumbsWrap   = document.getElementById("thumbnails");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const menuToggle   = document.querySelector(".menu-toggle");
const mobileNav    = document.getElementById("mobileNav");


// ──────────────────────────────────────────────────────
// 4. INICIALIZACIÓN: construir slides y miniaturas
// ──────────────────────────────────────────────────────
function init() {
  // Limpiar el viewer (elimina los slides puestos a mano en el HTML)
  viewer.innerHTML = "";
  thumbsWrap.innerHTML = "";

  photos.forEach((photo, i) => {
    // — Slide —
    const slide = document.createElement("div");
    slide.className = "slide" + (i === 0 ? " active" : "");
    slide.id = `slide-${i}`;

    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.title;
    img.loading = i === 0 ? "eager" : "lazy";

    slide.appendChild(img);
    viewer.appendChild(slide);

    // — Miniatura —
    const thumb = document.createElement("div");
    thumb.className = "thumb" + (i === 0 ? " active" : "");
    thumb.dataset.index = i;

    const tImg = document.createElement("img");
    tImg.src = photo.src;
    tImg.alt = photo.title;
    tImg.loading = "lazy";

    thumb.appendChild(tImg);
    thumbsWrap.appendChild(thumb);

    // Click en miniatura
    thumb.addEventListener("click", () => {
      if (i !== current && !isAnimating) goTo(i);
    });
  });

  updateMeta();
  updateProgress();
}


// ──────────────────────────────────────────────────────
// 5. FUNCIÓN PRINCIPAL DE TRANSICIÓN
//    dir: "next" | "prev"
// ──────────────────────────────────────────────────────
function goTo(targetIndex, direction) {
  if (isAnimating || targetIndex === current) return;
  isAnimating = true;

  // Determinar dirección si no se pasó explícitamente
  if (!direction) {
    direction = targetIndex > current ? "next" : "prev";
  }

  const oldSlide = document.getElementById(`slide-${current}`);
  const newSlide = document.getElementById(`slide-${targetIndex}`);

  // Clase de salida para el slide actual
  const exitClass  = direction === "next" ? "exit-left"   : "exit-right";
  // Posición inicial del slide entrante
  const enterClass = direction === "next" ? "enter-right" : "enter-left";

  // 1) Preparar el slide nuevo fuera de vista
  newSlide.classList.add(enterClass);
  newSlide.classList.remove("active", "exit-left", "exit-right");

  // Breve flash del overlay (da la sensación de corte cinematográfico)
  overlay.classList.add("flash");
  setTimeout(() => overlay.classList.remove("flash"), 160);

  // 2) Forzar reflow para que la clase inicial se registre
  void newSlide.offsetWidth;

  // 3) Animación simultánea: sale el viejo, entra el nuevo
  requestAnimationFrame(() => {
    oldSlide.classList.add(exitClass);
    oldSlide.classList.remove("active");

    newSlide.classList.remove(enterClass);
    newSlide.classList.add("active");
  });

  // 4) Limpiar clases al terminar
  setTimeout(() => {
    oldSlide.classList.remove("exit-left", "exit-right", "active");
    isAnimating = false;
  }, DURATION);

  // 5) Actualizar estado
  current = targetIndex;
  updateMeta();
  updateProgress();
  updateThumbs();
}

function goNext() {
  const next = (current + 1) % photos.length;
  goTo(next, "next");
}

function goPrev() {
  const prev = (current - 1 + photos.length) % photos.length;
  goTo(prev, "prev");
}


// ──────────────────────────────────────────────────────
// 6. ACTUALIZAR UI
// ──────────────────────────────────────────────────────
function updateMeta() {
  const p = photos[current];

  // Fade rápido del texto
  titleEl.style.opacity = "0";
  descEl.style.opacity  = "0";

  setTimeout(() => {
    titleEl.textContent = p.title || "";
    descEl.textContent  = p.desc  || "";

    const total   = String(photos.length).padStart(2, "0");
    const current2 = String(current + 1).padStart(2, "0");
    counterEl.textContent = `${current2} / ${total}`;

    titleEl.style.opacity = "1";
    descEl.style.opacity  = "1";
  }, 120);

  // Transición en el texto
  titleEl.style.transition = "opacity 200ms ease";
  descEl.style.transition  = "opacity 200ms ease";
}

function updateProgress() {
  const pct = ((current + 1) / photos.length) * 100;
  progressFill.style.width = pct + "%";
}

function updateThumbs() {
  document.querySelectorAll(".thumb").forEach((t, i) => {
    t.classList.toggle("active", i === current);
  });
  // Scroll suave en la barra de miniaturas
  const activThumb = thumbsWrap.querySelector(".thumb.active");
  if (activThumb) {
    activThumb.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }
}


// ──────────────────────────────────────────────────────
// 7. EVENTOS
// ──────────────────────────────────────────────────────

// Botones siguiente / anterior
nextBtn.addEventListener("click", goNext);
prevBtn.addEventListener("click", goPrev);

// Teclado: ← →
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") goNext();
  if (e.key === "ArrowLeft")  goPrev();
});

// Swipe táctil
let touchStartX = 0;
let touchStartY = 0;

viewer.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].clientX;
  touchStartY = e.changedTouches[0].clientY;
}, { passive: true });

viewer.addEventListener("touchend", (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;

  // Solo si el gesto es más horizontal que vertical
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
    dx < 0 ? goNext() : goPrev();
  }
}, { passive: true });

// Pantalla completa
fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    viewer.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen();
  }
});

// Menú mobile
menuToggle.addEventListener("click", () => {
  mobileNav.classList.toggle("open");
  const isOpen = mobileNav.classList.contains("open");
  document.body.style.overflow = isOpen ? "hidden" : "";
});

document.querySelectorAll(".mobile-nav-link").forEach(link => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    document.body.style.overflow = "";
  });
});

// Header scrolled
window.addEventListener("scroll", () => {
  document.querySelector(".site-header").classList.toggle("scrolled", window.scrollY > 30);
}, { passive: true });

// Año en footer
document.getElementById("year").textContent = new Date().getFullYear();


// ──────────────────────────────────────────────────────
// 8. ANIMACIONES DE SCROLL (fade-in-up)
// ──────────────────────────────────────────────────────
function initScrollAnimations() {
  const targets = document.querySelectorAll(
    ".about-heading, .about-body, .cta-link, .about-image, .contact-heading, .contact-item, .section-eyebrow"
  );
  targets.forEach(el => el.classList.add("fade-in-up"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Delay escalonado por índice
          const delay = Array.from(entry.target.parentElement.children)
            .indexOf(entry.target) * 80;
          setTimeout(() => entry.target.classList.add("visible"), delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach(el => observer.observe(el));
}


// ──────────────────────────────────────────────────────
// 9. ARRANQUE
// ──────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  init();
  initScrollAnimations();
});
