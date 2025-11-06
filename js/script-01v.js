// --- MATRIX ANIMATION ---
const canvas = document.getElementById("matrix-bg");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const symbols = "アカサタナハマヤラワ0123456789零神勇技愛";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array.from({ length: columns }).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#8b5cf6";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = symbols.charAt(Math.floor(Math.random() * symbols.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
setInterval(drawMatrix, 50);

window.addEventListener("resize", () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});

// --- THEME SWITCHER ---
const toggle = document.getElementById("theme-toggle");
const body = document.body;

body.classList.add("dark");

toggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  body.classList.toggle("light");
});
