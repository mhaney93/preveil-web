"use client";

import { useState } from "react";

export default function ProductImages({ images, name }: { images: string[]; name: string }) {
  const [selected, setSelected] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-[var(--card)] border border-[var(--border)] flex items-center justify-center">
        <span className="text-[var(--muted)] text-sm tracking-widest uppercase">No image</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="aspect-square bg-[var(--card)] border border-[var(--border)] overflow-hidden">
        <img
          src={images[selected]}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`w-16 h-16 border overflow-hidden flex-shrink-0 transition-colors ${
                selected === i
                  ? "border-[var(--accent-gold)]"
                  : "border-[var(--border)] hover:border-[var(--foreground)]"
              }`}
            >
              <img src={img} alt={`${name} ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
