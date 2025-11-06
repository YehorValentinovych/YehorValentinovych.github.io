/* -----------------------------------------------------------
  Samurai Devs — bg + particles + rings motion + theme + ticker
------------------------------------------------------------*/

// Basic DOM
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const yearEl = document.getElementById('year');
yearEl && (yearEl.textContent = (new Date()).getFullYear());

// initialize theme (prefers-dark fallback)
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('sd-theme');
if (savedTheme) body.classList.add(savedTheme);
else body.classList.add(prefersDark ? 'dark' : 'light');

// sync toggle UI
if (themeToggle) {
  themeToggle.checked = body.classList.contains('light') ? true : false;
  themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
      body.classList.remove('dark'); body.classList.add('light'); localStorage.setItem('sd-theme','light');
    } else {
      body.classList.remove('light'); body.classList.add('dark'); localStorage.setItem('sd-theme','dark');
    }
  });
}

/* -------------------------
   Canvas: deep 3D parallax bg
   - bgCanvas: wavy perspective lines
   - particlesCanvas: depth particles & floaters
---------------------------*/
const bgCanvas = document.getElementById('bg-canvas');
const pCanvas = document.getElementById('particles-canvas');
const bgCtx = bgCanvas.getContext('2d');
const pCtx = pCanvas.getContext('2d');

function resizeCanvases() {
  const DPR = Math.max(1, window.devicePixelRatio || 1);
  [bgCanvas, pCanvas].forEach(c => {
    c.width = Math.floor(window.innerWidth * DPR);
    c.height = Math.floor(window.innerHeight * DPR);
    c.style.width = window.innerWidth + 'px';
    c.style.height = window.innerHeight + 'px';
    c.getContext('2d').setTransform(DPR,0,0,DPR,0,0);
  });
}
resizeCanvases();
window.addEventListener('resize', () => { resizeCanvases(); initGrid(); });

/* BACKGROUND GRID (perspective lines) */
let grid = { cols: 60, rows: 14, speed: 0.6, offset: 0 };
function initGrid() {
  // columns proportional to width
  grid.cols = Math.max(30, Math.floor(window.innerWidth / 20));
  grid.rows = Math.max(8, Math.floor(window.innerHeight / 80));
  grid.offset = 0;
}
initGrid();

function drawBg(now) {
  bgCtx.clearRect(0,0,bgCanvas.width,bgCanvas.height);
  const w = bgCanvas.width / (window.devicePixelRatio || 1);
  const h = bgCanvas.height / (window.devicePixelRatio || 1);

  // gradient ground -> sky
  const g = bgCtx.createLinearGradient(0,0,0,h);
  if (body.classList.contains('light')) {
    g.addColorStop(0, '#f7f7fb'); g.addColorStop(1, '#ffffff');
  } else {
    g.addColorStop(0, '#05010a'); g.addColorStop(1, '#0a0226');
  }
  bgCtx.fillStyle = g; bgCtx.fillRect(0,0,w,h);

  // perspective vanishing point
  const vx = w/2, vy = h*0.45;
  const baseAlpha = body.classList.contains('light') ? 0.08 : 0.14;

  // moving horizontal bands + lines
  for (let r = 0; r < grid.rows; r++) {
    const ry = vy + (r* (h - vy) / (grid.rows+1));
    const depth = (r+1) / grid.rows;
    const alpha = baseAlpha * (1 - depth*0.7);
    const lineColor = body.classList.contains('light') ? `rgba(40,18,90,${alpha})` : `rgba(139,92,246,${alpha})`;
    bgCtx.beginPath();
    for (let c = 0; c <= grid.cols; c++) {
      const t = c / grid.cols;
      // perspective x positions, slightly wavy
      const px = vx + (t - 0.5) * (w * (1.6 - depth*1.4));
      const wob = Math.sin((t*10 + (now/2000) + r*0.2)) * 6 * (1-depth);
      if (c===0) bgCtx.moveTo(px + wob, ry);
      else bgCtx.lineTo(px + wob, ry);
    }
    bgCtx.strokeStyle = lineColor;
    bgCtx.lineWidth = Math.max(0.7, 2 * (1-depth));
    bgCtx.stroke();
  }

  // radial subtle glow in center
  const rg = bgCtx.createRadialGradient(vx, vy, 20, vx, vy, Math.max(w,h));
  if (body.classList.contains('light')) {
    rg.addColorStop(0, 'rgba(175,150,255,0.14)'); rg.addColorStop(1, 'rgba(255,255,255,0)');
  } else {
    rg.addColorStop(0, 'rgba(139,92,246,0.18)'); rg.addColorStop(1, 'rgba(0,0,0,0)');
  }
  bgCtx.fillStyle = rg;
  bgCtx.fillRect(0,0,w,h);
}

