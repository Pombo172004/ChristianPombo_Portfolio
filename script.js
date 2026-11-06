const body = document.body;
const themeToggle = document.querySelector(".theme-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".desktop-nav");
const busbookSlides = document.querySelectorAll(".busbook-slide");
const busbookDots = document.querySelectorAll(".busbook-dot");
const clausysSlides = document.querySelectorAll(".clausys-slide");
const clausysDots = document.querySelectorAll(".clausys-dot");
const acadclearSlides = document.querySelectorAll(".acadclear-slide");
const acadclearDots = document.querySelectorAll(".acadclear-dot");
const aewsSlides = document.querySelectorAll(".aews-slide");
const aewsDots = document.querySelectorAll(".aews-dot");
const rensIceCreamSlides = document.querySelectorAll(".rens-ice-cream-slide");
const rensIceCreamDots = document.querySelectorAll(".rens-ice-cream-dot");
const certificateButtons = document.querySelectorAll(".certificate-image-button");
const certificateLightbox = document.querySelector(".certificate-lightbox");
const certificateLightboxImage = document.querySelector(".certificate-lightbox-image");
const certificateLightboxClose = document.querySelector(".certificate-lightbox-close");

document.querySelectorAll(".section, .project-card, .intro-strip").forEach((element) => {
  element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    themeToggle.setAttribute("aria-label", body.classList.contains("dark") ? "Switch to light mode" : "Switch to dark mode");
  });
}

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.querySelector("span").textContent = isOpen ? "×" : "☰";
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.querySelector("span").textContent = "☰";
  });
});

const initializeSlideshow = (slides, dots) => {
  if (slides.length <= 1 || slides.length !== dots.length) {
    return;
  }

  let currentSlide = 0;
  window.setInterval(() => {
    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }, 3500);
};

initializeSlideshow(busbookSlides, busbookDots);
initializeSlideshow(clausysSlides, clausysDots);
initializeSlideshow(acadclearSlides, acadclearDots);
initializeSlideshow(aewsSlides, aewsDots);
initializeSlideshow(rensIceCreamSlides, rensIceCreamDots);

const closeCertificateLightbox = () => {
  certificateLightbox.hidden = true;
  certificateLightboxImage.src = "";
  document.body.style.overflow = "";
};

certificateButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    certificateLightboxImage.src = button.dataset.certificate;
    certificateLightboxImage.alt = image.alt;
    certificateLightbox.hidden = false;
    document.body.style.overflow = "hidden";
    certificateLightboxClose.focus();
  });
});

certificateLightboxClose.addEventListener("click", closeCertificateLightbox);
certificateLightbox.addEventListener("click", (event) => {
  if (event.target === certificateLightbox) {
    closeCertificateLightbox();
  }
});
document.querySelectorAll(".certificate-image-button, .certificate-lightbox-image").forEach((image) => {
  image.addEventListener("contextmenu", (event) => event.preventDefault());
  image.addEventListener("dragstart", (event) => event.preventDefault());
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !certificateLightbox.hidden) {
    closeCertificateLightbox();
  }
});
