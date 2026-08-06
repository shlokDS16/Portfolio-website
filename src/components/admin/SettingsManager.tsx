"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { SiteSettings } from "@/lib/types";
import { TextField, TextArea, ArrayField } from "./Fields";
import { uploadToStorage } from "./upload";
import { saveSetting } from "@/app/admin/actions";

function Section({
  title,
  children,
  onSave,
  pending,
}: {
  title: string;
  children: React.ReactNode;
  onSave: () => void;
  pending: boolean;
}) {
  return (
    <div
      style={{
        border: "1px solid var(--rule)",
        borderRadius: 10,
        background: "var(--raised)",
        padding: "22px 24px",
        marginBottom: 18,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 18,
        }}
      >
        <div className="ey" style={{ fontSize: 12, color: "var(--ink2)" }}>
          {title}
        </div>
        <button className="a-btn sm" onClick={onSave} disabled={pending} type="button">
          {pending ? "Saving…" : "Save"}
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>{children}</div>
    </div>
  );
}

export function SettingsManager({ settings }: { settings: SiteSettings }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const [hero, setHero] = useState(settings.hero ?? {});
  const [stats, setStats] = useState(settings.stats ?? []);
  const [socials, setSocials] = useState(settings.socials ?? {});
  const [contact, setContact] = useState(settings.contact ?? {});
  const [ticker, setTicker] = useState<string[]>(settings.ticker ?? []);
  const [resume, setResume] = useState(settings.resume ?? {});

  function save(key: string, value: unknown, label: string) {
    start(async () => {
      const res = await saveSetting(key, value);
      if (!res.ok) return void toast.error(res.error ?? "Save failed.");
      toast.success(`${label} saved.`);
      router.refresh();
    });
  }

  async function onResumeUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToStorage(file, "resume");
      const value = { path: "resume", url };
      setResume(value);
      const res = await saveSetting("resume", value);
      if (!res.ok) throw new Error(res.error);
      toast.success("Résumé uploaded.");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <>
      <Section title="Hero" onSave={() => save("hero", hero, "Hero")} pending={pending}>
        <TextField
          label="Eyebrow"
          value={hero.eyebrow ?? ""}
          onChange={(v) => setHero({ ...hero, eyebrow: v })}
        />
        <div className="a-grid2">
          <ArrayField
            label="Roles"
            value={hero.roles ?? []}
            onChange={(v) => setHero({ ...hero, roles: v })}
          />
          <ArrayField
            label="Name lines"
            value={hero.name ?? []}
            onChange={(v) => setHero({ ...hero, name: v })}
          />
        </div>
        <TextArea
          label="Lede"
          value={hero.lede ?? ""}
          onChange={(v) => setHero({ ...hero, lede: v })}
        />
        <div className="a-grid2">
          <TextField
            label="Location"
            value={hero.location ?? ""}
            onChange={(v) => setHero({ ...hero, location: v })}
          />
          <TextField
            label="School"
            value={hero.school ?? ""}
            onChange={(v) => setHero({ ...hero, school: v })}
          />
        </div>
        <TextField
          label="Availability"
          value={hero.availability ?? ""}
          onChange={(v) => setHero({ ...hero, availability: v })}
        />
      </Section>

      <Section title="Stats" onSave={() => save("stats", stats, "Stats")} pending={pending}>
        {stats.map((s, i) => (
          <div className="a-grid2" key={i} style={{ gridTemplateColumns: "1fr 1fr 1fr auto", alignItems: "end" }}>
            <TextField
              label="Value"
              value={s.n}
              onChange={(v) =>
                setStats(stats.map((x, j) => (j === i ? { ...x, n: v } : x)))
              }
            />
            <TextField
              label="Unit"
              value={s.unit ?? ""}
              onChange={(v) =>
                setStats(stats.map((x, j) => (j === i ? { ...x, unit: v } : x)))
              }
            />
            <TextField
              label="Label"
              value={s.k}
              onChange={(v) =>
                setStats(stats.map((x, j) => (j === i ? { ...x, k: v } : x)))
              }
            />
            <button
              className="a-btn danger sm"
              type="button"
              onClick={() => setStats(stats.filter((_, j) => j !== i))}
            >
              ✕
            </button>
          </div>
        ))}
        <button
          className="a-btn ghost sm"
          type="button"
          style={{ alignSelf: "flex-start" }}
          onClick={() => setStats([...stats, { n: "", unit: "", k: "" }])}
        >
          + Add stat
        </button>
      </Section>

      <Section
        title="Socials"
        onSave={() => save("socials", socials, "Socials")}
        pending={pending}
      >
        <div className="a-grid2">
          <TextField
            label="GitHub"
            value={socials.github ?? ""}
            onChange={(v) => setSocials({ ...socials, github: v })}
          />
          <TextField
            label="LinkedIn"
            value={socials.linkedin ?? ""}
            onChange={(v) => setSocials({ ...socials, linkedin: v })}
          />
        </div>
        <div className="a-grid2">
          <TextField
            label="Email"
            value={socials.email ?? ""}
            onChange={(v) => setSocials({ ...socials, email: v })}
          />
          <TextField
            label="Phone"
            value={socials.phone ?? ""}
            onChange={(v) => setSocials({ ...socials, phone: v })}
          />
        </div>
      </Section>

      <Section
        title="Contact"
        onSave={() => save("contact", contact, "Contact")}
        pending={pending}
      >
        <div className="a-grid2">
          <TextField
            label="Email"
            value={contact.email ?? ""}
            onChange={(v) => setContact({ ...contact, email: v })}
          />
          <TextField
            label="Phone"
            value={contact.phone ?? ""}
            onChange={(v) => setContact({ ...contact, phone: v })}
          />
        </div>
        <div className="a-grid2">
          <TextField
            label="Location"
            value={contact.location ?? ""}
            onChange={(v) => setContact({ ...contact, location: v })}
          />
          <TextField
            label="Formspree endpoint"
            value={contact.formspree ?? ""}
            onChange={(v) => setContact({ ...contact, formspree: v })}
          />
        </div>
      </Section>

      <Section
        title="Skills ticker"
        onSave={() => save("ticker", ticker, "Ticker")}
        pending={pending}
      >
        <ArrayField
          label="Ticker items"
          value={ticker}
          onChange={setTicker}
          hint="One per line · leave empty to use defaults"
        />
      </Section>

      <div
        style={{
          border: "1px solid var(--rule)",
          borderRadius: 10,
          background: "var(--raised)",
          padding: "22px 24px",
        }}
      >
        <div className="ey" style={{ fontSize: 12, color: "var(--ink2)", marginBottom: 16 }}>
          Résumé (PDF)
        </div>
        {resume.url ? (
          <div className="meta" style={{ fontFamily: "var(--mono)", fontSize: 12, marginBottom: 12 }}>
            Current:{" "}
            <a href={resume.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--blue)" }}>
              {resume.url}
            </a>
          </div>
        ) : (
          <div className="hint" style={{ marginBottom: 12 }}>
            No uploaded résumé — the site serves the bundled PDF in /public.
          </div>
        )}
        <div className="a-drop" onClick={() => fileRef.current?.click()}>
          {uploading ? "Uploading…" : "+ Upload résumé PDF"}
        </div>
        <input ref={fileRef} type="file" accept="application/pdf" hidden onChange={onResumeUpload} />
      </div>
    </>
  );
}
