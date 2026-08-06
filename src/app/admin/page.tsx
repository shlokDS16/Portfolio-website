import Link from "next/link";
import { requireAdmin } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { AdminShell } from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  await requireAdmin();
  const supabase = await createClient();

  const tables = [
    "projects",
    "certifications",
    "patents",
    "achievements",
    "skill_groups",
  ];
  const counts = await Promise.all(
    tables.map(async (t) => {
      const { count } = await supabase
        .from(t)
        .select("*", { count: "exact", head: true });
      return count ?? 0;
    }),
  );
  const { count: unread } = await supabase
    .from("contact_messages")
    .select("*", { count: "exact", head: true })
    .eq("is_read", false);

  const cards = [
    { k: "Projects", n: counts[0], href: "/admin/projects" },
    { k: "Certifications", n: counts[1], href: "/admin/certifications" },
    { k: "Patents", n: counts[2], href: "/admin/patents" },
    { k: "Achievements", n: counts[3], href: "/admin/achievements" },
    { k: "Skill groups", n: counts[4], href: "/admin/skills" },
    { k: "Unread messages", n: unread ?? 0, href: "/admin/messages" },
  ];

  return (
    <AdminShell title="Dashboard" subtitle="Portfolio content overview">
      <div className="admin-stats">
        {cards.map((c) => (
          <Link key={c.k} href={c.href} className="admin-stat">
            <div className="n">{String(c.n).padStart(2, "0")}</div>
            <div className="k">{c.k}</div>
          </Link>
        ))}
      </div>

      <div className="a-empty" style={{ textAlign: "left", lineHeight: 1.7 }}>
        Manage each content type from the sidebar. Changes publish to the live
        site immediately. Upload project screenshots and certification images
        directly in their editors — drag to reorder, toggle publish to show or
        hide items without deleting them.
      </div>
    </AdminShell>
  );
}
