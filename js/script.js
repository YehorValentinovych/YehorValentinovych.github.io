/* ---------------------- ТЕКСТ и ГОД ---------------------- */
const texts = [
  "Web Design",
  "Website Creating",
  "E-commerce",
  "Digital Zen",
  "Website under construction — coming soon"
];
let textIndex = 0;
const textEl = document.getElementById("changing-text");

setInterval(() => {
  textIndex = (textIndex + 1) % texts.length;
  textEl.style.opacity = 0;
  setTimeout(() => {
    textEl.textContent = texts[textIndex];
    textEl.style.opacity = 1;
  }, 400);
}, 4000);

document.getElementById("year").textContent = new Date().getFullYear();

/* ---------------------- ТЕМА ---------------------- */
const toggle = document.getElementById("theme-toggle");
toggle.addEventListener("change", e => {
  document.body.classList.toggle("light", e.target.checked);
});

/* ---------------------- CANVAS ---------------------- */
const matrixCanvas = document.getElementById("matrix-canvas");
const bubblesCanvas = document.getElementById("bubbles-canvas");

const ctxM = matrixCanvas.getContext("2d");
const ctxB = bubblesCanvas.getContext("2d");

matrixCanvas.width = bubblesCanvas.width = innerWidth;
matrixCanvas.height = bubblesCanvas.height = innerHeight;

/* ---------------------- MATRIX ---------------------- */
const symbols = "०१२३४५६७८९ अआइईउऊऋॠएऐओऔ कखगघङ चछजझञ टठडढण त थ द ध न प फ ब भ म य र ल व श ष स ह 0 1 7 8 4 2 3 5 9 6";
const fontSize = 16;
const columns = Math.floor(matrixCanvas.width / fontSize);
const drops = Array(columns).fill(1);
let fallSpeed = 0.6;
let time = 0;

let pulseTime = 0;

/* ---------------------- MATRIX ---------------------- */
function drawMatrix() {
  const isLight = document.body.classList.contains("light");

  // фоновый градиент
  const bgGradient = ctxM.createRadialGradient(
    matrixCanvas.width / 2,
    matrixCanvas.height / 2,
    200,
    matrixCanvas.width / 2,
    matrixCanvas.height / 2,
    matrixCanvas.width / 1.1
  );

  if (isLight) {
    bgGradient.addColorStop(0, "rgba(250, 250, 255, 0.95)");
    bgGradient.addColorStop(0.4, "rgba(240, 245, 255, 0.9)");
    bgGradient.addColorStop(1, "rgba(225, 235, 255, 1)");
  } else {
    bgGradient.addColorStop(0, "rgba(15, 0, 35, 0.35)");
    bgGradient.addColorStop(0.4, "rgba(10, 5, 25, 0.75)");
    bgGradient.addColorStop(1, "rgba(0, 0, 0, 0.95)");
  }

  ctxM.fillStyle = bgGradient;
  ctxM.globalAlpha = 0.6;
  ctxM.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
  ctxM.globalAlpha = 1;

  ctxM.font = `${fontSize}px monospace`;
  ctxM.textBaseline = "top";
  ctxM.imageSmoothingEnabled = false;

  // создаём массив символов для каждой колонки (если нет)
  if (!drawMatrix.columns) {
    drawMatrix.columns = Array.from({ length: columns }, () => ({
      y: Math.random() * -1000,
      chars: Array.from({ length: 20 }, () => symbols[Math.floor(Math.random() * symbols.length)])
    }));
  }

  for (let i = 0; i < drawMatrix.columns.length; i++) {
    const column = drawMatrix.columns[i];
    const baseX = i * fontSize;

    // ведущий символ
    const headChar = symbols[Math.floor(Math.random() * symbols.length)];
    column.chars.unshift(headChar);
    if (column.chars.length > 20) column.chars.pop();

    for (let j = 0; j < column.chars.length; j++) {
      const ch = column.chars[j];
      const y = column.y + j * fontSize;
      if (y < -fontSize || y > matrixCanvas.height) continue;

      const fade = 1 - j / column.chars.length;
      let color;

      if (isLight) {
        color =
          j === 0
            ? "rgba(140, 0, 255, 0.9)"
            : `rgba(${120 - 40 * fade}, ${60 + 140 * fade}, ${255 - 50 * fade}, ${fade * 0.9})`;
      } else {
        color =
          j === 0
            ? "rgba(180,160,255,0.95)"
            : `rgba(${100 - 40 * fade}, ${80 + 140 * fade}, ${255 - 80 * fade}, ${fade * 0.8})`;
      }

      ctxM.fillStyle = color;
      ctxM.fillText(ch, baseX, y);
    }

    column.y += fontSize * 0.4;
    if (column.y > matrixCanvas.height + 40 * fontSize) {
      // column.y = Math.random() * -1000;
      column.y = Math.random() * -matrixCanvas.height * 2;

    }
  }

  drawEnergyPulse();
}

