import { useEffect, useRef } from "react";

const AuroraBackground = () => {
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

    // Aurora bands configuration
    const bands = [
      { yBase: 0.15, hue: 197, saturation: 70, lightness: 78, amplitude: 60, speed: 0.12, width: 220 },
      { yBase: 0.30, hue: 185, saturation: 55, lightness: 75, amplitude: 80, speed: 0.08, width: 260 },
      { yBase: 0.50, hue: 200, saturation: 60, lightness: 80, amplitude: 50, speed: 0.15, width: 200 },
      { yBase: 0.65, hue: 190, saturation: 50, lightness: 76, amplitude: 70, speed: 0.10, width: 240 },
      { yBase: 0.82, hue: 195, saturation: 65, lightness: 82, amplitude: 45, speed: 0.13, width: 180 },
    ];

    const draw = () => {
      const w = window.innerWidth;
      const h = document.documentElement.scrollHeight;

      const dpr = window.devicePixelRatio || 1;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      ctx.clearRect(0, 0, w, h);
      time += 0.003;

      bands.forEach((band) => {
        const baseY = band.yBase * h;
        const shift = Math.sin(time * band.speed * 2) * band.amplitude;
        const cy = baseY + shift;
        const halfW = band.width * (1 + 0.15 * Math.sin(time * band.speed * 3 + band.hue));

        // Slowly oscillate hue for living color
        const hue = band.hue + Math.sin(time * band.speed + band.yBase * 10) * 8;
        const alpha = 0.12 + 0.04 * Math.sin(time * band.speed * 1.5 + band.yBase * 5);

        const grad = ctx.createLinearGradient(0, cy - halfW, 0, cy + halfW);
        grad.addColorStop(0, `hsla(${hue}, ${band.saturation}%, ${band.lightness}%, 0)`);
        grad.addColorStop(0.3, `hsla(${hue}, ${band.saturation}%, ${band.lightness}%, ${alpha * 0.6})`);
        grad.addColorStop(0.5, `hsla(${hue}, ${band.saturation}%, ${band.lightness}%, ${alpha})`);
        grad.addColorStop(0.7, `hsla(${hue}, ${band.saturation}%, ${band.lightness}%, ${alpha * 0.6})`);
        grad.addColorStop(1, `hsla(${hue}, ${band.saturation}%, ${band.lightness}%, 0)`);

        ctx.fillStyle = grad;

        // Draw a wavy band using a path
        ctx.beginPath();
        ctx.moveTo(-10, cy - halfW);

        for (let x = 0; x <= w + 10; x += 8) {
          const wave =
            Math.sin(x * 0.003 + time * band.speed * 4) * 20 +
            Math.sin(x * 0.007 + time * band.speed * 2.5) * 12;
          ctx.lineTo(x, cy - halfW + wave);
        }

        for (let x = w + 10; x >= -10; x -= 8) {
          const wave =
            Math.sin(x * 0.004 + time * band.speed * 3 + 1) * 18 +
            Math.sin(x * 0.006 + time * band.speed * 2) * 10;
          ctx.lineTo(x, cy + halfW + wave);
        }

        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
      });

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

export default AuroraBackground;
