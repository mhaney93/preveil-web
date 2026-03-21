import type { Metadata } from "next";
import { createServerClient } from "@/lib/supabase/server";
import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import LogoutButton from "@/components/LogoutButton";

function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  );
}

export const metadata: Metadata = {
  title: "Account",
  robots: { index: false },
};

export default async function AccountPage() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-6 py-16">
        <h1 className="font-[family-name:var(--font-heading)] text-4xl font-light tracking-widest uppercase text-center mb-16 text-[var(--foreground)]">
          Account
        </h1>
        <AuthForm />
      </div>
    );
  }

  const { data: orders } = await supabase
    .from("orders")
    .select("id, status, total, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  async function deleteAccount() {
    "use server";
    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const admin = createAdminClient();
    await admin.auth.admin.deleteUser(user.id);
    redirect("/");
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-16">
        <h1 className="font-[family-name:var(--font-heading)] text-4xl font-light tracking-widest uppercase text-[var(--foreground)]">
          Account
        </h1>
        <LogoutButton />
      </div>

      <p className="text-sm text-[var(--muted)] mb-12">{user.email}</p>

      <h2 className="text-xs tracking-widest uppercase text-[var(--muted)] mb-6">
        Order History
      </h2>

      {!orders || orders.length === 0 ? (
        <p className="text-[var(--muted)] text-sm tracking-widest uppercase">
          No orders yet
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between border border-[var(--border)] p-6"
            >
              <div>
                <p className="text-sm text-[var(--foreground)] font-mono">
                  #{order.id.slice(0, 8).toUpperCase()}
                </p>
                <p className="text-xs tracking-widest uppercase text-[var(--muted)] mt-1">
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[var(--accent-gold)]">
                  ${order.total.toFixed(2)}
                </p>
                <p className="text-xs tracking-widest uppercase text-[var(--muted)] mt-1">
                  {order.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-24 pt-8 border-t border-[var(--border)]">
        <h2 className="text-xs tracking-widest uppercase text-[var(--muted)] mb-6">
          Danger Zone
        </h2>
        <form action={deleteAccount}>
          <button
            type="submit"
            className="px-6 py-2 border border-red-800 text-red-800 text-xs tracking-widest uppercase hover:bg-red-800 hover:text-white transition-colors"
          >
            Delete Account
          </button>
          <p className="text-xs text-[var(--muted)] mt-3">This cannot be undone.</p>
        </form>
      </div>
    </div>
  );
}
