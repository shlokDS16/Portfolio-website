"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion:reduce)").matches) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  id?: string;
};

export function Reveal({ children, className = "", as: Tag = "div", id }: RevealProps) {
  const ref = useReveal<HTMLElement>();
  return (
    <Tag ref={ref} id={id} className={`rv ${className}`.trim()}>
      {children}
    </Tag>
  );
}
