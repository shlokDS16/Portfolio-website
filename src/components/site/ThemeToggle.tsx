"use client";

export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const current = root.getAttribute("data-theme");
    const isDark = current
      ? current === "dark"
      : matchMedia("(prefers-color-scheme:dark)").matches;
    const next = isDark ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button className="tbtn" onClick={toggle} aria-label="Toggle theme">
      ◐ Theme
    </button>
  );
}
