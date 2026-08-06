"use client";

import { useEffect } from "react";

/**
 * Global desktop motion: two-speed magnetic cursor (dot + ring),
 * ring-grow on interactive hover, and magnetic pull on `.magnetic`.
 * Mirrors the approved mockup. No-ops on touch / reduced-motion.
 */
export function Motion() {
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (reduce) return;
    if (matchMedia("(max-width:860px)").matches) return;

    const dot = document.querySelector<HTMLElement>(".cur");
    const ring = document.querySelector<HTMLElement>(".cur-ring");
    if (!dot || !ring) return;

    let mx = innerWidth / 2,
      my = innerHeight / 2,
      dx = mx,
      dy = my,
      rx = mx,
      ry = my;
    let rafCursor = 0;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      mx = e.clientX;
      my = e.clientY;
    };
    addEventListener("pointermove", onMove, { passive: true });

    const loop = () => {
      dx += (mx - dx) * 0.35;
      dy += (my - dy) * 0.35;
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      dot.style.transform = `translate(${dx}px,${dy}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      rafCursor = requestAnimationFrame(loop);
    };
    rafCursor = requestAnimationFrame(loop);

    const on = () => ring.classList.add("on");
    const off = () => ring.classList.remove("on");
    const hoverEls = Array.from(
      document.querySelectorAll<HTMLElement>("a,button,.frame,.cimg"),
    );
    hoverEls.forEach((el) => {
      el.addEventListener("pointerenter", on);
      el.addEventListener("pointerleave", off);
    });

    const magneticCleanups: Array<() => void> = [];
    document.querySelectorAll<HTMLElement>(".magnetic").forEach((el) => {
      let tx = 0,
        ty = 0,
        cx = 0,
        cy = 0,
        raf: number | null = null,
        inb = false;
      const animate = () => {
        cx += (tx - cx) * 0.2;
        cy += (ty - cy) * 0.2;
        el.style.transform = `translate(${cx}px,${cy}px)`;
        if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1 || inb) {
          raf = requestAnimationFrame(animate);
        } else {
          raf = null;
        }
      };
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        tx = (e.clientX - (r.left + r.width / 2)) * 0.28;
        ty = (e.clientY - (r.top + r.height / 2)) * 0.4;
        inb = true;
        if (!raf) raf = requestAnimationFrame(animate);
      };
      const leave = () => {
        tx = 0;
        ty = 0;
        inb = false;
        if (!raf) raf = requestAnimationFrame(animate);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      magneticCleanups.push(() => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
        if (raf) cancelAnimationFrame(raf);
      });
    });

    return () => {
      cancelAnimationFrame(rafCursor);
      removeEventListener("pointermove", onMove);
      hoverEls.forEach((el) => {
        el.removeEventListener("pointerenter", on);
        el.removeEventListener("pointerleave", off);
      });
      magneticCleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <>
      <div className="cur" aria-hidden />
      <div className="cur-ring" aria-hidden />
    </>
  );
}
