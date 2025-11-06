/* script-03v.js - combined: perspective grid + matrix (sanskrit/mantras) + particles (bubbles)
   - smooth ticker JS-driven
   - parallax by mouse
   - respects prefers-reduced-motion
*/

/* === CONFIG === */
const CONFIG = {
    matrix: {
      size: 18,           // px font size for symbols
      speedBase: 40,      // base speed factor
      density: 0.95       // 0..1
    },
    particles: {
      baseCount: 70
    },
    ticker: {
      pxPerSec: 120       // speed of ticker in px/sec
    },
    parallax: {
      intensity: 20       // px parallax amount
    }
  };
  
  /* === DOM refs === */
  const bgCanvas = document.getElementById('bg-canvas');
  const matrixCanvas = document.getElementById('matrix-canvas');
  const particlesCanvas = document.getElementById('particles-canvas');
  const tickerWrap = document.querySelector('.ticker');
  const tickerItem = document.querySelector('.ticker-item');
  const yearEl = document.getElementById('year');
  
  /* set year if element exists */
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  
  /* contexts */
  const bgCtx = bgCanvas.getContext('2d');
  const matCtx = matrixCanvas.getContext('2d');
  const partCtx = particlesCanvas.getContext('2d');
  
  /* device pixel ratio helper */
  function DPR(){
    return Math.max(1, window.devicePixelRatio || 1);
  }
  
  /* === RESIZE & INIT helpers === */
  let W = 0, H = 0;
  function resizeAll(){
    const dpr = DPR();
    W = window.innerWidth;
    H = window.innerHeight;
    [bgCanvas, matrixCanvas, particlesCanvas].forEach(c=>{
      c.width = Math.floor(W * dpr);
      c.height = Math.floor(H * dpr);
      c.style.width = W + 'px';
      c.style.height = H + 'px';
      c.getContext('2d').setTransform(dpr,0,0,dpr,0,0);
    });
    initGrid();
    initMatrix();
    initParticles();
    adjustTicker();
  }
  window.addEventListener('resize', () => { resizeAll(); });
  
  /* === PARALLAX (mouse) === */
  const mouse = { x:0, y:0, px:0, py:0 };
  window.addEventListener('mousemove', (e)=>{
    mouse.x = (e.clientX / W - 0.5) * 2; // -1..1
    mouse.y = (e.clientY / H - 0.5) * 2;
  });
  window.addEventListener('touchmove', (e)=>{
    if (e.touches && e.touches[0]) {
      mouse.x = (e.touches[0].clientX / W - 0.5) * 2;
      mouse.y = (e.touches[0].clientY / H - 0.5) * 2;
    }
  });
  
  /* === PERSPECTIVE GRID (background lines) === */
  let grid = { cols: 60, rows: 12, offset:0 };
  function initGrid(){
    grid.cols = Math.max(30, Math.floor(W / 20));
    grid.rows = Math.max(8, Math.floor(H / 80));
    grid.offset = 0;
  }
  function drawGrid(t){
    bgCtx.clearRect(0,0,W,H);
    // gradient
    const g = bgCtx.createLinearGradient(0,0,0,H);
    if (document.body.classList.contains('light')){
      g.addColorStop(0,'#f7f7fb'); g.addColorStop(1,'#ffffff');
    } else {
      g.addColorStop(0,'#05010a'); g.addColorStop(1,'#0a0226');
    }
    bgCtx.fillStyle = g; bgCtx.fillRect(0,0,W,H);
  
    const vx = W/2, vy = H*0.44;
    const tsec = t/1000;
  
    for (let r=0;r<grid.rows;r++){
      const depth = (r+1)/grid.rows;
      const ry = vy + depth * (H - vy);
      const alpha = document.body.classList.contains('light') ? 0.06 * (1 - depth*0.6) : 0.18 * (1 - depth*0.6);
      const base = document.body.classList.contains('light') ? '40,18,90' : '139,92,246';
      bgCtx.beginPath();
      for (let c=0;c<=grid.cols;c++){
        const pct = c / grid.cols;
        const px = vx + (pct - 0.5) * (W * (1.6 - depth*1.4));
        const wobble = Math.sin(pct*10 + tsec*0.6 + r*0.25) * 6 * (1-depth);
        const parx = mouse.x * CONFIG.parallax.intensity * (1-depth);
        const pary = mouse.y * CONFIG.parallax.intensity * (1-depth);
        if (c===0) bgCtx.moveTo(px + wobble + parx, ry + pary);
        else bgCtx.lineTo(px + wobble + parx, ry + pary);
      }
      bgCtx.strokeStyle = `rgba(${base}, ${alpha})`;
      bgCtx.lineWidth = Math.max(0.6, 2 * (1-depth));
      bgCtx.stroke();
    }
  
    // center glow
    const rg = bgCtx.createRadialGradient(vx + mouse.x*60, vy + mouse.y*30, 10, vx, vy, Math.max(W,H));
    if (document.body.classList.contains('light')){
      rg.addColorStop(0,'rgba(150,120,230,0.08)'); rg.addColorStop(1,'rgba(255,255,255,0)');
    } else {
      rg.addColorStop(0,'rgba(139,92,246,0.16)'); rg.addColorStop(1,'rgba(0,0,0,0)');
    }
    bgCtx.fillStyle = rg;
    bgCtx.fillRect(0,0,W,H);
  }
  
  /* === MATRIX (sanskrit/mantra symbols) === */
  let matCols = 0;
  let matDrops = [];
  const mantraSymbols = "ॐ नमः शिवाय ॐ अ‍र्ह"; // example mantras (string); we'll split into chars
  let matChars = Array.from(mantraSymbols.replace(/\s+/g,' ')); // keep spaces as separator
  function initMatrix(){
    matChars = Array.from(mantraSymbols);
    matCols = Math.max(20, Math.floor(W / CONFIG.matrix.size));
    matDrops = new Array(matCols).fill(0).map(()=> Math.random()*1000);
    matCtx.font = `${CONFIG.matrix.size}px monospace`;
    matCtx.textBaseline = 'top';
  }
  function drawMatrix(t){
    const tsec = t/1000;
    // draw slight translucent overlay to create trails
    matCtx.fillStyle = "rgba(0,0,0,0.12)";
    matCtx.fillRect(0,0,W,H);
    matCtx.fillStyle = document.body.classList.contains('light') ? "rgba(80,30,120,0.55)" : "rgba(139,92,246,0.85)";
    matCtx.font = `${CONFIG.matrix.size}px monospace`;
  
    for(let i=0;i<matCols;i++){
      const x = i * CONFIG.matrix.size;
      const depth = Math.abs(Math.sin(i*0.35 + tsec*0.4));
      const idx = Math.floor(Math.abs(Math.sin(i + tsec)) * matChars.length);
      const ch = matChars[idx] || 'ॐ';
      const y = (matDrops[i] * CONFIG.matrix.size) % H;
      // parallax horizontally
      const px = x + mouse.x * (i-matCols/2) * 0.04;
      const alpha = 0.06 + depth * 0.7 * CONFIG.matrix.density;
      matCtx.fillStyle = document.body.classList.contains('light')
        ? `rgba(80,30,120,${0.05 + alpha*0.45})`
        : `rgba(139,92,246,${0.06 + alpha*0.6})`;
      matCtx.fillText(ch, px, y);
      matDrops[i] += (0.4 + depth*1.1) * (CONFIG.matrix.speedBase / 40);
      if (matDrops[i]*CONFIG.matrix.size > H + 120 && Math.random() > 0.985) matDrops[i] = 0;
    }
  }
  
  /* === PARTICLES / BUBBLES layer === */
  let particles = [];
  function initParticles(){
    particles = [];
    const count = Math.max(40, Math.floor((W * H) / 90000) + CONFIG.particles.baseCount);
    for(let i=0;i<count;i++){
      particles.push({
        x: Math.random()*W,
        y: Math.random()*H,
        z: Math.random(), // 0..1 depth
        r: 0.6 + Math.random()*4,
        vx: (Math.random()-0.5)*0.06,
        vy: (Math.random()-0.5)*0.06
      });
    }
  }
  function drawParticles(){
    partCtx.clearRect(0,0,W,H);
    for(let p of particles){
      p.x += p.vx * (1 + p.z*6);
      p.y += p.vy * (1 + p.z*6);
      if (p.x < -30) p.x = W + 30;
      if (p.x > W + 30) p.x = -30;
      if (p.y < -30) p.y = H + 30;
      if (p.y > H + 30) p.y = -30;
  
      const depth = 1 - p.z;
      const size = Math.max(0.3, p.r * (0.6 + depth*1.6));
      partCtx.beginPath();
      const color = document.body.classList.contains('light')
        ? `rgba(100,90,160,${0.06 + depth*0.16})`
        : `rgba(139,92,246,${0.06 + depth*0.36})`;
      partCtx.fillStyle = color;
      partCtx.globalCompositeOperation = 'lighter';
      partCtx.shadowBlur = 12 * depth;
      partCtx.shadowColor = document.body.classList.contains('light') ? '#bfa6ff' : '#8b5cf6';
      // parallax offset by mouse
      const px = p.x + mouse.x * (p.z * 40);
      const py = p.y + mouse.y * (p.z * 40);
      partCtx.arc(px, py, size, 0, Math.PI*2);
      partCtx.fill();
      partCtx.globalCompositeOperation = 'source-over';
      partCtx.shadowBlur = 0;
    }
  }
  
  /* === SMOOTH TICKER (JS-driven) === */
  let tickerState = { x:0, width:0, itemW:0, lastTime:0 };
  function adjustTicker(){
    if(!tickerWrap || !tickerItem) return;
    tickerItem.style.willChange = 'transform';
    tickerItem.style.transform = 'translate3d(0,0,0)';
    tickerState.x = 0;
    const wrapW = tickerWrap.clientWidth;
    const itemW = tickerItem.scrollWidth;
    tickerState.itemW = itemW;
    tickerState.width = itemW + 80;
  }
  function tickerTick(now){
    if(!tickerItem) return;
    if(!tickerState.lastTime) tickerState.lastTime = now;
    const dt = (now - tickerState.lastTime)/1000;
    tickerState.lastTime = now;
    const speed = CONFIG.ticker.pxPerSec;
    tickerState.x -= speed * dt;
    if(Math.abs(tickerState.x) >= tickerState.width) tickerState.x += tickerState.width;
    tickerItem.style.transform = `translate3d(${tickerState.x}px,0,0)`;
  }
  
  /* === MAIN LOOP === */
  let rafId;
  function loop(now){
    drawGrid(now);
    drawMatrix(now);
    drawParticles();
    tickerTick(now);
    rafId = requestAnimationFrame(loop);
  }
  
  /* === INIT ON LOAD === */
  function startAll(){
    resizeAll();
    // respect reduce motion
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduce){
      CONFIG.matrix.speedBase = Math.min(CONFIG.matrix.speedBase, 18);
      CONFIG.ticker.pxPerSec = Math.min(CONFIG.ticker.pxPerSec, 60);
      particles.forEach(p => { p.vx *= 0.2; p.vy *= 0.2; });
    }
    // start RAF loop
    if(rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(loop);
  }
  
  /* run */
  window.addEventListener('load', startAll);
  
  /* initial call to set sizes in case load already fired */
  resizeAll();
  
  /* THEME TOGGLE hookup (keeps previous control) */
  const themeToggleInput = document.getElementById('theme-toggle');
  if(themeToggleInput){
    // initialize from saved
    const saved = localStorage.getItem('divine-theme');
    if(saved) document.body.classList.toggle('light', saved === 'light');
    themeToggleInput.checked = document.body.classList.contains('light');
    themeToggleInput.addEventListener('change', ()=>{
      const isLight = themeToggleInput.checked;
      document.body.classList.toggle('light', isLight);
      localStorage.setItem('divine-theme', isLight ? 'light' : 'dark');
      // re-draw to update colors
      initMatrix(); initParticles();
    });
  }
  
  /* adjust ticker on resize */
  window.addEventListener('resize', ()=>{ adjustTicker(); });
  
  /* pause RAF when tab hidden to save CPU */
  document.addEventListener('visibilitychange', ()=>{
    if(document.hidden) { if(rafId) cancelAnimationFrame(rafId); }
    else { rafId = requestAnimationFrame(loop); }
  });
  