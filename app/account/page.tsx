import type { Metadata } from "next";
import { createServerClient } from "@/lib/supabase/server";
import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { accountDeletedEmail } from "@/lib/email-templates";
import AuthForm from "@/components/AuthForm";
import LogoutButton from "@/components/LogoutButton";
import DeleteAccountButton from "@/components/DeleteAccountButton";

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

  const now = new Date().toISOString();
  const { data: pointsRows } = await supabase
    .from("points_ledger")
    .select("amount, available_at");

  const availablePoints = pointsRows
    ? pointsRows.filter((r) => r.available_at <= now).reduce((sum, r) => sum + r.amount, 0)
    : 0;
  const pendingPoints = pointsRows
    ? pointsRows.filter((r) => r.available_at > now).reduce((sum, r) => sum + r.amount, 0)
    : 0;

  async function deleteAccount() {
    "use server";
    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const email = user.email;
    const admin = createAdminClient();
    await admin.from("orders").update({ user_id: null }).eq("user_id", user.id);
    const { error: deleteError } = await admin.auth.admin.deleteUser(user.id);
    if (deleteError) {
      console.error("deleteUser failed:", deleteError.message, deleteError);
      throw new Error("Failed to delete account: " + deleteError.message);
    }
    await supabase.auth.signOut();
    if (email) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Preveil <noreply@preveil.shop>",
        to: email,
        subject: "Your Preveil account has been deleted",
        html: accountDeletedEmail(),
      });
    }
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

      {/* Points Balance */}
      <div className="border border-[var(--border)] p-6 mb-12">
        <h2 className="text-sm tracking-widest uppercase text-[var(--muted)] mb-4">
          Reward Points
        </h2>
        <div className="flex items-end gap-6">
          <div>
            <p className="font-[family-name:var(--font-heading)] text-4xl font-light text-[var(--accent-gold)]">
              {availablePoints}
            </p>
            <p className="text-sm text-[var(--muted)] mt-1">
              available · ${(availablePoints / 100).toFixed(2)} to redeem at checkout
            </p>
          </div>
          {pendingPoints > 0 && (
            <div>
              <p className="font-[family-name:var(--font-heading)] text-2xl font-light text-[var(--muted)]">
                +{pendingPoints}
              </p>
              <p className="text-sm text-[var(--muted)] mt-1">pending · available in 14 days</p>
            </div>
          )}
        </div>
      </div>

      <h2 className="text-sm tracking-widest uppercase text-[var(--muted)] mb-6">
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
                <p className="text-sm tracking-widest uppercase text-[var(--muted)] mt-1">
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[var(--accent-gold)]">
                  ${order.total.toFixed(2)}
                </p>
                <p className="text-sm tracking-widest uppercase text-[var(--muted)] mt-1">
                  {order.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-24 pt-8 border-t border-[var(--border)]">
        <h2 className="text-sm tracking-widest uppercase text-[var(--muted)] mb-6">
          Danger Zone
        </h2>
        <DeleteAccountButton action={deleteAccount} />
      </div>
    </div>
  );
}
