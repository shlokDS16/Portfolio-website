"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { ContactMessage } from "@/lib/types";
import { markMessageRead, deleteMessage } from "@/app/admin/actions";

export function MessagesManager({ initial }: { initial: ContactMessage[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [openId, setOpenId] = useState<string | null>(null);
  const [, start] = useTransition();

  useEffect(() => setItems(initial), [initial]);

  function toggleOpen(m: ContactMessage) {
    const opening = openId !== m.id;
    setOpenId(opening ? m.id : null);
    if (opening && !m.is_read) markRead(m, true, true);
  }

  function markRead(m: ContactMessage, is_read: boolean, silent = false) {
    setItems((xs) => xs.map((x) => (x.id === m.id ? { ...x, is_read } : x)));
    start(async () => {
      const res = await markMessageRead(m.id, is_read);
      if (!res.ok) {
        toast.error("Update failed.");
        setItems((xs) =>
          xs.map((x) => (x.id === m.id ? { ...x, is_read: m.is_read } : x)),
        );
        return;
      }
      if (!silent) toast.success(is_read ? "Marked read." : "Marked unread.");
      router.refresh();
    });
  }

  function onDelete(m: ContactMessage) {
    if (!confirm("Delete this message?")) return;
    start(async () => {
      const res = await deleteMessage(m.id);
      if (!res.ok) return void toast.error(res.error ?? "Delete failed.");
      setItems((xs) => xs.filter((x) => x.id !== m.id));
      toast.success("Deleted.");
      router.refresh();
    });
  }

  if (items.length === 0) {
    return <div className="a-empty">No messages yet.</div>;
  }

  return (
    <div className="a-list">
      {items.map((m) => (
        <div key={m.id} style={{ borderTop: "1px solid var(--rule)" }}>
          <div className="a-row" style={{ borderTop: "none" }}>
            <span
              className="badge"
              style={{
                background: m.is_read ? "transparent" : "var(--blue)",
                borderColor: m.is_read ? "var(--rule2)" : "var(--blue)",
                color: m.is_read ? "var(--ink4)" : "#fff",
              }}
            >
              {m.is_read ? "Read" : "New"}
            </span>
            <div
              className="grow"
              style={{ cursor: "pointer" }}
              onClick={() => toggleOpen(m)}
            >
              <div className="title">{m.subject || "(no subject)"}</div>
              <div className="meta">
                {m.name} · {m.email} ·{" "}
                {m.created_at ? new Date(m.created_at).toLocaleString() : ""}
              </div>
            </div>
            <div className="actions">
              <button
                className="a-toggle"
                onClick={() => markRead(m, !m.is_read)}
                type="button"
              >
                {m.is_read ? "Mark unread" : "Mark read"}
              </button>
              {m.email && (
                <a
                  className="a-btn ghost sm"
                  href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject ?? "")}`}
                >
                  Reply
                </a>
              )}
              <button className="a-btn danger sm" onClick={() => onDelete(m)} type="button">
                Delete
              </button>
            </div>
          </div>
          {openId === m.id && (
            <div
              style={{
                padding: "0 16px 18px 52px",
                color: "var(--ink2)",
                fontSize: 15,
                lineHeight: 1.6,
                whiteSpace: "pre-wrap",
              }}
            >
              {m.message}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
