"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { Achievement } from "@/lib/types";
import { SortableList } from "./SortableList";
import { Drawer } from "./Drawer";
import { TextField, TextArea, ArrayField } from "./Fields";
import {
  saveAchievement,
  deleteAchievement,
  reorder,
  togglePublished,
  type AchievementInput,
} from "@/app/admin/actions";

type Form = AchievementInput;

const emptyForm = (sort_order: number): Form => ({
  title: "",
  subtitle: "",
  type: "award",
  period: "",
  details: [],
  published: true,
  sort_order,
});

export function AchievementsManager({ initial }: { initial: Achievement[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [openId, setOpenId] = useState<string | "new" | null>(null);
  const [form, setForm] = useState<Form | null>(null);
  const [pending, start] = useTransition();

  useEffect(() => setItems(initial), [initial]);

  function set<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((f) => (f ? { ...f, [key]: value } : f));
  }
  function openNew() {
    const maxOrder = items.reduce((m, x) => Math.max(m, x.sort_order), 0);
    setForm(emptyForm(maxOrder + 1));
    setOpenId("new");
  }
  function openEdit(a: Achievement) {
    setForm({
      id: a.id,
      title: a.title,
      subtitle: a.subtitle,
      type: a.type,
      period: a.period,
      details: a.details,
      published: a.published,
      sort_order: a.sort_order,
    });
    setOpenId(a.id);
  }
  function close() {
    setOpenId(null);
    setForm(null);
  }

  function onSave() {
    if (!form) return;
    if (!form.title.trim()) return void toast.error("Title is required.");
    start(async () => {
      const res = await saveAchievement({
        ...form,
        id: openId && openId !== "new" ? openId : undefined,
      });
      if (!res.ok) return void toast.error(res.error ?? "Save failed.");
      toast.success("Achievement saved.");
      close();
      router.refresh();
    });
  }
  function onDelete(a: Achievement) {
    if (!confirm(`Delete “${a.title}”?`)) return;
    start(async () => {
      const res = await deleteAchievement(a.id);
      if (!res.ok) return void toast.error(res.error ?? "Delete failed.");
      setItems((xs) => xs.filter((x) => x.id !== a.id));
      toast.success("Deleted.");
      router.refresh();
    });
  }
  function onToggle(a: Achievement) {
    const next = !a.published;
    setItems((xs) => xs.map((x) => (x.id === a.id ? { ...x, published: next } : x)));
    start(async () => {
      const res = await togglePublished("achievements", a.id, next);
      if (!res.ok) {
        toast.error("Update failed.");
        setItems((xs) =>
          xs.map((x) => (x.id === a.id ? { ...x, published: a.published } : x)),
        );
      }
    });
  }
  function onReorder(next: Achievement[]) {
    setItems(next);
    start(async () => {
      const res = await reorder(
        "achievements",
        next.map((p, i) => ({ id: p.id, sort_order: i + 1 })),
      );
      if (!res.ok) {
        toast.error("Reorder failed.");
        setItems(initial);
      }
    });
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <button className="a-btn" onClick={openNew} type="button">
          + New achievement
        </button>
      </div>

      {items.length === 0 ? (
        <div className="a-empty">No achievements yet.</div>
      ) : (
        <SortableList
          items={items}
          onReorder={onReorder}
          render={(a, handle) => (
            <>
              {handle}
              <div className="grow">
                <div className="title">{a.title}</div>
                <div className="meta">
                  {a.period} · {a.subtitle}
                </div>
              </div>
              <span className={`badge ${a.published ? "on" : "off"}`}>
                {a.published ? "Live" : "Hidden"}
              </span>
              <div className="actions">
                <button className="a-toggle" onClick={() => onToggle(a)} type="button">
                  {a.published ? "Unpublish" : "Publish"}
                </button>
                <button className="a-btn ghost sm" onClick={() => openEdit(a)} type="button">
                  Edit
                </button>
                <button className="a-btn danger sm" onClick={() => onDelete(a)} type="button">
                  Delete
                </button>
              </div>
            </>
          )}
        />
      )}

      {form && (
        <Drawer
          title={openId === "new" ? "New achievement" : "Edit achievement"}
          onClose={close}
          footer={
            <>
              <button className="a-btn ghost" onClick={close} type="button">
                Cancel
              </button>
              <button className="a-btn" onClick={onSave} disabled={pending} type="button">
                {pending ? "Saving…" : "Save"}
              </button>
            </>
          }
        >
          <TextField label="Title" value={form.title} onChange={(v) => set("title", v)} />
          <TextField
            label="Subtitle"
            value={form.subtitle ?? ""}
            onChange={(v) => set("subtitle", v)}
          />
          <div className="a-grid2">
            <TextField
              label="Type"
              value={form.type ?? ""}
              onChange={(v) => set("type", v)}
              hint="award / extracurricular"
            />
            <TextField
              label="Period"
              value={form.period ?? ""}
              onChange={(v) => set("period", v)}
              hint="e.g. 2026"
            />
          </div>
          <ArrayField
            label="Details"
            value={form.details}
            onChange={(v) => set("details", v)}
          />
          <label className="a-check">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => set("published", e.target.checked)}
            />
            Published
          </label>
        </Drawer>
      )}
    </>
  );
}