/* PARTICLES for depth */
const particles = [];
function initParticles() {
  particles.length = 0;
  const count = Math.floor((window.innerWidth * window.innerHeight) / 60000); // scales with area
  for (let i=0;i<Math.max(40, count*6);i++){
    particles.push({
      x: Math.random()*window.innerWidth,
      y: Math.random()*window.innerHeight,
      z: Math.random()*1, // depth 0..1 (closer to 0 is far)
      size: 0.6 + Math.random()*3.4,
      vx: (Math.random()-0.5)*0.08,
      vy: (Math.random()-0.5)*0.08,
      hueShift: Math.random()*40
    });
  }
}
initParticles();

function drawParticles(now) {
  pCtx.clearRect(0,0,pCanvas.width,pCanvas.height);
  const w = pCanvas.width / (window.devicePixelRatio || 1);
  const h = pCanvas.height / (window.devicePixelRatio || 1);

  for (let p of particles) {
    // parallax movement: nearer particles move more
    p.x += p.vx * (1 + p.z*6);
    p.y += p.vy * (1 + p.z*6);

    // wrap
    if (p.x < -20) p.x = w + 20;
    if (p.x > w+20) p.x = -20;
    if (p.y < -20) p.y = h + 20;
    if (p.y > h+20) p.y = -20;

    // perspective size
    const depth = 1 - p.z;
    const size = Math.max(0.6, p.size * (0.55 + depth*1.6));
    // glow color
    const color = body.classList.contains('light') ? `rgba(100,90,160,${0.14 + depth*0.22})` : `rgba(139,92,246,${0.08 + depth*0.32})`;
    pCtx.beginPath();
    pCtx.fillStyle = color;
    pCtx.globalCompositeOperation = 'lighter';
    pCtx.shadowBlur = 14 * depth;
    pCtx.shadowColor = body.classList.contains('light') ? '#bfa6ff' : '#8b5cf6';
    pCtx.arc(p.x, p.y, size, 0, Math.PI*2);
    pCtx.fill();
    pCtx.shadowBlur = 0;
    pCtx.globalCompositeOperation = 'source-over';
  }
}

// ticker speed adjust (so it's slower on mobile)
const tickerItems = document.querySelectorAll('.ticker-item');
function adjustTicker() {
  const base = Math.min(26, Math.max(10, Math.floor(window.innerWidth / 60)));
  tickerItems.forEach(el => {
    el.style.animationDuration = `${base}s`;
  });
}
adjustTicker();
window.addEventListener('resize', adjustTicker);

// main loop
let last = performance.now();
function loop(now){
  const dt = now - last;
  last = now;
  drawBg(now);
  drawParticles(now);
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

// small interactivity: move subtle parallax on mouse
let mouse = {x:0,y:0};
window.addEventListener('mousemove', e => {
  mouse.x = (e.clientX - window.innerWidth/2) / window.innerWidth;
  mouse.y = (e.clientY - window.innerHeight/2) / window.innerHeight;
});

// re-init on orientation/resize edgecases
window.addEventListener('orientationchange', () => { resizeCanvases(); initGrid(); initParticles(); });

// accessibility: reduce motion preference
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduced) {
  // slow animations / disable heavy blur
  particles.forEach(p => { p.vx *= 0.2; p.vy *= 0.2; });
}

/* END */
