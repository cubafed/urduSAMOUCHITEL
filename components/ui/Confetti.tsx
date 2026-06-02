"use client";
import { useEffect, useRef } from "react";

// Лёгкое конфетти на canvas без зависимостей
export function fireConfetti() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("urdu-confetti"));
}

export function ConfettiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: {
      x: number; y: number; vx: number; vy: number;
      size: number; color: string; rot: number; vr: number;
    }[] = [];
    let raf = 0;

    const colors = ["#f59e0b", "#22c55e", "#3b82f6", "#ec4899", "#eab308"];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const launch = () => {
      const cx = window.innerWidth / 2;
      for (let i = 0; i < 120; i++) {
        particles.push({
          x: cx + (Math.random() - 0.5) * 200,
          y: window.innerHeight / 3,
          vx: (Math.random() - 0.5) * 12,
          vy: Math.random() * -12 - 4,
          size: Math.random() * 8 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.3,
        });
      }
      if (!raf) animate();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.vx *= 0.99;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });
      particles = particles.filter((p) => p.y < canvas.height + 20);
      if (particles.length > 0) {
        raf = requestAnimationFrame(animate);
      } else {
        raf = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    window.addEventListener("urdu-confetti", launch);
    return () => {
      window.removeEventListener("urdu-confetti", launch);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
