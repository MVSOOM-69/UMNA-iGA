// UMNA-IGA — 3D ARCHITECTURAL EXPERIENCE

(() => {
  const canvas = document.createElement("canvas");
  canvas.id = "architecture-canvas";

  const hero = document.querySelector(".hero");

  if (!hero) return;

  hero.prepend(canvas);

  const ctx = canvas.getContext("2d");

  let width, height;
  let animationFrame;
  let time = 0;

  function resize() {
    width = canvas.width = hero.clientWidth;
    height = canvas.height = hero.clientHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  canvas.style.position = "absolute";
  canvas.style.inset = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.zIndex = "0";
  canvas.style.pointerEvents = "none";

  function drawArch(x, y, w, h, color, lineWidth) {
    ctx.beginPath();
    ctx.moveTo(x, y + h);
    ctx.lineTo(x, y + h * 0.38);

    ctx.quadraticCurveTo(
      x,
      y,
      x + w / 2,
      y
    );

    ctx.quadraticCurveTo(
      x + w,
      y,
      x + w,
      y + h * 0.38
    );

    ctx.lineTo(x + w, y + h);

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    const centerX = width * 0.5;
    const centerY = height * 0.52;

    const scale = Math.min(width, height);

    // Atmospheric glow
    const glow = ctx.createRadialGradient(
      centerX,
      centerY,
      10,
      centerX,
      centerY,
      scale * 0.65
    );

    glow.addColorStop(0, "rgba(179,148,91,0.13)");
    glow.addColorStop(1, "rgba(18,63,53,0)");

    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

    // Architectural arch layers
    const pulse = Math.sin(time * 0.5) * 3;

    drawArch(
      centerX - scale * 0.36,
      centerY - scale * 0.39,
      scale * 0.72,
      scale * 0.78,
      "rgba(179,148,91,0.18)",
      2
    );

    drawArch(
      centerX - scale * 0.29,
      centerY - scale * 0.31,
      scale * 0.58,
      scale * 0.68,
      "rgba(179,148,91,0.32)",
      1.5
    );

    drawArch(
      centerX - scale * 0.21,
      centerY - scale * 0.23,
      scale * 0.42,
      scale * 0.56 + pulse,
      "rgba(218,190,130,0.45)",
      1
    );

    // Geometric decorative circles
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * i) / 12 + time * 0.08;
      const radius = scale * 0.32;

      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);

      ctx.fillStyle = "rgba(218,190,130,0.55)";
      ctx.fill();
    }

    // Subtle floor lines
    for (let i = 0; i < 5; i++) {
      const y = centerY + scale * (0.29 + i * 0.035);

      ctx.beginPath();
      ctx.moveTo(centerX - scale * 0.4, y);
      ctx.lineTo(centerX + scale * 0.4, y);

      ctx.strokeStyle = "rgba(179,148,91,0.10)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    time += 0.01;

    animationFrame = requestAnimationFrame(draw);
  }

  draw();

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrame);
    } else {
      cancelAnimationFrame(animationFrame);
      draw();
    }
  });
})();
