"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";

type Result = { ok: boolean; error?: string };

const PUBLIC_PATHS = ["/", "/projects", "/patents", "/certifications", "/resume"];
function refreshPublic() {
  for (const p of PUBLIC_PATHS) revalidatePath(p);
}

// --------------------------------------------------------------------------
// auth
// --------------------------------------------------------------------------
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// --------------------------------------------------------------------------
// generic helpers
// --------------------------------------------------------------------------
const REORDERABLE = [
  "projects",
  "patents",
  "certifications",
  "achievements",
  "skill_groups",
] as const;
type Reorderable = (typeof REORDERABLE)[number];

const TOGGLEABLE = [
  "projects",
  "patents",
  "certifications",
  "achievements",
] as const;
type Toggleable = (typeof TOGGLEABLE)[number];

export async function reorder(
  table: Reorderable,
  items: { id: string; sort_order: number }[],
): Promise<Result> {
  await requireAdmin();
  if (!REORDERABLE.includes(table)) return { ok: false, error: "bad table" };
  const supabase = await createClient();
  for (const it of items) {
    const { error } = await supabase
      .from(table)
      .update({ sort_order: it.sort_order })
      .eq("id", it.id);
    if (error) return { ok: false, error: error.message };
  }
  refreshPublic();
  return { ok: true };
}

export async function togglePublished(
  table: Toggleable,
  id: string,
  published: boolean,
): Promise<Result> {
  await requireAdmin();
  if (!TOGGLEABLE.includes(table)) return { ok: false, error: "bad table" };
  const supabase = await createClient();
  const { error } = await supabase
    .from(table)
    .update({ published })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  refreshPublic();
  return { ok: true };
}

async function del(
  table: string,
  id: string,
): Promise<Result> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  refreshPublic();
  return { ok: true };
}

// --------------------------------------------------------------------------
// projects
// --------------------------------------------------------------------------
export type ProjectInput = {
  id?: string;
  slug: string;
  name: string;
  subtitle: string | null;
  description: string | null;
  category: string | null;
  tech: string[];
  metrics: string[];
  live_url: string | null;
  github_url: string | null;
  featured: boolean;
  hackathon_win: boolean;
  published: boolean;
  sort_order: number;
};

export async function saveProject(
  input: ProjectInput,
): Promise<Result & { id?: string }> {
  await requireAdmin();
  const supabase = await createClient();
  const { id, ...fields } = input;
  const payload = { ...fields, updated_at: new Date().toISOString() };
  if (id) {
    const { error } = await supabase.from("projects").update(payload).eq("id", id);
    if (error) return { ok: false, error: error.message };
    refreshPublic();
    return { ok: true, id };
  }
  const { data, error } = await supabase
    .from("projects")
    .insert(payload)
    .select("id")
    .single();
  if (error) return { ok: false, error: error.message };
  refreshPublic();
  return { ok: true, id: data.id };
}

export async function deleteProject(id: string) {
  return del("projects", id);
}

export async function addProjectImage(input: {
  project_id: string;
  url: string;
  alt: string | null;
  sort_order: number;
}): Promise<Result> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("project_images").insert(input);
  if (error) return { ok: false, error: error.message };
  refreshPublic();
  return { ok: true };
}

export async function deleteProjectImage(
  id: string,
  url: string,
): Promise<Result> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("project_images").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  // Best-effort storage cleanup.
  const marker = "/object/public/";
  const i = url.indexOf(marker);
  if (i >= 0) {
    const rest = url.slice(i + marker.length); // bucket/path...
    const slash = rest.indexOf("/");
    if (slash > 0) {
      const bucket = rest.slice(0, slash);
      const path = rest.slice(slash + 1);
      await supabase.storage.from(bucket).remove([path]);
    }
  }
  refreshPublic();
  return { ok: true };
}

// --------------------------------------------------------------------------
// patents
// --------------------------------------------------------------------------
export type PatentInput = {
  id?: string;
  title: string;
  application_number: string | null;
  abstract: string | null;
  tags: string[];
  status: string;
  published: boolean;
  sort_order: number;
};

export async function savePatent(input: PatentInput): Promise<Result> {
  await requireAdmin();
  const supabase = await createClient();
  const { id, ...fields } = input;
  const { error } = id
    ? await supabase.from("patents").update(fields).eq("id", id)
    : await supabase.from("patents").insert(fields);
  if (error) return { ok: false, error: error.message };
  refreshPublic();
  return { ok: true };
}

export async function deletePatent(id: string) {
  return del("patents", id);
}

// --------------------------------------------------------------------------
// certifications
// --------------------------------------------------------------------------
export type CertificationInput = {
  id?: string;
  title: string;
  issuer: string | null;
  issued_year: string | null;
  valid_until: string | null;
  note: string | null;
  image_url: string | null;
  published: boolean;
  sort_order: number;
};

export async function saveCertification(
  input: CertificationInput,
): Promise<Result> {
  await requireAdmin();
  const supabase = await createClient();
  const { id, ...fields } = input;
  const { error } = id
    ? await supabase.from("certifications").update(fields).eq("id", id)
    : await supabase.from("certifications").insert(fields);
  if (error) return { ok: false, error: error.message };
  refreshPublic();
  return { ok: true };
}

export async function deleteCertification(id: string) {
  return del("certifications", id);
}

// --------------------------------------------------------------------------
// achievements
// --------------------------------------------------------------------------
export type AchievementInput = {
  id?: string;
  title: string;
  subtitle: string | null;
  type: string | null;
  period: string | null;
  details: string[];
  published: boolean;
  sort_order: number;
};

export async function saveAchievement(input: AchievementInput): Promise<Result> {
  await requireAdmin();
  const supabase = await createClient();
  const { id, ...fields } = input;
  const { error } = id
    ? await supabase.from("achievements").update(fields).eq("id", id)
    : await supabase.from("achievements").insert(fields);
  if (error) return { ok: false, error: error.message };
  refreshPublic();
  return { ok: true };
}

export async function deleteAchievement(id: string) {
  return del("achievements", id);
}

// --------------------------------------------------------------------------
// skill groups
// --------------------------------------------------------------------------
export type SkillGroupInput = {
  id?: string;
  name: string;
  skills: string[];
  sort_order: number;
};

export async function saveSkillGroup(input: SkillGroupInput): Promise<Result> {
  await requireAdmin();
  const supabase = await createClient();
  const { id, ...fields } = input;
  const { error } = id
    ? await supabase.from("skill_groups").update(fields).eq("id", id)
    : await supabase.from("skill_groups").insert(fields);
  if (error) return { ok: false, error: error.message };
  refreshPublic();
  return { ok: true };
}

export async function deleteSkillGroup(id: string) {
  return del("skill_groups", id);
}

// --------------------------------------------------------------------------
// site settings
// --------------------------------------------------------------------------
export async function saveSetting(
  key: string,
  value: unknown,
): Promise<Result> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase
    .from("site_settings")
    .upsert(
      { key, value, updated_at: new Date().toISOString() },
      { onConflict: "key" },
    );
  if (error) return { ok: false, error: error.message };
  refreshPublic();
  return { ok: true };
}

// --------------------------------------------------------------------------
// contact messages
// --------------------------------------------------------------------------
export async function markMessageRead(
  id: string,
  is_read: boolean,
): Promise<Result> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase
    .from("contact_messages")
    .update({ is_read })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function deleteMessage(id: string) {
  return del("contact_messages", id);
}
