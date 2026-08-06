import type { Metadata } from "next";
import { getProjects } from "@/lib/data";
import { ProjectCard } from "@/components/site/ProjectCard";
import { Reveal } from "@/components/site/Reveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work by Shlok Kumar Goenka — civic AI, fintech, privacy, and healthcare platforms.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section className="sec" id="work" style={{ paddingTop: "clamp(96px,14vw,150px)" }}>
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
  );
}
