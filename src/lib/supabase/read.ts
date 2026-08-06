import { createClient } from "@supabase/supabase-js";

/**
 * Cookie-free anon client for public reads in Server Components.
 * RLS `using (published)` policies scope this to public rows only.
 */
export function createReadClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
