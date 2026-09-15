"use client";
import { useEffect, useRef } from "react";
import { useMotionPreference } from "@/components/motion";

// Spring-mass interaction adapted from daiwiikharihar / Kinetic Matrix, demo 24572.
// Bounded lattice, pointer events, no continuous idle loop, no touch interception.
export function KineticGrid() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const { paused } = useMotionPreference();
  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;
    let points: { x: number; y: number; bx: number; by: number; vx: number; vy: number }[] = [];
    let width = 0,
      height = 0,
      frame = 0,
      steps = 0;
    const pointer = { x: -1000, y: -1000 };
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of points) {
        const dx = p.x - pointer.x,
          dy = p.y - pointer.y,
          distance = Math.hypot(dx, dy);
        if (!paused && distance < 110 && distance > 0) {
          const force = (1 - distance / 110) * 3;
          p.vx += (dx / distance) * force;
          p.vy += (dy / distance) * force;
        }
        p.vx = (p.vx + (p.bx - p.x) * 0.03) * 0.85;
        p.vy = (p.vy + (p.by - p.y) * 0.03) * 0.85;
        p.x += p.vx;
        p.y += p.vy;
        ctx.fillStyle = distance < 110 ? "#ff795b" : "#f3eade35";
        ctx.beginPath();
        ctx.arc(p.x, p.y, distance < 110 ? 2 : 1, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!paused && steps-- > 0 && !document.hidden) frame = requestAnimationFrame(draw);
      else frame = 0;
    };
    const resize = new ResizeObserver(() => {
      width = el.clientWidth;
      height = el.clientHeight;
      const dpr = Math.min(devicePixelRatio, 1.5);
      el.width = width * dpr;
      el.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      points = [];
      for (let x = 15; x < width; x += 35)
        for (let y = 15; y < height; y += 35) points.push({ x, y, bx: x, by: y, vx: 0, vy: 0 });
      cancelAnimationFrame(frame);
      steps = 0;
      draw();
    });
    resize.observe(el);
    const move = (event: PointerEvent) => {
      if (paused || event.pointerType === "touch") return;
      const box = el.getBoundingClientRect();
      pointer.x = event.clientX - box.left;
      pointer.y = event.clientY - box.top;
      steps = 80;
      if (!frame) draw();
    };
    const leave = () => {
      pointer.x = -1000;
      pointer.y = -1000;
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [paused]);
  return <canvas className="kinetic-grid" ref={canvas} aria-hidden="true" />;
}
