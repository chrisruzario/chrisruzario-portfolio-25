import { useEffect, useRef } from "react";
import { skills } from "@/data";

// Interactive skill constellation: each skill is a node connected to its
// nearest neighbours with lines. Nodes drift, react to the cursor, and can be
// dragged. Line colour follows the theme (--fg).
export const SkillsGraph = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const labelRefs = useRef([]);
  const nodesRef = useRef([]);
  const mouse = useRef({ x: null, y: null, dragging: -1 });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf;
    const pad = 80;

    let fg = "10,10,10";
    const refreshColor = () => {
      // Read the actual resolved text colour — always valid in both themes.
      const c = getComputedStyle(document.body).color; // e.g. "rgb(255, 255, 255)"
      const m = c.match(/\d+/g);
      fg = m && m.length >= 3 ? `${m[0]},${m[1]},${m[2]}` : "128,128,128";
    };
    refreshColor();
    const themeObserver = new MutationObserver(refreshColor);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const init = () => {
      w = container.clientWidth;
      h = container.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (nodesRef.current.length !== skills.length) {
        const cols = Math.ceil(Math.sqrt(skills.length));
        nodesRef.current = skills.map((_, i) => {
          const cx = pad + ((i % cols) + 0.5) * ((w - 2 * pad) / cols);
          const cy = pad + (Math.floor(i / cols) + 0.5) * ((h - 2 * pad) / Math.ceil(skills.length / cols));
          return {
            x: cx + (Math.random() - 0.5) * 40,
            y: cy + (Math.random() - 0.5) * 40,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
          };
        });
      } else {
        nodesRef.current.forEach((n) => {
          n.x = Math.max(pad, Math.min(w - pad, n.x));
          n.y = Math.max(pad, Math.min(h - pad, n.y));
        });
      }
    };

    const frame = () => {
      refreshColor();
      const nodes = nodesRef.current;

      nodes.forEach((n, i) => {
        if (mouse.current.dragging === i && mouse.current.x !== null) {
          n.x = Math.max(pad, Math.min(w - pad, mouse.current.x));
          n.y = Math.max(pad, Math.min(h - pad, mouse.current.y));
          n.vx = 0;
          n.vy = 0;
        } else {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < pad || n.x > w - pad) n.vx *= -1;
          if (n.y < pad || n.y > h - pad) n.vy *= -1;
          n.x = Math.max(pad, Math.min(w - pad, n.x));
          n.y = Math.max(pad, Math.min(h - pad, n.y));
          if (mouse.current.x !== null && mouse.current.dragging < 0) {
            const dx = n.x - mouse.current.x;
            const dy = n.y - mouse.current.y;
            const d = Math.hypot(dx, dy);
            if (d < 130 && d > 0) {
              const f = (130 - d) / 130;
              n.x += (dx / d) * f * 2.2;
              n.y += (dy / d) * f * 2.2;
            }
          }
        }
        const el = labelRefs.current[i];
        if (el) el.style.transform = `translate(${n.x}px, ${n.y}px) translate(-50%, -50%)`;
      });

      // Build edges: connect each node to its 3 nearest neighbours
      const edges = new Map();
      for (let i = 0; i < nodes.length; i++) {
        const dists = [];
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          dists.push([j, Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y)]);
        }
        dists.sort((a, b) => a[1] - b[1]);
        for (let k = 0; k < Math.min(3, dists.length); k++) {
          const j = dists[k][0];
          const key = i < j ? `${i}-${j}` : `${j}-${i}`;
          edges.set(key, dists[k][1]);
        }
      }

      ctx.clearRect(0, 0, w, h);
      edges.forEach((d, key) => {
        const [i, j] = key.split("-").map(Number);
        const alpha = Math.max(0.12, Math.min(0.55, 0.55 * (1 - d / 520)));
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = `rgba(${fg},${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Highlight lines from cursor to nearby nodes
      if (mouse.current.x !== null && mouse.current.dragging < 0) {
        nodes.forEach((n) => {
          const d = Math.hypot(n.x - mouse.current.x, n.y - mouse.current.y);
          if (d < 220) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mouse.current.x, mouse.current.y);
            ctx.strokeStyle = `rgba(${fg},${0.4 * (1 - d / 220)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      }

      raf = requestAnimationFrame(frame);
    };

    const onPointerMove = (e) => {
      const r = container.getBoundingClientRect();
      mouse.current.x = e.clientX - r.left;
      mouse.current.y = e.clientY - r.top;
    };
    const onPointerUp = () => {
      mouse.current.dragging = -1;
    };
    const onLeave = () => {
      if (mouse.current.dragging < 0) {
        mouse.current.x = null;
        mouse.current.y = null;
      }
    };

    init();
    frame();
    const ro = new ResizeObserver(init);
    ro.observe(container);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    container.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("mouseleave", onLeave);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-testid="skills-graph"
      className="relative w-full h-[480px] sm:h-[520px] md:h-[600px] touch-none"
    >
      <canvas ref={canvasRef} data-testid="skills-particle-canvas" className="absolute inset-0" aria-hidden="true" />
      {skills.map((skill, i) => (
        <button
          key={skill}
          ref={(el) => (labelRefs.current[i] = el)}
          data-testid={`skill-card-${i}`}
          onPointerDown={(e) => {
            e.preventDefault();
            mouse.current.dragging = i;
          }}
          style={{ willChange: "transform" }}
          className="group absolute left-0 top-0 z-10 flex items-center gap-2 border border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_78%,transparent)] backdrop-blur-sm px-4 py-2 cursor-grab active:cursor-grabbing hover:bg-[var(--fg)] hover:text-[var(--bg)] hover:border-[var(--fg)] transition-colors duration-200 select-none whitespace-nowrap"
        >
          <span className="font-mono text-[10px] text-[var(--muted)] group-hover:text-[var(--bg)] transition-colors">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-sm md:text-base font-medium tracking-tight">{skill}</span>
        </button>
      ))}
    </div>
  );
};

export default SkillsGraph;
