"use client";

import { useEffect, useRef } from "react";

const CH = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789/#<>*";

/**
 * Decode-scramble effect for the hero name. Renders the final text on the
 * server (SEO / no-JS), then animates from noise on mount.
 */
export function Scramble({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    const full = text;
    const len = full.length;
    const start = performance.now() + delay;
    const duration = 520 + len * 32;
    let raf = 0;

    const frame = (now: number) => {
      if (now < start) {
        raf = requestAnimationFrame(frame);
        return;
      }
      const p = Math.min(1, (now - start) / duration);
      const revealed = Math.floor(p * len);
      let out = "";
      for (let i = 0; i < len; i++) {
        out +=
          i < revealed || full[i] === " " || full[i] === "."
            ? full[i]
            : CH[(Math.random() * CH.length) | 0];
      }
      el.textContent = out;
      if (p < 1) raf = requestAnimationFrame(frame);
      else el.textContent = full;
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [text, delay]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
