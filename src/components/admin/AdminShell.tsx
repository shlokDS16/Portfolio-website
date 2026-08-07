import type { ReactNode } from "react";
import { AdminSidebar } from "./AdminSidebar";

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
      <AdminSidebar counts={counts} />
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
