// ЗАМЕНИТЕ на свой адрес формы с https://formspree.io (бесплатная регистрация,
// создайте форму — сервис выдаст ссылку вида https://formspree.io/f/xxxxxxxx)
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mzezbbjd";

// FAQ accordion
document.querySelectorAll(".faq-item").forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  question.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");

    document.querySelectorAll(".faq-item.open").forEach((openItem) => {
      if (openItem !== item) {
        openItem.classList.remove("open");
        openItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        openItem.querySelector(".faq-answer").style.maxHeight = null;
      }
    });

    if (isOpen) {
      item.classList.remove("open");
      question.setAttribute("aria-expanded", "false");
      answer.style.maxHeight = null;
    } else {
      item.classList.add("open");
      question.setAttribute("aria-expanded", "true");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

// Request form submission
const form = document.getElementById("request-form");
const statusEl = document.getElementById("form-status");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  statusEl.textContent = "";
  statusEl.className = "form-status";

  if (FORMSPREE_ENDPOINT.includes("YOUR_FORM_ID")) {
    statusEl.textContent = "Форма пока не подключена: вставьте свой Formspree ID в script.js";
    statusEl.classList.add("error");
    return;
  }

  const submitButton = form.querySelector("button[type=submit]");
  submitButton.disabled = true;
  submitButton.textContent = "Отправляем...";

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form),
    });

    if (response.ok) {
      statusEl.textContent = "Спасибо! Заявка отправлена, перезвоним в течение 15 минут.";
      statusEl.classList.add("success");
      form.reset();
    } else {
      throw new Error("Request failed");
    }
  } catch (err) {
    statusEl.textContent = "Не удалось отправить заявку. Позвоните нам напрямую по указанному телефону.";
    statusEl.classList.add("error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Вызвать мастера";
  }
});
