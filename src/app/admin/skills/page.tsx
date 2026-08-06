import { requireAdmin } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { AdminShell } from "@/components/admin/AdminShell";
import { SkillsManager } from "@/components/admin/SkillsManager";
import type { SkillGroup } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminSkills() {
  await requireAdmin();
  const supabase = await createClient();
  const { data } = await supabase
    .from("skill_groups")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <AdminShell
      title="Skills"
      subtitle={`${data?.length ?? 0} group(s) · drag to reorder`}
    >
      <SkillsManager initial={(data ?? []) as SkillGroup[]} />
    </AdminShell>
  );
}
