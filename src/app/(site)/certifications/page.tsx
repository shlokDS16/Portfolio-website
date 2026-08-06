import type { Metadata } from "next";
import { getCertifications, getAchievements, getSkillGroups } from "@/lib/data";
import { CertGrid } from "@/components/site/CertGrid";
import { Reveal } from "@/components/site/Reveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "Certifications, achievements, and technical skills of Shlok Kumar Goenka.",
};

export default async function CertificationsPage() {
  const [certifications, achievements, skillGroups] = await Promise.all([
    getCertifications(),
    getAchievements(),
    getSkillGroups(),
  ]);

  return (
    <>
      <section
        className="sec"
        id="certs"
        style={{ paddingTop: "clamp(96px,14vw,150px)" }}
      >
        <div className="wrap">
          <Reveal className="shead">
            <h2>Certifications</h2>
            <div className="c">
              CREDENTIALS
              <br />
              {String(certifications.length).padStart(2, "0")} ISSUED
            </div>
          </Reveal>
          <Reveal>
            <CertGrid certifications={certifications} />
          </Reveal>
        </div>
      </section>

      <section
        className="sec"
        style={{
          background: "var(--band)",
          borderTop: "1px solid var(--rule)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div className="wrap">
          <Reveal className="shead">
            <h2>Achievements</h2>
            <div className="c">
              RECOGNITION
              <br />&amp; COMMUNITY
            </div>
          </Reveal>
          <Reveal>
            {achievements.map((a) => (
              <div className="pat" key={a.id}>
                <div className="pid">{a.period}</div>
                <div>
                  <div className="pt">{a.title}</div>
                  {a.subtitle && (
                    <p className="pdesc" style={{ marginTop: 10, maxWidth: "70ch" }}>
                      {a.subtitle}
                    </p>
                  )}
                  {a.details.length > 0 && (
                    <div className="chips" style={{ marginTop: 14 }}>
                      {a.details.map((d, i) => (
                        <span className="chip" key={i} style={{ textTransform: "none" }}>
                          {d}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="px">{a.type}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <Reveal className="shead">
            <h2>Skills</h2>
            <div className="c">
              TECHNICAL
              <br />
              STACK
            </div>
          </Reveal>
          <div style={{ display: "grid", gap: 28 }}>
            {skillGroups.map((g) => (
              <Reveal key={g.id}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(0,1fr)",
                    gap: 14,
                    paddingBottom: 26,
                    borderBottom: "1px solid var(--rule)",
                  }}
                >
                  <div
                    className="ey"
                    style={{ color: "var(--ink2)", fontSize: 13 }}
                  >
                    {g.name}
                  </div>
                  <div className="chips" style={{ marginTop: 0 }}>
                    {g.skills.map((s, i) => (
                      <span className="chip" key={i} style={{ textTransform: "none" }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
