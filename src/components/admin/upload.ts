import { createClient } from "@/lib/supabase/client";

function safeName(name: string): string {
  const dot = name.lastIndexOf(".");
  const ext = dot >= 0 ? name.slice(dot).toLowerCase() : "";
  const base = (dot >= 0 ? name.slice(0, dot) : name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  const rand = Math.floor(performance.now()).toString(36);
  return `${base || "file"}-${rand}${ext}`;
}

/**
 * Uploads a file directly from the browser to Supabase Storage (bypasses the
 * 1MB Server Action body cap). Returns the public URL. Requires the admin
 * session — storage RLS restricts writes to the admin.
 */
export async function uploadToStorage(
  file: File,
  bucket: string,
  prefix = "",
): Promise<string> {
  const supabase = createClient();
  const path = `${prefix ? prefix.replace(/\/$/, "") + "/" : ""}${safeName(file.name)}`;
  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { contentType: file.type, upsert: true });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}
