import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "shlokgoenka316@gmail.com";

/**
 * Authorization boundary. Called by every admin page and Server Action.
 * Do NOT rely on proxy/middleware for auth (CVE-2025-29927) — this is the gate.
 * Uses getClaims() which verifies the JWT locally against cached JWKS.
 */
export const requireAdmin = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (!claims || claims.email !== ADMIN_EMAIL) {
    redirect("/admin/login");
  }
  return claims;
});

/** Non-redirecting variant — returns claims or null. */
export const getAdminClaims = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (!claims || claims.email !== ADMIN_EMAIL) return null;
  return claims;
});
