export default function ShopLoading() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="font-[family-name:var(--font-heading)] text-4xl font-light tracking-widest uppercase text-center mb-12 text-[var(--foreground)]">
        Shop
      </h1>
      <div className="flex justify-center items-center py-24">
        <div className="w-8 h-8 rounded-full border-2 border-[var(--border)] border-t-[var(--accent-gold)] animate-spin" />
      </div>
    </div>
  )
}
