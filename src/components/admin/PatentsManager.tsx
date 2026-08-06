"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { Patent } from "@/lib/types";
import { SortableList } from "./SortableList";
import { Drawer } from "./Drawer";
import { TextField, TextArea, ArrayField } from "./Fields";
import {
  savePatent,
  deletePatent,
  reorder,
  togglePublished,
  type PatentInput,
} from "@/app/admin/actions";

type Form = PatentInput;

const emptyForm = (sort_order: number): Form => ({
  title: "",
  application_number: "",
  abstract: "",
  tags: [],
  status: "filed",
  published: true,
  sort_order,
});

export function PatentsManager({ initial }: { initial: Patent[] }) {
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
  function openEdit(p: Patent) {
    setForm({
      id: p.id,
      title: p.title,
      application_number: p.application_number,
      abstract: p.abstract,
      tags: p.tags,
      status: p.status,
      published: p.published,
      sort_order: p.sort_order,
    });
    setOpenId(p.id);
  }
  function close() {
    setOpenId(null);
    setForm(null);
  }

  function onSave() {
    if (!form) return;
    if (!form.title.trim()) return void toast.error("Title is required.");
    start(async () => {
      const res = await savePatent({
        ...form,
        id: openId && openId !== "new" ? openId : undefined,
      });
      if (!res.ok) return void toast.error(res.error ?? "Save failed.");
      toast.success("Patent saved.");
      close();
      router.refresh();
    });
  }
  function onDelete(p: Patent) {
    if (!confirm(`Delete “${p.title}”?`)) return;
    start(async () => {
      const res = await deletePatent(p.id);
      if (!res.ok) return void toast.error(res.error ?? "Delete failed.");
      setItems((xs) => xs.filter((x) => x.id !== p.id));
      toast.success("Deleted.");
      router.refresh();
    });
  }
  function onToggle(p: Patent) {
    const next = !p.published;
    setItems((xs) => xs.map((x) => (x.id === p.id ? { ...x, published: next } : x)));
    start(async () => {
      const res = await togglePublished("patents", p.id, next);
      if (!res.ok) {
        toast.error("Update failed.");
        setItems((xs) =>
          xs.map((x) => (x.id === p.id ? { ...x, published: p.published } : x)),
        );
      }
    });
  }
  function onReorder(next: Patent[]) {
    setItems(next);
    start(async () => {
      const res = await reorder(
        "patents",
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
          + New patent
        </button>
      </div>

      {items.length === 0 ? (
        <div className="a-empty">No patents yet.</div>
      ) : (
        <SortableList
          items={items}
          onReorder={onReorder}
          render={(p, handle) => (
            <>
              {handle}
              <div className="grow">
                <div className="title">{p.title}</div>
                <div className="meta">
                  {p.application_number} · {p.tags.join(" · ")}
                </div>
              </div>
              <span className={`badge ${p.published ? "on" : "off"}`}>
                {p.published ? "Live" : "Hidden"}
              </span>
              <div className="actions">
                <button className="a-toggle" onClick={() => onToggle(p)} type="button">
                  {p.published ? "Unpublish" : "Publish"}
                </button>
                <button className="a-btn ghost sm" onClick={() => openEdit(p)} type="button">
                  Edit
                </button>
                <button className="a-btn danger sm" onClick={() => onDelete(p)} type="button">
                  Delete
                </button>
              </div>
            </>
          )}
        />
      )}

      {form && (
        <Drawer
          title={openId === "new" ? "New patent" : "Edit patent"}
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
          <div className="a-grid2">
            <TextField
              label="Application number"
              value={form.application_number ?? ""}
              onChange={(v) => set("application_number", v)}
            />
            <TextField label="Status" value={form.status} onChange={(v) => set("status", v)} />
          </div>
          <TextArea
            label="Abstract"
            value={form.abstract ?? ""}
            onChange={(v) => set("abstract", v)}
          />
          <ArrayField label="Tags" value={form.tags} onChange={(v) => set("tags", v)} />
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
