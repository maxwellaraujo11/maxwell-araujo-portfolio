/* =========================
RESET SCROLL ON LOAD
========================= */

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
  window.scrollTo({
    top: 0,
    behavior: "instant",
  });
});

window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");

  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// area de vortice-------------------------------------------------------------------------------------------
const vorticePhotos = [
  "./images/choreographer/04.jpeg",

  "./images/choreographer/02.jpeg",

  "./images/choreographer/03.jpeg",

  "./images/choreographer/01.jpeg",
];

let currentVortice = 0;

setInterval(() => {
  const image = document.getElementById("vortice-photo");

  if (!image) return;

  image.style.opacity = 0;

  setTimeout(() => {
    currentVortice++;

    if (currentVortice >= vorticePhotos.length) {
      currentVortice = 0;
    }

    image.src = vorticePhotos[currentVortice];

    image.style.opacity = 1;
  }, 300);
}, 5000);

// AMBURGER MENU ----------------------------------------------------
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

/* =========================
SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
  ".section-title, .section-subtitle, .about-image, .about-text, .timeline-block, .professional-card, .award-card, .featured-work-image, .featured-work-text, .contact-links, .international-image, .international-text",
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15,
  },
);

revealElements.forEach((el) => {
  el.classList.add("hidden");
  revealObserver.observe(el);
});

/* =========================
COUNTER ANIMATION
========================= */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.dataset.target;

        let count = 0;
        const speed = target / 120;

        const updateCounter = () => {
          if (count < target) {
            count += speed;
            counter.innerText = Math.ceil(count);
            requestAnimationFrame(updateCounter);
          } else {
            counter.innerText = target + "+";
          }
        };

        updateCounter();
        counterObserver.unobserve(counter);
      }
    });
  },
  {
    threshold: 0.15,
  },
);

counters.forEach((counter) => {
  counterObserver.observe(counter);
});

/* =========================
HERO DYNAMIC OVERLAY
========================= */

const heroOverlay = document.querySelector(".hero-overlay");

window.addEventListener("scroll", () => {
  if (!heroOverlay) return;

  const scrollY = window.scrollY;

  const opacity = Math.max(0.35, 0.85 - scrollY * 0.0015);

  heroOverlay.style.background = `
    linear-gradient(
      to right,
      rgba(0, 0, 0, ${opacity}),
      rgba(0, 0, 0, ${opacity * 0.65})
    )
  `;
});

// --- HERO PARALLAX UNIFICADO

const hero = document.querySelector(".hero");

let scrollOffset = 0;
let mouseOffsetX = 0;

function updateHeroParallax() {
  if (!hero) return;

  hero.style.backgroundPosition = `
    calc(50% + ${mouseOffsetX}px)
    ${scrollOffset}px
  `;
}

window.addEventListener("scroll", () => {
  scrollOffset = window.scrollY * 0.35;
  updateHeroParallax();
});

hero.addEventListener("mousemove", (e) => {
  const heroRect = hero.getBoundingClientRect();

  const x = e.clientX - heroRect.left;
  const centerX = heroRect.width / 2;

  mouseOffsetX = (centerX - x) * 0.08;

  updateHeroParallax();
});

hero.addEventListener("mouseleave", () => {
  mouseOffsetX = 0;
  updateHeroParallax();
});

/* =========================
INTERNATIONAL IMAGE CROSSFADE
========================= */

const internationalPhoto = document.getElementById("international-photo");

const internationalImages = [
  "./images/international/01.jpeg",
  "./images/international/02.jpeg",
  "./images/international/03.jpeg",
  "./images/international/04.jpeg",
];

let currentInternationalIndex = 0;

setInterval(() => {
  if (!internationalPhoto) return;

  internationalPhoto.classList.add("fade-out");

  setTimeout(() => {
    currentInternationalIndex =
      (currentInternationalIndex + 1) % internationalImages.length;

    const newImage = new Image();
    newImage.src = internationalImages[currentInternationalIndex];

    newImage.onload = () => {
      internationalPhoto.src = newImage.src;
      internationalPhoto.classList.remove("fade-out");
    };
  }, 1000);
}, 3000);

/* =========================
MAGNETIC BUTTONS
========================= */

const magneticButtons = document.querySelectorAll(".magnetic");

magneticButtons.forEach((button) => {
  button.addEventListener("mousemove", (e) => {
    const rect = button.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "translate(0, 0)";
  });
});

/* =========================
HERO LETTER REVEAL
========================= */

const heroTitle = document.getElementById("hero-title");

if (heroTitle) {
  const text = heroTitle.textContent;
  heroTitle.innerHTML = "";

  [...text].forEach((letter, index) => {
    const span = document.createElement("span");

    span.textContent = letter === " " ? "\u00A0" : letter;
    span.style.animationDelay = `${index * 0.08}s`;

    heroTitle.appendChild(span);
  });
}

/* =========================
IMAGE TILT EFFECT
========================= */

const tiltImages = document.querySelectorAll(
  ".about-image img, .international-image img, .featured-work-image img",
);

tiltImages.forEach((image) => {
  image.addEventListener("mousemove", (e) => {
    const rect = image.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    image.style.transform = `
      scale(1.05)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;
  });

  image.addEventListener("mouseleave", () => {
    image.style.transform = "scale(1)";
  });
});

/* =========================
ACTIVE MENU ON SCROLL
========================= */

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 180;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
