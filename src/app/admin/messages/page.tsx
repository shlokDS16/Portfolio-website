import { requireAdmin } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { AdminShell } from "@/components/admin/AdminShell";
import { MessagesManager } from "@/components/admin/MessagesManager";
import type { ContactMessage } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminMessages() {
  await requireAdmin();
  const supabase = await createClient();
  const { data } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  const messages = (data ?? []) as ContactMessage[];
  const unread = messages.filter((m) => !m.is_read).length;

  return (
    <AdminShell
      title="Messages"
      subtitle={`${messages.length} message(s) · ${unread} unread`}
    >
      <MessagesManager initial={messages} />
    </AdminShell>
  );
}
