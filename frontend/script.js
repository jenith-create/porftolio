const API_URL = "https://porftolio-mk8b.onrender.com/contact";

const form = document.getElementById("contactForm");
const statusEl = document.getElementById("status");
const sendBtn = document.getElementById("sendBtn");

function setStatus(text, type) {
  statusEl.textContent = text;
  statusEl.className = type || "";
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  sendBtn.disabled = true;
  setStatus("Sending... the server may take up to a minute to wake up.", "");

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message })
    });

    const data = await response.json();

    if (data.success) {
      setStatus("Message sent successfully. Thank you!", "ok");
      form.reset();
    } else {
      setStatus("Failed to send message. Please try again.", "err");
    }
  } catch (error) {
    setStatus("Server error. Please try again in a moment.", "err");
    console.log(error);
  } finally {
    sendBtn.disabled = false;
  }
});