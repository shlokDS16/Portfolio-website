"use client";

import { useLightbox } from "./Lightbox";
import type { Certification } from "@/lib/types";

function badge(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("oracle")) return "OCI";
  if (t.includes("cfa")) return "CFA";
  if (t.includes("quantum")) return "QC";
  if (t.includes("python")) return "PY";
  if (t.includes("full-stack") || t.includes("full stack") || t.includes("web dev"))
    return "WEB";
  const words = title.split(/\s+/).filter(Boolean);
  return (words[0]?.[0] ?? "").concat(words[1]?.[0] ?? "").toUpperCase() || "★";
}

function issuerLine(c: Certification): string {
  const bits: string[] = [];
  if (c.issuer) bits.push(c.issuer);
  if (c.note) bits.push(c.note);
  else if (c.valid_until) bits.push(`valid to ${c.valid_until}`);
  else if (c.issued_year) bits.push(c.issued_year);
  return bits.join(" · ");
}

export function CertGrid({ certifications }: { certifications: Certification[] }) {
  const { open } = useLightbox();

  return (
    <div className="cgrid">
      {certifications.map((c) => (
        <div className="cert" key={c.id}>
          {c.image_url ? (
            <div
              className="cimg"
              onClick={() => open({ title: c.title, imgs: [c.image_url!] })}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  open({ title: c.title, imgs: [c.image_url!] });
                }
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.image_url} alt={c.title} loading="lazy" />
            </div>
          ) : (
            <div className="cbadge">
              <span>{badge(c.title)}</span>
            </div>
          )}
          <div className="cmeta">
            <h3>{c.title}</h3>
            <div className="iss">{issuerLine(c)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
