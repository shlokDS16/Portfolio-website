"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

const ADMIN_EMAIL =
  process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "shlokgoenka316@gmail.com";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setBusy(false);

    if (error) {
      toast.error(error.message);
      return;
    }
    if (data.user?.email !== ADMIN_EMAIL) {
      await supabase.auth.signOut();
      toast.error("This account is not authorized.");
      return;
    }
    toast.success("Signed in.");
    router.replace("/admin");
    router.refresh();
  }

  return (
    <div className="admin-auth">
      <div className="card">
        <h1>SHLOK.SYS</h1>
        <p>Admin console — authorized access only.</p>
        <form onSubmit={onSubmit}>
          <div className="a-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="a-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="a-btn" type="submit" disabled={busy} style={{ justifyContent: "center" }}>
            {busy ? "Signing in…" : "Sign in →"}
          </button>
        </form>
      </div>
    </div>
  );
}
