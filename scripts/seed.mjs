// Seed script — uploads screenshots to Storage and inserts all portfolio
// content from _handoff/seed-content.json using the Supabase secret key.
//
// Run AFTER applying _handoff/schema.sql:
//   cd Portfolio-website
//   node --env-file=.env.local scripts/seed.mjs
//
// Idempotent: clears the content tables, then re-inserts. Storage uploads
// use upsert, so re-running overwrites files in place.

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.SUPABASE_SECRET_KEY;

if (!URL || !KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY.");
  console.error("Run with: node --env-file=.env.local scripts/seed.mjs");
  process.exit(1);
}

const supabase = createClient(URL, KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const ROOT = process.cwd(); // Portfolio-website
const HANDOFF = resolve(ROOT, "..", "_handoff");
const SHOTS = resolve(HANDOFF, "shots");
const seed = JSON.parse(readFileSync(resolve(HANDOFF, "seed-content.json"), "utf8"));

const NIL = "00000000-0000-0000-0000-000000000000";

function contentType(file) {
  if (file.endsWith(".pdf")) return "application/pdf";
  if (file.endsWith(".png")) return "image/png";
  if (file.endsWith(".webp")) return "image/webp";
  return "image/jpeg";
}

async function uploadFile(bucket, storagePath, localPath) {
  if (!existsSync(localPath)) {
    console.warn(`  ! missing file, skipped: ${localPath}`);
    return null;
  }
  const body = readFileSync(localPath);
  const { error } = await supabase.storage
    .from(bucket)
    .upload(storagePath, body, {
      contentType: contentType(storagePath),
      upsert: true,
    });
  if (error) {
    console.error(`  ! upload failed ${bucket}/${storagePath}:`, error.message);
    return null;
  }
  const { data } = supabase.storage.from(bucket).getPublicUrl(storagePath);
  return data.publicUrl;
}

async function clearTable(table) {
  const { error } = await supabase.from(table).delete().neq("id", NIL);
  if (error) throw new Error(`clear ${table}: ${error.message}`);
}

async function main() {
  console.log("→ Clearing content tables…");
  // project_images cascades from projects, but clear explicitly to be safe.
  for (const t of [
    "project_images",
    "projects",
    "patents",
    "certifications",
    "achievements",
    "skill_groups",
  ]) {
    await clearTable(t);
  }
  await supabase.from("site_settings").delete().neq("key", "__none__");

  // ---- resume ----
  console.log("→ Uploading résumé…");
  const resumeLocal = resolve(ROOT, "public", "Shlok_Kumar_Goenka_Resume.pdf");
  const resumeUrl = await uploadFile(
    "resume",
    "Shlok_Kumar_Goenka_Resume.pdf",
    resumeLocal,
  );

  // ---- site_settings ----
  console.log("→ Inserting site settings…");
  const ss = seed.site_settings;
  const settingsRows = [
    { key: "hero", value: ss.hero },
    { key: "stats", value: ss.stats },
    { key: "socials", value: ss.socials },
    { key: "contact", value: ss.contact },
    {
      key: "resume",
      value: {
        path: "resume/Shlok_Kumar_Goenka_Resume.pdf",
        url: resumeUrl,
      },
    },
  ];
  {
    const { error } = await supabase.from("site_settings").insert(settingsRows);
    if (error) throw new Error(`site_settings: ${error.message}`);
  }

  // ---- projects + images ----
  console.log("→ Inserting projects…");
  for (const p of seed.projects) {
    const { data: inserted, error } = await supabase
      .from("projects")
      .insert({
        slug: p.slug,
        name: p.name,
        subtitle: p.subtitle,
        description: p.description,
        category: p.category,
        tech: p.tech,
        metrics: p.metrics,
        live_url: p.live_url,
        github_url: p.github_url,
        featured: p.featured,
        hackathon_win: p.hackathon_win,
        sort_order: p.sort_order,
        published: true,
      })
      .select("id")
      .single();
    if (error) throw new Error(`project ${p.slug}: ${error.message}`);

    const images = p.images ?? [];
    let j = 0;
    for (const file of images) {
      const url = await uploadFile(
        "project-images",
        `${p.slug}/${file}`,
        resolve(SHOTS, file),
      );
      if (!url) continue;
      const { error: imgErr } = await supabase.from("project_images").insert({
        project_id: inserted.id,
        url,
        alt: p.name,
        sort_order: j++,
      });
      if (imgErr) throw new Error(`project_image ${file}: ${imgErr.message}`);
    }
    console.log(`  ✓ ${p.name} (${images.length} image(s))`);
  }

  // ---- patents ----
  console.log("→ Inserting patents…");
  {
    const rows = seed.patents.map((p) => ({
      title: p.title,
      application_number: p.application_number,
      abstract: p.abstract,
      tags: p.tags,
      status: p.status,
      sort_order: p.sort_order,
      published: true,
    }));
    const { error } = await supabase.from("patents").insert(rows);
    if (error) throw new Error(`patents: ${error.message}`);
  }

  // ---- certifications ----
  console.log("→ Inserting certifications…");
  for (const c of seed.certifications) {
    let imageUrl = null;
    if (c.image) {
      imageUrl = await uploadFile(
        "certifications",
        c.image,
        resolve(SHOTS, c.image),
      );
    }
    const { error } = await supabase.from("certifications").insert({
      title: c.title,
      issuer: c.issuer ?? null,
      issued_year: c.issued_year ?? null,
      valid_until: c.valid_until ?? null,
      note: c.note ?? null,
      image_url: imageUrl,
      sort_order: c.sort_order,
      published: true,
    });
    if (error) throw new Error(`certification ${c.title}: ${error.message}`);
  }

  // ---- achievements ----
  console.log("→ Inserting achievements…");
  {
    const rows = seed.achievements.map((a) => ({
      title: a.title,
      subtitle: a.subtitle,
      type: a.type,
      period: a.period,
      details: a.details ?? [],
      sort_order: a.sort_order,
      published: true,
    }));
    const { error } = await supabase.from("achievements").insert(rows);
    if (error) throw new Error(`achievements: ${error.message}`);
  }

  // ---- skill_groups ----
  console.log("→ Inserting skill groups…");
  {
    const rows = seed.skill_groups.map((g) => ({
      name: g.name,
      skills: g.skills,
      sort_order: g.sort_order,
    }));
    const { error } = await supabase.from("skill_groups").insert(rows);
    if (error) throw new Error(`skill_groups: ${error.message}`);
  }

  console.log("\n✓ Seed complete.");
}

main().catch((e) => {
  console.error("\n✗ Seed failed:", e.message);
  process.exit(1);
});
