// Set this to the address that should receive project inquiries when it is available.
const contactEmail = "";

const revealTargets = document.querySelectorAll(
  ".hero-copy > *, .section-heading, .promo-banner, .service-card, .project-card, .ad-card, .approach-art, .approach-copy, .step, .contact-panel"
);

if ("IntersectionObserver" in window && revealTargets.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  revealTargets.forEach((element) => {
    const siblings = element.parentElement ? [...element.parentElement.children] : [];
    element.style.setProperty("--reveal-delay", `${Math.min(siblings.indexOf(element), 5) * 90}ms`);
    element.classList.add("reveal");
    observer.observe(element);
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const form = document.querySelector("#contact-form");
const notice = document.querySelector("#contact-notice");

if (form && notice && contactEmail) {
  form.hidden = false;
  notice.textContent = "Completa estos datos para preparar un correo con los detalles de tu proyecto.";

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent("Nuevo proyecto para Crecetiva");
    const body = encodeURIComponent(
      `Hola, soy ${data.get("name")}.\n\nMi correo: ${data.get("email")}\n\nSobre mi proyecto:\n${data.get("project")}`
    );
    window.location.href = `mailto:${encodeURIComponent(contactEmail)}?subject=${subject}&body=${body}`;
  });
}