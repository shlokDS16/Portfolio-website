import { requireAdmin } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { AdminShell } from "@/components/admin/AdminShell";
import { AchievementsManager } from "@/components/admin/AchievementsManager";
import type { Achievement } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminAchievements() {
  await requireAdmin();
  const supabase = await createClient();
  const { data } = await supabase
    .from("achievements")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <AdminShell
      title="Achievements"
      subtitle={`${data?.length ?? 0} achievement(s) · drag to reorder`}
    >
      <AchievementsManager initial={(data ?? []) as Achievement[]} />
    </AdminShell>
  );
}
