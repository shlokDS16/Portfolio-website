"use client";

import { useEffect, type ReactNode } from "react";

export function Drawer({
  title,
  onClose,
  children,
  footer,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <>
      <div className="a-scrim" onClick={onClose} />
      <aside className="a-drawer" role="dialog" aria-modal="true" aria-label={title}>
        <div className="a-drawer-head">
          <h2>{title}</h2>
          <button className="a-x" onClick={onClose} aria-label="Close" type="button">
            ✕
          </button>
        </div>
        <div className="a-drawer-body">{children}</div>
        {footer && <div className="a-drawer-foot">{footer}</div>}
      </aside>
    </>
  );
}
