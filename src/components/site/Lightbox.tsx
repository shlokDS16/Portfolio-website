"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Gallery = { title: string; imgs: string[] };

type LightboxCtx = {
  open: (gallery: Gallery) => void;
};

const Ctx = createContext<LightboxCtx | null>(null);

export function useLightbox() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLightbox must be used within LightboxProvider");
  return ctx;
}

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [idx, setIdx] = useState(0);

  const open = useCallback((g: Gallery) => {
    if (!g.imgs.length) return;
    setGallery(g);
    setIdx(0);
  }, []);

  const close = useCallback(() => setGallery(null), []);

  const nav = useCallback(
    (d: number) => {
      if (!gallery) return;
      setIdx((i) => (i + d + gallery.imgs.length) % gallery.imgs.length);
    },
    [gallery],
  );

  useEffect(() => {
    if (!gallery) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") nav(1);
      else if (e.key === "ArrowLeft") nav(-1);
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [gallery, close, nav]);

  const multi = (gallery?.imgs.length ?? 0) > 1;

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <div
        className={`lb${gallery ? " open" : ""}`}
        aria-hidden={!gallery}
        onClick={(e) => {
          const t = e.target as HTMLElement;
          if (t.classList.contains("lb") || t.classList.contains("lb-stage"))
            close();
        }}
      >
        {gallery && (
          <>
            <div className="lb-top">
              <div className="lb-cap">{gallery.title}</div>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <span className="lb-count">
                  {idx + 1} / {gallery.imgs.length}
                </span>
                <button className="lb-x" onClick={close} type="button">
                  Close ✕
                </button>
              </div>
            </div>
            <div className="lb-stage">
              {multi && (
                <div className="lb-nav">
                  <button
                    className="lb-arrow"
                    onClick={() => nav(-1)}
                    aria-label="Previous"
                    type="button"
                  >
                    ‹
                  </button>
                </div>
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="lb-img" src={gallery.imgs[idx]} alt={gallery.title} />
              {multi && (
                <div className="lb-nav">
                  <button
                    className="lb-arrow"
                    onClick={() => nav(1)}
                    aria-label="Next"
                    type="button"
                  >
                    ›
                  </button>
                </div>
              )}
            </div>
            {multi && (
              <div className="lb-thumbs">
                {gallery.imgs.map((src, i) => (
                  <button
                    key={i}
                    className={`lbt${i === idx ? " on" : ""}`}
                    onClick={() => setIdx(i)}
                    type="button"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" />
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Ctx.Provider>
  );
}
