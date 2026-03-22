"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm tracking-widest uppercase text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
    >
      Sign Out
    </button>
  );
}
