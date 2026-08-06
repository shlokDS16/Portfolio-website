import { requireAdmin } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProjectsManager } from "@/components/admin/ProjectsManager";
import type { Project } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminProjects() {
  await requireAdmin();
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*, project_images(*)")
    .order("sort_order", { ascending: true });

  const projects = ((data ?? []) as Project[]).map((p) => ({
    ...p,
    project_images: (p.project_images ?? []).sort(
      (a, b) => a.sort_order - b.sort_order,
    ),
  }));

  return (
    <AdminShell
      title="Projects"
      subtitle={`${projects.length} project(s) · drag to reorder`}
    >
      <ProjectsManager initial={projects} />
    </AdminShell>
  );
}
