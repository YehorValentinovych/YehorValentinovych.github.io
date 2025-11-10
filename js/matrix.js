/* ---------------------- MATRIX 2 ---------------------- */
 function drawMatrix() {
   const isLight = document.body.classList.contains("light");

   // Тёмный или светлый фон
   const bgGradient = ctxM.createRadialGradient(
     matrixCanvas.width / 2,
     matrixCanvas.height / 2,
     200,
     matrixCanvas.width / 2,
     matrixCanvas.height / 2,
     matrixCanvas.width / 1.1
   );
   if (isLight) {
     bgGradient.addColorStop(0, "rgba(245, 240, 255, 0.8)");
     bgGradient.addColorStop(1, "rgba(230, 230, 255, 1)");
   } else {
     bgGradient.addColorStop(0, "rgba(15, 0, 35, 0.5)");
     bgGradient.addColorStop(1, "rgba(0, 0, 0, 0.9)");
   }

   ctxM.fillStyle = bgGradient;
   ctxM.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

   ctxM.font = `${fontSize}px monospace`;
   ctxM.textBaseline = "top";
   const trailLength = 10;

   // Мягкий фиолетовый неон
   for (let i = 0; i < drops.length; i++) {
     const baseX = i * fontSize;
     const baseY = drops[i] * fontSize;

     for (let t = 0; t < trailLength; t++) {
       const charY = baseY - t * fontSize;
       if (charY < -fontSize) continue;

       const ch = symbols.charAt(Math.floor(Math.random() * symbols.length));

       const fade = 1 - t / trailLength;
       const brightness = Math.min(1, charY / matrixCanvas.height);
       const alpha = fade * 0.9;

       // Плавный переход фиолетового к чуть голубоватому низу
       const color = `rgba(${180 - 60 * brightness}, ${100 + 40 * brightness}, ${255 - 80 * brightness}, ${alpha})`;

       ctxM.fillStyle = color;
       ctxM.fillText(ch, baseX, charY);
     }

     if (baseY > matrixCanvas.height && Math.random() > 0.975) {
       drops[i] = 0;
     }
     drops[i] += fallSpeed * 0.4; // Замедлено, плавнее
   }

   drawEnergyPulse();
 }

 /* ---------------------- ПУЛЬС ЭНЕРГИИ ---------------------- */
 function drawEnergyPulse() {
   pulseTime += 0.02;

   const scale = innerWidth < 768 ? 0.6 : 1; // уменьшаем радиус и интенсивность
   const pulseRadius = (260 + Math.sin(pulseTime * 1.3) * 25) * scale;


   const pulseRadius = 240 + Math.sin(pulseTime * 1.4) * 30;
   const pulseAlpha = 0.25 + Math.sin(pulseTime * 1.6) * 0.1;

   // Основное свечение (фиолетовое ядро)
   const grad = ctxM.createRadialGradient(
     matrixCanvas.width / 2,
     matrixCanvas.height / 2,
     0,
     matrixCanvas.width / 2,
     matrixCanvas.height / 2,
     pulseRadius
   );

   grad.addColorStop(0, `rgba(124, 58, 237, ${pulseAlpha + 0.15})`);
   grad.addColorStop(0.6, `rgba(124, 58, 237, ${pulseAlpha * 0.3})`);
   grad.addColorStop(1, "rgba(0, 0, 0, 0)");

   ctxM.globalCompositeOperation = "lighter";
   ctxM.fillStyle = grad;
   ctxM.beginPath();
   ctxM.arc(matrixCanvas.width / 2, matrixCanvas.height / 2, pulseRadius, 0, Math.PI * 2);
   ctxM.fill();

   // Микроволны — расходящиеся слои энергии
   for (let i = 0; i < 3; i++) {
     const waveRadius = pulseRadius + i * 100 + Math.sin(pulseTime * 2 + i) * 10;
     const waveAlpha = 0.06 - i * 0.015;

     const waveGrad = ctxM.createRadialGradient(
       matrixCanvas.width / 2,
       matrixCanvas.height / 2,
       waveRadius - 30,
       matrixCanvas.width / 2,
       matrixCanvas.height / 2,
       waveRadius + 30
     );
     waveGrad.addColorStop(0, "rgba(0,0,0,0)");
     waveGrad.addColorStop(0.5, `rgba(160,100,255,${waveAlpha})`);
     waveGrad.addColorStop(1, "rgba(0,0,0,0)");

     ctxM.fillStyle = waveGrad;
     ctxM.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
   }

   ctxM.globalCompositeOperation = "source-over";
 }

/* ---------------------- MATRIX 1 ---------------------- */

 function drawMatrix() {
   // фон с мягким градиентом
   const bgGradient = ctxM.createRadialGradient(
     matrixCanvas.width / 2, matrixCanvas.height / 2, 100,
     matrixCanvas.width / 2, matrixCanvas.height / 2, matrixCanvas.width / 1.2
   );
   bgGradient.addColorStop(0, "rgba(25, 0, 45, 0.5)");
   bgGradient.addColorStop(1, "rgba(0, 0, 0, 0.9)");
   ctxM.fillStyle = bgGradient;
   ctxM.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

   ctxM.font = `${fontSize}px monospace`;
   ctxM.textBaseline = "top";

   const trailLength = 10;

   for (let i = 0; i < drops.length; i++) {
     const baseX = i * fontSize;
     const baseY = drops[i] * fontSize;

     // хвост символов
     for (let t = 0; t < trailLength; t++) {
       const charY = baseY - t * fontSize;
       if (charY < -fontSize) continue;

       const ch = symbols.charAt(Math.floor(Math.random() * symbols.length));

       // цвет хвоста: нижние — голубые и яркие, верхние — фиолетовые и тусклее
       const ratio = t / (trailLength - 1);
       const r = Math.round(150 - 150 * ratio);
      const g = Math.round(100 - 70 * ratio);
       const b = Math.round(255 - 150 * ratio);
       const alpha = 1 - ratio * 0.9;

       ctxM.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
       ctxM.fillText(ch, baseX, charY);
     }

     // сброс символа
     if (baseY > matrixCanvas.height && Math.random() > 0.975) {
       drops[i] = 0;
     }

     drops[i] += fallSpeed;
   }
 }