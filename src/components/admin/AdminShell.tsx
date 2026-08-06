import Link from "next/link";
import type { ReactNode } from "react";
import { AdminNav } from "./AdminNav";
import { signOut } from "@/app/admin/actions";

export function AdminShell({
  title,
  subtitle,
  action,
  counts,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  counts?: Record<string, number>;
  children: ReactNode;
}) {
  return (
    <div className="admin">
      <aside className="admin-side">
        <div className="admin-brand">
          SHLOK.SYS <span className="v">/ admin</span>
        </div>
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
      </aside>
      <div className="admin-main">
        <header className="admin-head">
          <div>
            <h1>{title}</h1>
            {subtitle && <div className="sub">{subtitle}</div>}
          </div>
          {action}
        </header>
        {children}
      </div>
    </div>
  );
}
