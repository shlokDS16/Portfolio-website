import "server-only";
import { createReadClient } from "@/lib/supabase/read";
import seed from "@/lib/seed.json";
import type {
  Achievement,
  Certification,
  Patent,
  Project,
  SiteSettings,
  SkillGroup,
} from "@/lib/types";

// ---------------------------------------------------------------------------
// Public data access. Reads from Supabase; if a table is empty or unreachable
// (e.g. schema not yet applied), falls back to the bundled seed content so the
// site is never blank. Real DB rows always win when present.
// ---------------------------------------------------------------------------

const shot = (file: string) => `/shots/${file}`;

function fallbackProjects(): Project[] {
  return seed.projects.map((p, i) => ({
    id: `seed-${p.slug}`,
    slug: p.slug,
    name: p.name,
    subtitle: p.subtitle,
    category: p.category,
    description: p.description,
    tech: p.tech,
    metrics: p.metrics,
    live_url: p.live_url ?? null,
    github_url: p.github_url ?? null,
    featured: p.featured,
    hackathon_win: p.hackathon_win,
    sort_order: p.sort_order,
    published: true,
    created_at: "",
    updated_at: "",
    project_images: (p.images ?? []).map((img, j) => ({
      id: `seed-${p.slug}-${j}`,
      project_id: `seed-${p.slug}`,
      url: shot(img),
      alt: p.name,
      sort_order: j,
    })),
  })) as Project[];
}

export async function getProjects(): Promise<Project[]> {
  try {
    const supabase = createReadClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*, project_images(*)")
      .eq("published", true)
      .order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) return fallbackProjects();
    return (data as Project[]).map((p) => ({
      ...p,
      project_images: (p.project_images ?? []).sort(
        (a, b) => a.sort_order - b.sort_order,
      ),
    }));
  } catch {
    return fallbackProjects();
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) ?? null;
}

function fallbackPatents(): Patent[] {
  return seed.patents.map((p) => ({
    id: `seed-${p.application_number}`,
    title: p.title,
    application_number: p.application_number,
    filed_date: null,
    abstract: p.abstract ?? null,
    tags: p.tags,
    status: p.status,
    sort_order: p.sort_order,
    published: true,
    created_at: "",
  })) as Patent[];
}

export async function getPatents(): Promise<Patent[]> {
  try {
    const supabase = createReadClient();
    const { data, error } = await supabase
      .from("patents")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) return fallbackPatents();
    return data as Patent[];
  } catch {
    return fallbackPatents();
  }
}

function fallbackCertifications(): Certification[] {
  return seed.certifications.map((c, i) => {
    const cert = c as {
      title: string;
      issuer?: string;
      issued_year?: string;
      valid_until?: string;
      note?: string;
      image?: string | null;
      sort_order: number;
    };
    return {
      id: `seed-cert-${i}`,
      title: cert.title,
      issuer: cert.issuer ?? null,
      issued_year: cert.issued_year ?? null,
      valid_until: cert.valid_until ?? null,
      note: cert.note ?? null,
      credential_id: null,
      image_url: cert.image ? shot(cert.image) : null,
      sort_order: cert.sort_order,
      published: true,
      created_at: "",
    };
  }) as Certification[];
}

export async function getCertifications(): Promise<Certification[]> {
  try {
    const supabase = createReadClient();
    const { data, error } = await supabase
      .from("certifications")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) return fallbackCertifications();
    return data as Certification[];
  } catch {
    return fallbackCertifications();
  }
}

function fallbackAchievements(): Achievement[] {
  return seed.achievements.map((a, i) => ({
    id: `seed-ach-${i}`,
    title: a.title,
    subtitle: a.subtitle ?? null,
    type: a.type ?? null,
    period: a.period ?? null,
    details: a.details ?? [],
    sort_order: a.sort_order,
    published: true,
    created_at: "",
  })) as Achievement[];
}

export async function getAchievements(): Promise<Achievement[]> {
  try {
    const supabase = createReadClient();
    const { data, error } = await supabase
      .from("achievements")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) return fallbackAchievements();
    return data as Achievement[];
  } catch {
    return fallbackAchievements();
  }
}

function fallbackSkillGroups(): SkillGroup[] {
  return seed.skill_groups.map((g, i) => ({
    id: `seed-skill-${i}`,
    name: g.name,
    skills: g.skills,
    sort_order: g.sort_order,
  })) as SkillGroup[];
}

export async function getSkillGroups(): Promise<SkillGroup[]> {
  try {
    const supabase = createReadClient();
    const { data, error } = await supabase
      .from("skill_groups")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) return fallbackSkillGroups();
    return data as SkillGroup[];
  } catch {
    return fallbackSkillGroups();
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const fallback = seed.site_settings as SiteSettings;
  try {
    const supabase = createReadClient();
    const { data, error } = await supabase.from("site_settings").select("*");
    if (error || !data || data.length === 0) return fallback;
    const merged: Record<string, unknown> = {};
    for (const row of data as { key: string; value: unknown }[]) {
      merged[row.key] = row.value;
    }
    // Fill any missing keys from the seed defaults.
    return { ...fallback, ...(merged as SiteSettings) };
  } catch {
    return fallback;
  }
}
