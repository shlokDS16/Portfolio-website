import { requireAdmin } from "@/lib/dal";
import { getSiteSettings } from "@/lib/data";
import { AdminShell } from "@/components/admin/AdminShell";
import { SettingsManager } from "@/components/admin/SettingsManager";

export const dynamic = "force-dynamic";

export default async function AdminSettings() {
  await requireAdmin();
  const settings = await getSiteSettings();

  return (
    <AdminShell title="Site settings" subtitle="Hero, stats, contact, résumé">
      <SettingsManager settings={settings} />
    </AdminShell>
  );
}