/* ---------------------- ПУЛЬС ЭНЕРГИИ ---------------------- */
function drawEnergyPulse() {
  pulseTime += 0.02;

  const pulseRadius = 260 + Math.sin(pulseTime * 1.3) * 25;
  const pulseAlpha = 0.18 + Math.sin(pulseTime * 1.2) * 0.06;

  // Основное мягкое свечение
  const grad = ctxM.createRadialGradient(
    matrixCanvas.width / 2,
    matrixCanvas.height / 2,
    0,
    matrixCanvas.width / 2,
    matrixCanvas.height / 2,
    pulseRadius
  );

  grad.addColorStop(0, `rgba(124, 58, 237, ${pulseAlpha + 0.08})`);
  grad.addColorStop(0.6, `rgba(124, 58, 237, ${pulseAlpha * 0.25})`);
  grad.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctxM.globalCompositeOperation = "lighter";
  ctxM.fillStyle = grad;
  ctxM.beginPath();
  ctxM.arc(matrixCanvas.width / 2, matrixCanvas.height / 2, pulseRadius, 0, Math.PI * 2);
  ctxM.fill();

  // Едва заметные слои материи (микроволны)
  for (let i = 0; i < 3; i++) {
    const waveRadius = pulseRadius + i * 120 + Math.sin(pulseTime * 1.5 + i) * 15;
    const waveAlpha = 0.025 - i * 0.006;

    const waveGrad = ctxM.createRadialGradient(
      matrixCanvas.width / 2,
      matrixCanvas.height / 2,
      waveRadius - 40,
      matrixCanvas.width / 2,
      matrixCanvas.height / 2,
      waveRadius + 40
    );
    waveGrad.addColorStop(0, "rgba(0,0,0,0)");
    waveGrad.addColorStop(0.5, `rgba(160,120,255,${waveAlpha})`);
    waveGrad.addColorStop(1, "rgba(0,0,0,0)");

    ctxM.fillStyle = waveGrad;
    ctxM.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
  }

  ctxM.globalCompositeOperation = "source-over";
}

/* ---------------------- BUBBLES ---------------------- */
const particles = Array.from({ length: 35 }, () => ({
  x: Math.random() * bubblesCanvas.width,
  y: Math.random() * bubblesCanvas.height,
  r: Math.random() * 4 + 1,
  dx: (Math.random() - 0.5) * 0.3,
  dy: (Math.random() - 0.5) * 0.3
}));

let parallax = { x: 0, y: 0 };
window.addEventListener("mousemove", e => {
  parallax.x = (e.clientX / innerWidth - 0.5) * 30;
  parallax.y = (e.clientY / innerHeight - 0.5) * 30;
});

function drawBubbles() {
  ctxB.clearRect(0, 0, bubblesCanvas.width, bubblesCanvas.height);
  ctxB.save();
  ctxB.translate(parallax.x, parallax.y);

  ctxB.fillStyle = document.body.classList.contains("light")
    ? "rgba(124,58,237,0.25)"
    : "rgba(155,110,243,0.25)";

  particles.forEach(p => {
    ctxB.beginPath();
    ctxB.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctxB.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > bubblesCanvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > bubblesCanvas.height) p.dy *= -1;
  });

  ctxB.restore();
}

/* ---------------------- MAIN LOOP ---------------------- */
function animate() {
  drawMatrix();
  drawBubbles();
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  matrixCanvas.width = bubblesCanvas.width = innerWidth;
  matrixCanvas.height = bubblesCanvas.height = innerHeight;
});

/* ---------------------- CALL BUTTON + YEAR ---------------------- */
document.getElementById("year").textContent = new Date().getFullYear();
