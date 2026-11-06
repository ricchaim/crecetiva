// Set this to the address that should receive project inquiries when it is available.
const contactEmail = "";

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