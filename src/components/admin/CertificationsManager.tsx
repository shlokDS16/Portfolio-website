"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { Certification } from "@/lib/types";
import { SortableList } from "./SortableList";
import { Drawer } from "./Drawer";
import { TextField } from "./Fields";
import { uploadToStorage } from "./upload";
import {
  saveCertification,
  deleteCertification,
  reorder,
  togglePublished,
  type CertificationInput,
} from "@/app/admin/actions";

type Form = CertificationInput;

const emptyForm = (sort_order: number): Form => ({
  title: "",
  issuer: "",
  issued_year: "",
  valid_until: "",
  note: "",
  image_url: null,
  published: true,
  sort_order,
});

export function CertificationsManager({ initial }: { initial: Certification[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [openId, setOpenId] = useState<string | "new" | null>(null);
  const [form, setForm] = useState<Form | null>(null);
  const [pending, start] = useTransition();
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => setItems(initial), [initial]);

  function set<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((f) => (f ? { ...f, [key]: value } : f));
  }

  function openNew() {
    const maxOrder = items.reduce((m, x) => Math.max(m, x.sort_order), 0);
    setForm(emptyForm(maxOrder + 1));
    setOpenId("new");
  }
  function openEdit(c: Certification) {
    setForm({
      id: c.id,
      title: c.title,
      issuer: c.issuer,
      issued_year: c.issued_year,
      valid_until: c.valid_until,
      note: c.note,
      image_url: c.image_url,
      published: c.published,
      sort_order: c.sort_order,
    });
    setOpenId(c.id);
  }
  function close() {
    setOpenId(null);
    setForm(null);
  }

  function onSave() {
    if (!form) return;
    if (!form.title.trim()) return void toast.error("Title is required.");
    start(async () => {
      const res = await saveCertification({
        ...form,
        id: openId && openId !== "new" ? openId : undefined,
      });
      if (!res.ok) return void toast.error(res.error ?? "Save failed.");
      toast.success("Certification saved.");
      close();
      router.refresh();
    });
  }

  function onDelete(c: Certification) {
    if (!confirm(`Delete “${c.title}”?`)) return;
    start(async () => {
      const res = await deleteCertification(c.id);
      if (!res.ok) return void toast.error(res.error ?? "Delete failed.");
      setItems((xs) => xs.filter((x) => x.id !== c.id));
      toast.success("Deleted.");
      router.refresh();
    });
  }

  function onToggle(c: Certification) {
    const next = !c.published;
    setItems((xs) => xs.map((x) => (x.id === c.id ? { ...x, published: next } : x)));
    start(async () => {
      const res = await togglePublished("certifications", c.id, next);
      if (!res.ok) {
        toast.error("Update failed.");
        setItems((xs) =>
          xs.map((x) => (x.id === c.id ? { ...x, published: c.published } : x)),
        );
      }
    });
  }

  function onReorder(next: Certification[]) {
    setItems(next);
    start(async () => {
      const res = await reorder(
        "certifications",
        next.map((p, i) => ({ id: p.id, sort_order: i + 1 })),
      );
      if (!res.ok) {
        toast.error("Reorder failed.");
        setItems(initial);
      }
    });
  }

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToStorage(file, "certifications");
      set("image_url", url);
      toast.success("Image uploaded.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <button className="a-btn" onClick={openNew} type="button">
          + New certification
        </button>
      </div>

      {items.length === 0 ? (
        <div className="a-empty">No certifications yet.</div>
      ) : (
        <SortableList
          items={items}
          onReorder={onReorder}
          render={(c, handle) => (
            <>
              {handle}
              {c.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="thumb" src={c.image_url} alt="" />
              ) : (
                <div className="thumb" />
              )}
              <div className="grow">
                <div className="title">{c.title}</div>
                <div className="meta">{c.issuer}</div>
              </div>
              <span className={`badge ${c.published ? "on" : "off"}`}>
                {c.published ? "Live" : "Hidden"}
              </span>
              <div className="actions">
                <button className="a-toggle" onClick={() => onToggle(c)} type="button">
                  {c.published ? "Unpublish" : "Publish"}
                </button>
                <button className="a-btn ghost sm" onClick={() => openEdit(c)} type="button">
                  Edit
                </button>
                <button className="a-btn danger sm" onClick={() => onDelete(c)} type="button">
                  Delete
                </button>
              </div>
            </>
          )}
        />
      )}

      {form && (
        <Drawer
          title={openId === "new" ? "New certification" : "Edit certification"}
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
            label="Issuer"
            value={form.issuer ?? ""}
            onChange={(v) => set("issuer", v)}
          />
          <div className="a-grid2">
            <TextField
              label="Issued year"
              value={form.issued_year ?? ""}
              onChange={(v) => set("issued_year", v)}
              hint="e.g. 2026 or ongoing"
            />
            <TextField
              label="Valid until"
              value={form.valid_until ?? ""}
              onChange={(v) => set("valid_until", v)}
              hint="optional"
            />
          </div>
          <TextField
            label="Note"
            value={form.note ?? ""}
            onChange={(v) => set("note", v)}
            hint="e.g. exam Aug 2026"
          />

          <div className="a-field">
            <label>Certificate image</label>
            <div className="a-uploads">
              {form.image_url && (
                <div className="a-upitem">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={form.image_url} alt="" />
                  <button type="button" onClick={() => set("image_url", null)} aria-label="Remove">
                    ✕
                  </button>
                </div>
              )}
            </div>
            <div
              className="a-drop"
              onClick={() => fileRef.current?.click()}
              style={{ marginTop: form.image_url ? 10 : 0 }}
            >
              {uploading ? "Uploading…" : form.image_url ? "Replace image" : "+ Upload image"}
            </div>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={onUpload} />
            <span className="hint">No image → a monogram badge is shown instead.</span>
          </div>

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
