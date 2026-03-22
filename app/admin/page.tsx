import { createServerClient } from "@/lib/supabase/server";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  );
}

export default async function AdminPage() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return (
      <div className="max-w-md mx-auto px-6 py-16 text-center">
        <p className="text-sm tracking-widest uppercase text-[var(--muted)]">Unauthorized</p>
      </div>
    );
  }

  const admin = createAdminClient();

  const [{ data: quote }, { data: prompt }] = await Promise.all([
    admin.from("quotes").select("id, text").eq("used", false).order("id").limit(1).single(),
    admin.from("image_prompts").select("id, prompt").eq("used", false).order("id").limit(1).single(),
  ]);

  async function markQuoteUsed(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const admin = createAdminClient();
    await admin.from("quotes").update({ used: true }).eq("id", id);
    revalidatePath("/admin");
  }

  async function markPromptUsed(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const admin = createAdminClient();
    await admin.from("image_prompts").update({ used: true }).eq("id", id);
    revalidatePath("/admin");
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-[family-name:var(--font-heading)] text-4xl font-light tracking-widest uppercase text-[var(--foreground)] mb-16">
        Content Pool
      </h1>

      <div className="flex flex-col gap-8">
        {/* Quote */}
        <div className="border border-[var(--border)] p-8">
          <p className="text-sm tracking-widest uppercase text-[var(--muted)] mb-4">Next Quote</p>
          {quote ? (
            <>
              <p className="text-[var(--foreground)] leading-relaxed mb-8">{quote.text}</p>
              <form action={markQuoteUsed}>
                <input type="hidden" name="id" value={quote.id} />
                <button
                  type="submit"
                  className="px-6 py-2 border border-[var(--accent-gold)] text-[var(--accent-gold)] text-sm tracking-widest uppercase hover:bg-[var(--accent-gold)] hover:text-[var(--background)] transition-colors"
                >
                  Mark as Used
                </button>
              </form>
            </>
          ) : (
            <p className="text-sm text-[var(--muted)] tracking-widest uppercase">Pool empty</p>
          )}
        </div>

        {/* Image Prompt */}
        <div className="border border-[var(--border)] p-8">
          <p className="text-sm tracking-widest uppercase text-[var(--muted)] mb-4">Next Image Prompt</p>
          {prompt ? (
            <>
              <p className="text-[var(--foreground)] leading-relaxed mb-8">{prompt.prompt}</p>
              <form action={markPromptUsed}>
                <input type="hidden" name="id" value={prompt.id} />
                <button
                  type="submit"
                  className="px-6 py-2 border border-[var(--accent-gold)] text-[var(--accent-gold)] text-sm tracking-widest uppercase hover:bg-[var(--accent-gold)] hover:text-[var(--background)] transition-colors"
                >
                  Mark as Used
                </button>
              </form>
            </>
          ) : (
            <p className="text-sm text-[var(--muted)] tracking-widest uppercase">Pool empty</p>
          )}
        </div>
      </div>
    </div>
  );
}
