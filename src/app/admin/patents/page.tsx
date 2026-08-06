import { requireAdmin } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { AdminShell } from "@/components/admin/AdminShell";
import { PatentsManager } from "@/components/admin/PatentsManager";
import type { Patent } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminPatents() {
  await requireAdmin();
  const supabase = await createClient();
  const { data } = await supabase
    .from("patents")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <AdminShell
      title="Patents"
      subtitle={`${data?.length ?? 0} patent(s) · drag to reorder`}
    >
      <PatentsManager initial={(data ?? []) as Patent[]} />
    </AdminShell>
  );
}
