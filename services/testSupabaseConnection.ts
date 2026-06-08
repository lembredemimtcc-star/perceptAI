/**
 * testSupabaseConnection.ts
 * ─────────────────────────
 * Run this with ts-node (or copy it into a component's useEffect) to verify
 * that the Supabase client can reach your project and that the expected tables
 * exist.  It does NOT mutate any data.
 *
 * Usage (from project root):
 *   npx ts-node --project tsconfig.json services/testSupabaseConnection.ts
 */

import { supabase } from "./supabaseClient";

const TABLES = ["users", "patients", "detections", "annotations", "alerts"] as const;

async function testConnection(): Promise<void> {
  console.log("\n══════════════════════════════════════════");
  console.log("  PerceptAI – Supabase Connection Test");
  console.log("══════════════════════════════════════════\n");

  // 1. Print config (never log the full anon key in production)
  const url = process.env.EXPO_PUBLIC_SUPABASE_URL ?? "(not set)";
  const keySnippet = (process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? "").slice(0, 20) + "…";
  console.log(`🔗 URL        : ${url}`);
  console.log(`🔑 Anon key   : ${keySnippet}\n`);

  // 2. Auth – anonymous session check
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) {
    console.error("❌ Auth check failed:", sessionError.message);
  } else {
    const session = sessionData.session;
    console.log("✅ Auth module reachable");
    console.log(`   Active session: ${session ? `user ${session.user.email}` : "none (anonymous)"}\n`);
  }

  // 3. Table probe – SELECT count(*) on each expected table
  console.log("📋 Probing tables:\n");
  for (const table of TABLES) {
    const { count, error } = await supabase
      .from(table)
      .select("*", { count: "exact", head: true });

    if (error) {
      // RLS "permission denied" means the table EXISTS but the anon role can't read it
      const rls = error.code === "42501" || error.message.includes("permission denied");
      if (rls) {
        console.log(`   ✅ ${table.padEnd(14)} — exists (RLS blocks anon read – expected)`);
      } else {
        console.log(`   ❌ ${table.padEnd(14)} — ${error.message}`);
      }
    } else {
      console.log(`   ✅ ${table.padEnd(14)} — accessible, row count: ${count ?? "n/a"}`);
    }
  }

  // 4. Realtime – just verify the channel API is present
  const channel = supabase.channel("connection-test");
  console.log(`\n📡 Realtime   : ${channel ? "✅ channel API available" : "❌ not available"}`);
  await supabase.removeChannel(channel);

  console.log("\n══════════════════════════════════════════");
  console.log("  Test complete.");
  console.log("══════════════════════════════════════════\n");
}

testConnection().catch(console.error);
