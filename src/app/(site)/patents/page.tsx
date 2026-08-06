import type { Metadata } from "next";
import { getPatents } from "@/lib/data";
import { Reveal } from "@/components/site/Reveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Patents",
  description:
    "Patent applications filed with the Indian Patent Office by Shlok Kumar Goenka.",
};

export default async function PatentsPage() {
  const patents = await getPatents();

  return (
    <section className="sec" id="patents" style={{ paddingTop: "clamp(96px,14vw,150px)" }}>
      <div className="wrap">
        <Reveal className="shead">
          <h2>Patents</h2>
          <div className="c">
            FILED · INDIAN PATENT OFFICE
            <br />
            {String(patents.length).padStart(2, "0")} APPLICATIONS
          </div>
        </Reveal>

        <Reveal>
          {patents.map((p) => (
            <div className="pat" key={p.id}>
              <div className="pid">{p.application_number}</div>
              <div>
                <div className="pt">{p.title}</div>
                {p.abstract && (
                  <p
                    className="pdesc"
                    style={{ marginTop: 12, maxWidth: "70ch" }}
                  >
                    {p.abstract}
                  </p>
                )}
              </div>
              <div className="px">{p.tags.join(" · ")}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
