import { useEffect, useRef } from "react";

// Interactive particle-network background (canvas). Dots drift, connect with
// lines when near, and react to the cursor. Colors follow the theme (--fg/--bg).
export const ParticleNetwork = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles = [];
    let raf;
    const mouse = { x: null, y: null };

    // Read theme colours as "r,g,b" strings
    const rgb = { fg: "10,10,10" };
    const hexToRgb = (hex) => {
      const h = hex.trim().replace("#", "");
      if (h.length !== 6) return "10,10,10";
      const n = parseInt(h, 16);
      return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
    };
    const refreshColors = () => {
      const cs = getComputedStyle(document.documentElement);
      rgb.fg = hexToRgb(cs.getPropertyValue("--fg") || "#0a0a0a");
    };
    refreshColors();
    const themeObserver = new MutationObserver(refreshColors);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent.clientWidth;
      height = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(110, Math.max(40, Math.floor((width * height) / 12000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      }));
    };

    const maxDist = 130;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Cursor repulsion for interactivity
        if (mouse.x !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120 && dist > 0) {
            const force = (120 - dist) / 120;
            p.x += (dx / dist) * force * 1.4;
            p.y += (dy / dist) * force * 1.4;
          }
        }

        // Node dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.fg},0.85)`;
        ctx.fill();
      }

      // Connections between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < maxDist) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${rgb.fg},${0.18 * (1 - d / maxDist)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Connections to cursor
      if (mouse.x !== null) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (d < maxDist * 1.4) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${rgb.fg},${0.35 * (1 - d / (maxDist * 1.4))})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    canvas.parentElement.addEventListener("mousemove", onMove);
    canvas.parentElement.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.parentElement.removeEventListener("mousemove", onMove);
      canvas.parentElement.removeEventListener("mouseleave", onLeave);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      data-testid="skills-particle-canvas"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
};

export default ParticleNetwork;
