"use client";

import { useState } from "react";

interface Props {
  images: string[];
  name: string;
  selectedIndex?: number;
  visibleThumbnailIndices?: number[];
  onSelect?: (index: number) => void;
}

export default function ProductImages({ images, name, selectedIndex, visibleThumbnailIndices, onSelect }: Props) {
  const [internalIndex, setInternalIndex] = useState(0);

  const controlled = selectedIndex !== undefined;
  const active = controlled ? selectedIndex : internalIndex;

  function handleSelect(i: number) {
    if (controlled) {
      onSelect?.(i);
    } else {
      setInternalIndex(i);
    }
  }

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
          src={images[active]}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {(visibleThumbnailIndices ?? images.map((_, i) => i)).map((i) => {
            const img = images[i];
            return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`w-12 h-12 border overflow-hidden flex-shrink-0 transition-colors ${
                active === i
                  ? "border-[var(--accent-gold)]"
                  : "border-[var(--border)] hover:border-[var(--foreground)]"
              }`}
            >
              <img src={img} alt={`${name} ${i + 1}`} className="w-full h-full object-cover" />
            </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
