import { useEffect, useRef } from "react";

const GeometricGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = document.documentElement.scrollHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${document.documentElement.scrollHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const CELL = 80;
    const LINE_ALPHA = 0.06;
    const GLOW_COUNT = 8;

    // Persistent glow nodes that drift slowly
    const glows = Array.from({ length: GLOW_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      phase: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 0.4,
      radius: 60 + Math.random() * 80,
      hue: 190 + Math.random() * 20,
    }));

    const draw = () => {
      const w = window.innerWidth;
      const h = document.documentElement.scrollHeight;

      // Check if canvas needs resize
      const dpr = window.devicePixelRatio || 1;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      ctx.clearRect(0, 0, w, h);

      const cols = Math.ceil(w / CELL) + 1;
      const rows = Math.ceil(h / CELL) + 1;

      // Draw grid lines
      ctx.strokeStyle = `rgba(130, 200, 220, ${LINE_ALPHA})`;
      ctx.lineWidth = 0.5;

      ctx.beginPath();
      for (let i = 0; i <= cols; i++) {
        const x = i * CELL;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let j = 0; j <= rows; j++) {
        const y = j * CELL;
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      // Draw glow nodes at intersections
      time += 0.008;
      glows.forEach((g) => {
        const pulse = 0.5 + 0.5 * Math.sin(time * g.speed + g.phase);
        const alpha = 0.08 + pulse * 0.14;

        // Snap glow center to nearest intersection for subtle grid alignment
        const rawX = g.x * w + Math.sin(time * 0.2 + g.phase) * CELL * 1.5;
        const rawY = g.y * h + Math.cos(time * 0.15 + g.phase) * CELL * 1.2;
        const cx = Math.round(rawX / CELL) * CELL;
        const cy = Math.round(rawY / CELL) * CELL;

        const r = g.radius * (0.8 + pulse * 0.4);

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0, `hsla(${g.hue}, 80%, 65%, ${alpha})`);
        grad.addColorStop(0.5, `hsla(${g.hue}, 70%, 60%, ${alpha * 0.4})`);
        grad.addColorStop(1, `hsla(${g.hue}, 60%, 55%, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(cx - r, cy - r, r * 2, r * 2);

        // Small bright dot at intersection
        const dotAlpha = 0.15 + pulse * 0.25;
        ctx.beginPath();
        ctx.arc(cx, cy, 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${g.hue}, 85%, 70%, ${dotAlpha})`;
        ctx.fill();
      });

      // Highlight some intersections with subtle dots
      const seed = 42;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const hash = ((i * 7 + j * 13 + seed) * 2654435761) >>> 0;
          if (hash % 11 === 0) {
            const x = i * CELL;
            const y = j * CELL;
            const flicker = 0.5 + 0.5 * Math.sin(time * 1.2 + hash * 0.001);
            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(197, 80%, 60%, ${0.1 + flicker * 0.15})`;
            ctx.fill();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
};

export default GeometricGrid;
