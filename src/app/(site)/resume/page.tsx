import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Résumé",
  description: "Résumé of Shlok Kumar Goenka — Technical Product Analyst.",
};

const LOCAL_RESUME = "/Shlok_Kumar_Goenka_Resume.pdf";

export default async function ResumePage() {
  const settings = await getSiteSettings();
  const url = settings.resume?.url || LOCAL_RESUME;

  return (
    <section className="sec" style={{ paddingTop: "clamp(96px,14vw,150px)" }}>
      <div className="wrap">
        <div className="shead">
          <h2>Résumé</h2>
          <div className="c">
            TECHNICAL PRODUCT ANALYST
            <br />
            UPDATED 2026
          </div>
        </div>

        <div className="plinks" style={{ marginTop: 0, marginBottom: 40 }}>
          <a
            className="plink magnetic"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in new tab ↗
          </a>
          <a className="plink g magnetic" href={url} download>
            Download PDF ↓
          </a>
        </div>

        <div
          style={{
            border: "1px solid var(--rule2)",
            borderRadius: 10,
            overflow: "hidden",
            background: "var(--raised)",
            boxShadow: "var(--shadow)",
            height: "min(85vh, 1100px)",
          }}
        >
          <iframe
            src={`${url}#view=FitH`}
            title="Résumé — Shlok Kumar Goenka"
            style={{ width: "100%", height: "100%", border: "none" }}
          />
        </div>
      </div>
    </section>
  );
}
