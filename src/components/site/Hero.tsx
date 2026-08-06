import Link from "next/link";
import { Scramble } from "./Scramble";
import { Reveal } from "./Reveal";
import type { SiteSettings } from "@/lib/types";

const BOLD_PHRASE = "AI systems, analytics, and automation";

function Lede({ text }: { text: string }) {
  const i = text.indexOf(BOLD_PHRASE);
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <b>{BOLD_PHRASE}</b>
      {text.slice(i + BOLD_PHRASE.length)}
    </>
  );
}

export function Hero({ settings }: { settings: SiteSettings }) {
  const hero = settings.hero ?? {};
  const stats = settings.stats ?? [];
  const name = hero.name ?? ["Shlok", "Kumar", "Goenka"];
  const roles = hero.roles ?? [];

  return (
    <section className="hero">
      <div className="wrap">
        <Reveal className="eyrow">
          <span className="ey">{hero.eyebrow ?? "Technical Product Analyst"}</span>
          {roles.length > 0 && (
            <span className="ey">
              <b>/</b> {roles.join(" · ").toUpperCase()}
            </span>
          )}
        </Reveal>

        <h1 className="name" aria-label={name.join(" ")}>
          {name.map((line, i) => (
            <span className="l" key={i}>
              <Scramble text={line.toUpperCase()} delay={220 + i * 130} />
            </span>
          ))}
        </h1>

        <Reveal className="hstate">
          <span className="dot"></span>
          {[hero.location, hero.school, hero.availability]
            .filter(Boolean)
            .join(" · ")}
        </Reveal>

        {hero.lede && (
          <Reveal as="p" className="lede">
            <Lede text={hero.lede} />
          </Reveal>
        )}

        <Reveal className="cta-row">
          <Link className="btn magnetic" href="/#work">
            <span className="fill"></span>
            <span className="t">View Work →</span>
          </Link>
          <Link className="btn g magnetic" href="/resume">
            <span className="fill"></span>
            <span className="t">Résumé ↗</span>
          </Link>
          <Link className="btn g magnetic" href="/#contact">
            <span className="fill"></span>
            <span className="t">Contact ↗</span>
          </Link>
        </Reveal>

        {stats.length > 0 && (
          <Reveal className="stats">
            {stats.map((s, i) => (
              <div className="stat" key={i}>
                <div className="n">
                  {s.n}
                  {s.unit && <small>{s.unit}</small>}
                </div>
                <div className="k">{s.k}</div>
              </div>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  );
}
