"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminNav } from "./AdminNav";
import { signOut } from "@/app/admin/actions";

export function AdminSidebar({ counts }: { counts?: Record<string, number> }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <aside className={`admin-side${open ? " open" : ""}`}>
      <div className="admin-bar">
        <div className="admin-brand">
          Shlok Goenka <span className="v">/ admin</span>
        </div>
        <button
          type="button"
          className="admin-burger"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <i />
          <i />
          <i />
        </button>
      </div>
      <div className="admin-panel">
        <AdminNav counts={counts} />
        <div className="admin-side-foot">
          <Link href="/" target="_blank">
            View site ↗
          </Link>
          <form action={signOut}>
            <button className="a-btn ghost sm" type="submit">
              Sign out
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
