import { Hero } from "@/components/site/Hero";
import { Ticker } from "@/components/site/Ticker";
import { Reveal } from "@/components/site/Reveal";
import { ProjectCard } from "@/components/site/ProjectCard";
import { CertGrid } from "@/components/site/CertGrid";
import { Patents } from "@/components/site/Patents";
import { ContactForm } from "@/components/site/ContactForm";
import {
  getSiteSettings,
  getProjects,
  getCertifications,
  getPatents,
} from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [settings, projects, certifications, patents] = await Promise.all([
    getSiteSettings(),
    getProjects(),
    getCertifications(),
    getPatents(),
  ]);

  const contact = settings.contact ?? {};
  const socials = settings.socials ?? {};
  const formspree = contact.formspree ?? "https://formspree.io/f/maqdglqw";

  return (
    <>
      <Hero settings={settings} />

      <Ticker skills={settings.ticker} />

      <section className="sec" id="work">
        <div className="wrap">
          <Reveal className="shead">
            <h2>
              Selected
              <br />
              Work
            </h2>
            <div className="c">
              {String(projects.length).padStart(2, "0")} PROJECTS
              <br />
              2024 / 2026
            </div>
          </Reveal>
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </section>

      <section
        className="sec"
        id="certs"
        style={{
          background: "var(--band)",
          borderTop: "1px solid var(--rule)",
          borderBottom: "1px solid var(--rule)",
        }}
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

      <section className="sec" id="patents">
        <div className="wrap">
          <Reveal className="shead">
            <h2>Patents</h2>
            <div className="c">
              FILED · INDIAN PATENT OFFICE
              <br />
              {String(patents.length).padStart(2, "0")} APPLICATIONS
            </div>
          </Reveal>
          <Patents patents={patents} />
        </div>
      </section>

      <section
        className="sec"
        id="contact"
        style={{ background: "var(--band)", borderTop: "1px solid var(--rule)" }}
      >
        <div className="wrap">
          <Reveal className="shead">
            <h2>Let&rsquo;s talk</h2>
            <div className="c">
              RESPONSE WITHIN
              <br />
              24 HOURS
            </div>
          </Reveal>
          <Reveal className="contact">
            <ContactForm formspree={formspree} />
            <div className="cinfo">
              {contact.email && (
                <div className="row">
                  <span className="k">Email</span>
                  <a className="v" href={`mailto:${contact.email}`}>
                    {contact.email}
                  </a>
                </div>
              )}
              {contact.phone && (
                <div className="row">
                  <span className="k">Phone</span>
                  <a className="v" href={`tel:${contact.phone.replace(/\s/g, "")}`}>
                    {contact.phone}
                  </a>
                </div>
              )}
              {contact.location && (
                <div className="row">
                  <span className="k">Location</span>
                  <span className="v">{contact.location}</span>
                </div>
              )}
              <div className="row">
                <span className="k">Elsewhere</span>
                <span className="v">
                  {socials.github && (
                    <a href={socials.github} target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  )}
                  {socials.github && socials.linkedin && " · "}
                  {socials.linkedin && (
                    <a
                      href={socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  )}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
