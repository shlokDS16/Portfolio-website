import { requireAdmin } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { AdminShell } from "@/components/admin/AdminShell";
import { CertificationsManager } from "@/components/admin/CertificationsManager";
import type { Certification } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminCertifications() {
  await requireAdmin();
  const supabase = await createClient();
  const { data } = await supabase
    .from("certifications")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <AdminShell
      title="Certifications"
      subtitle={`${data?.length ?? 0} certification(s) · drag to reorder`}
    >
      <CertificationsManager initial={(data ?? []) as Certification[]} />
    </AdminShell>
  );
}
