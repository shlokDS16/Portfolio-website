"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { Project } from "@/lib/types";
import { SortableList } from "./SortableList";
import { Drawer } from "./Drawer";
import { TextField, TextArea, ArrayField, CheckField } from "./Fields";
import { uploadToStorage } from "./upload";
import {
  saveProject,
  deleteProject,
  reorder,
  togglePublished,
  addProjectImage,
  deleteProjectImage,
  type ProjectInput,
} from "@/app/admin/actions";

type Form = ProjectInput;

const emptyForm = (sort_order: number): Form => ({
  slug: "",
  name: "",
  subtitle: "",
  category: "",
  description: "",
  tech: [],
  metrics: [],
  live_url: "",
  github_url: "",
  featured: true,
  hackathon_win: false,
  published: true,
  sort_order,
});

export function ProjectsManager({ initial }: { initial: Project[] }) {
  const router = useRouter();
  const [items, setItems] = useState<Project[]>(initial);
  const [openId, setOpenId] = useState<string | "new" | null>(null);
  const [form, setForm] = useState<Form | null>(null);
  const [pending, start] = useTransition();
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => setItems(initial), [initial]);

  const editing =
    openId && openId !== "new" ? items.find((p) => p.id === openId) ?? null : null;
  const images = editing?.project_images ?? [];

  function set<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((f) => (f ? { ...f, [key]: value } : f));
  }

  function openNew() {
    const maxOrder = items.reduce((m, p) => Math.max(m, p.sort_order), 0);
    setForm(emptyForm(maxOrder + 1));
    setOpenId("new");
  }

  function openEdit(p: Project) {
    setForm({
      id: p.id,
      slug: p.slug,
      name: p.name,
      subtitle: p.subtitle,
      category: p.category,
      description: p.description,
      tech: p.tech,
      metrics: p.metrics,
      live_url: p.live_url,
      github_url: p.github_url,
      featured: p.featured,
      hackathon_win: p.hackathon_win,
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
    if (!form.name.trim() || !form.slug.trim()) {
      toast.error("Name and slug are required.");
      return;
    }
    start(async () => {
      const res = await saveProject({
        ...form,
        id: openId && openId !== "new" ? openId : undefined,
      });
      if (!res.ok) {
        toast.error(res.error ?? "Save failed.");
        return;
      }
      toast.success("Project saved.");
      if (openId === "new" && res.id) setOpenId(res.id);
      router.refresh();
    });
  }

  function onDelete(p: Project) {
    if (!confirm(`Delete “${p.name}”? This cannot be undone.`)) return;
    start(async () => {
      const res = await deleteProject(p.id);
      if (!res.ok) return void toast.error(res.error ?? "Delete failed.");
      setItems((xs) => xs.filter((x) => x.id !== p.id));
      toast.success("Project deleted.");
      if (openId === p.id) close();
      router.refresh();
    });
  }

  function onToggle(p: Project) {
    const next = !p.published;
    setItems((xs) =>
      xs.map((x) => (x.id === p.id ? { ...x, published: next } : x)),
    );
    start(async () => {
      const res = await togglePublished("projects", p.id, next);
      if (!res.ok) {
        toast.error(res.error ?? "Update failed.");
        setItems((xs) =>
          xs.map((x) => (x.id === p.id ? { ...x, published: p.published } : x)),
        );
      }
    });
  }

  function onReorder(next: Project[]) {
    setItems(next);
    start(async () => {
      const res = await reorder(
        "projects",
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
    if (!file || !editing) return;
    setUploading(true);
    try {
      const url = await uploadToStorage(file, "project-images", editing.slug);
      const res = await addProjectImage({
        project_id: editing.id,
        url,
        alt: editing.name,
        sort_order: images.length,
      });
      if (!res.ok) throw new Error(res.error);
      toast.success("Image added.");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function onDeleteImage(id: string, url: string) {
    start(async () => {
      const res = await deleteProjectImage(id, url);
      if (!res.ok) return void toast.error(res.error ?? "Delete failed.");
      toast.success("Image removed.");
      router.refresh();
    });
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <button className="a-btn" onClick={openNew} type="button">
          + New project
        </button>
      </div>

      {items.length === 0 ? (
        <div className="a-empty">No projects yet. Create your first one.</div>
      ) : (
        <SortableList
          items={items}
          onReorder={onReorder}
          render={(p, handle) => (
            <>
              {handle}
              {p.project_images?.[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="thumb" src={p.project_images[0].url} alt="" />
              ) : (
                <div className="thumb" />
              )}
              <div className="grow">
                <div className="title">{p.name}</div>
                <div className="meta">
                  {p.category} · {p.project_images?.length ?? 0} image(s)
                  {p.hackathon_win ? " · winner" : ""}
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
          title={openId === "new" ? "New project" : "Edit project"}
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
          <div className="a-grid2">
            <TextField label="Name" value={form.name} onChange={(v) => set("name", v)} />
            <TextField
              label="Slug"
              value={form.slug}
              onChange={(v) => set("slug", v)}
              hint="url-safe, unique"
            />
          </div>
          <div className="a-grid2">
            <TextField
              label="Subtitle"
              value={form.subtitle ?? ""}
              onChange={(v) => set("subtitle", v)}
            />
            <TextField
              label="Category"
              value={form.category ?? ""}
              onChange={(v) => set("category", v)}
              hint="e.g. Fintech"
            />
          </div>
          <TextArea
            label="Description"
            value={form.description ?? ""}
            onChange={(v) => set("description", v)}
          />
          <div className="a-grid2">
            <ArrayField label="Tech" value={form.tech} onChange={(v) => set("tech", v)} />
            <ArrayField
              label="Metrics"
              value={form.metrics}
              onChange={(v) => set("metrics", v)}
            />
          </div>
          <div className="a-grid2">
            <TextField
              label="Live URL"
              value={form.live_url ?? ""}
              onChange={(v) => set("live_url", v)}
            />
            <TextField
              label="GitHub URL"
              value={form.github_url ?? ""}
              onChange={(v) => set("github_url", v)}
            />
          </div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <CheckField
              label="Featured"
              checked={form.featured}
              onChange={(v) => set("featured", v)}
            />
            <CheckField
              label="Hackathon winner"
              checked={form.hackathon_win}
              onChange={(v) => set("hackathon_win", v)}
            />
            <CheckField
              label="Published"
              checked={form.published}
              onChange={(v) => set("published", v)}
            />
          </div>

          <div className="a-field">
            <label>Screenshots</label>
            {editing ? (
              <>
                <div className="a-uploads">
                  {images.map((img) => (
                    <div className="a-upitem" key={img.id}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.url} alt="" />
                      <button
                        type="button"
                        onClick={() => onDeleteImage(img.id, img.url)}
                        aria-label="Remove image"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <div
                  className="a-drop"
                  onClick={() => fileRef.current?.click()}
                  style={{ marginTop: 10 }}
                >
                  {uploading ? "Uploading…" : "+ Add screenshot"}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={onUpload}
                />
              </>
            ) : (
              <span className="hint">Save the project first to add screenshots.</span>
            )}
          </div>
        </Drawer>
      )}
    </>
  );
}
