"use client";

export default function DeleteAccountButton({ action }: { action: () => Promise<void> }) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="px-6 py-2 border border-red-800 text-red-800 text-xs tracking-widest uppercase hover:bg-red-800 hover:text-white transition-colors"
      >
        Delete Account
      </button>
      <p className="text-xs text-[var(--muted)] mt-3">This cannot be undone.</p>
    </form>
  );
}
