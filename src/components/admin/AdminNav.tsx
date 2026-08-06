"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/certifications", label: "Certifications" },
  { href: "/admin/patents", label: "Patents" },
  { href: "/admin/achievements", label: "Achievements" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/messages", label: "Messages" },
];

export function AdminNav({ counts = {} }: { counts?: Record<string, number> }) {
  const pathname = usePathname();
  return (
    <nav className="admin-nav">
      {LINKS.map((l) => {
        const active =
          l.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(l.href);
        const count = counts[l.href];
        return (
          <Link key={l.href} href={l.href} className={active ? "active" : ""}>
            {l.label}
            {typeof count === "number" && <span className="count">{count}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
