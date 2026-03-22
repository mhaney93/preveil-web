"use client";

import { useState } from "react";

export default function DeleteAccountButton({ action }: { action: () => Promise<void> }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="px-6 py-2 border border-red-800 text-red-800 text-sm tracking-widest uppercase hover:bg-red-800 hover:text-white transition-colors"
      >
        Delete Account
      </button>
      <p className="text-sm text-[var(--muted)] mt-3">This cannot be undone.</p>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="relative bg-[var(--background)] border border-[var(--border)] p-10 max-w-sm w-full mx-6">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-light tracking-widest uppercase text-[var(--foreground)] mb-4">
              Delete Account
            </h2>
            <p className="text-sm text-[var(--muted)] leading-relaxed mb-10">
              Are you sure you want to delete your account? This cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex-1 px-6 py-2 border border-[var(--border)] text-[var(--muted)] text-sm tracking-widest uppercase hover:border-[var(--foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                Cancel
              </button>
              <form action={action} className="flex-1">
                <button
                  type="submit"
                  className="w-full px-6 py-2 border border-red-800 text-red-800 text-sm tracking-widest uppercase hover:bg-red-800 hover:text-white transition-colors"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
