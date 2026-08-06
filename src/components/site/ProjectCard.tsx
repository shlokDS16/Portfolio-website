"use client";

import { useReveal } from "./Reveal";
import { useLightbox } from "./Lightbox";
import type { Project } from "@/lib/types";

function hostname(url: string | null): string {
  if (!url) return "";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
}

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ref = useReveal<HTMLElement>();
  const { open } = useLightbox();

  const images = (project.project_images ?? []).map((i) => i.url);
  const hasImages = images.length > 0;
  const multi = images.length > 1;
  const no = String(index + 1).padStart(2, "0");
  const url = project.live_url ?? project.github_url;

  const openGallery = () =>
    open({ title: project.name, imgs: images });

  return (
    <article ref={ref} className="proj rv">
      <div className="pmedia">
        {hasImages ? (
          <div className="frame" onClick={openGallery} role="button" tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openGallery();
              }
            }}
          >
            <div className="fbar">
              <span className="fdots">
                <i></i>
                <i></i>
                <i></i>
              </span>
              <span className="furl">{hostname(url)}</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="fimg" src={images[0]} alt={project.name} loading="lazy" />
            {multi && <span className="gbadge">⊞ {images.length} shots</span>}
            <div className="fhover">{multi ? "View gallery ↗" : "View ↗"}</div>
          </div>
        ) : (
          <div className="frame" style={{ cursor: "default" }}>
            <div className="fbar">
              <span className="fdots">
                <i></i>
                <i></i>
                <i></i>
              </span>
              <span className="furl">{hostname(url)}</span>
            </div>
            <div className="ph">
              <b>{project.name}</b>
              Screenshots via admin
            </div>
          </div>
        )}
      </div>

      <div className="pbody">
        <span className="pno">
          {no} / {(project.category ?? "").toUpperCase()}
        </span>
        {project.hackathon_win && (
          <div className="pflag">◆ Hackathon Winner · 2026</div>
        )}
        <h3 className="pname">{project.name}</h3>
        {project.subtitle && <div className="ptag">{project.subtitle}</div>}
        {project.description && <p className="pdesc">{project.description}</p>}

        {project.metrics.length > 0 && (
          <div className="pmetrics">
            {project.metrics.map((m, i) => (
              <span className="m" key={i}>
                {m}
              </span>
            ))}
          </div>
        )}

        {project.tech.length > 0 && (
          <div className="chips">
            {project.tech.map((t, i) => (
              <span className="chip" key={i}>
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="plinks">
          {project.live_url && (
            <a
              className="plink magnetic"
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Demo ↗
            </a>
          )}
          {project.github_url && (
            <a
              className="plink g magnetic"
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
