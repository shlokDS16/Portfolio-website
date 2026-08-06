"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { SkillGroup } from "@/lib/types";
import { SortableList } from "./SortableList";
import { Drawer } from "./Drawer";
import { TextField, ArrayField } from "./Fields";
import {
  saveSkillGroup,
  deleteSkillGroup,
  reorder,
  type SkillGroupInput,
} from "@/app/admin/actions";

type Form = SkillGroupInput;

const emptyForm = (sort_order: number): Form => ({
  name: "",
  skills: [],
  sort_order,
});

export function SkillsManager({ initial }: { initial: SkillGroup[] }) {
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
  function openEdit(g: SkillGroup) {
    setForm({ id: g.id, name: g.name, skills: g.skills, sort_order: g.sort_order });
    setOpenId(g.id);
  }
  function close() {
    setOpenId(null);
    setForm(null);
  }

  function onSave() {
    if (!form) return;
    if (!form.name.trim()) return void toast.error("Name is required.");
    start(async () => {
      const res = await saveSkillGroup({
        ...form,
        id: openId && openId !== "new" ? openId : undefined,
      });
      if (!res.ok) return void toast.error(res.error ?? "Save failed.");
      toast.success("Skill group saved.");
      close();
      router.refresh();
    });
  }
  function onDelete(g: SkillGroup) {
    if (!confirm(`Delete “${g.name}”?`)) return;
    start(async () => {
      const res = await deleteSkillGroup(g.id);
      if (!res.ok) return void toast.error(res.error ?? "Delete failed.");
      setItems((xs) => xs.filter((x) => x.id !== g.id));
      toast.success("Deleted.");
      router.refresh();
    });
  }
  function onReorder(next: SkillGroup[]) {
    setItems(next);
    start(async () => {
      const res = await reorder(
        "skill_groups",
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
          + New skill group
        </button>
      </div>

      {items.length === 0 ? (
        <div className="a-empty">No skill groups yet.</div>
      ) : (
        <SortableList
          items={items}
          onReorder={onReorder}
          render={(g, handle) => (
            <>
              {handle}
              <div className="grow">
                <div className="title">{g.name}</div>
                <div className="meta">{g.skills.length} skill(s)</div>
              </div>
              <div className="actions">
                <button className="a-btn ghost sm" onClick={() => openEdit(g)} type="button">
                  Edit
                </button>
                <button className="a-btn danger sm" onClick={() => onDelete(g)} type="button">
                  Delete
                </button>
              </div>
            </>
          )}
        />
      )}

      {form && (
        <Drawer
          title={openId === "new" ? "New skill group" : "Edit skill group"}
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
          <TextField label="Group name" value={form.name} onChange={(v) => set("name", v)} />
          <ArrayField label="Skills" value={form.skills} onChange={(v) => set("skills", v)} />
        </Drawer>
      )}
    </>
  );
}
