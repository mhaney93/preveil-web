"use client";

export type SizeGuideType = "tops" | "bottoms";

const TOPS = [
  { size: "XS",  chest: '32–34"', cm: "81–86 cm" },
  { size: "S",   chest: '35–37"', cm: "89–94 cm" },
  { size: "M",   chest: '38–40"', cm: "97–102 cm" },
  { size: "L",   chest: '41–43"', cm: "104–109 cm" },
  { size: "XL",  chest: '44–46"', cm: "112–117 cm" },
  { size: "2XL", chest: '47–49"', cm: "119–124 cm" },
  { size: "3XL", chest: '50–52"', cm: "127–132 cm" },
  { size: "4XL", chest: '53–55"', cm: "135–140 cm" },
  { size: "5XL", chest: '56–58"', cm: "142–147 cm" },
];

const BOTTOMS = [
  { size: "XS",  waist: '26–28"', waistCm: "66–71 cm",   hip: '33–35"', hipCm: "84–89 cm" },
  { size: "S",   waist: '29–31"', waistCm: "74–79 cm",   hip: '36–38"', hipCm: "91–97 cm" },
  { size: "M",   waist: '32–34"', waistCm: "81–86 cm",   hip: '39–41"', hipCm: "99–104 cm" },
  { size: "L",   waist: '35–37"', waistCm: "89–94 cm",   hip: '42–44"', hipCm: "107–112 cm" },
  { size: "XL",  waist: '38–40"', waistCm: "97–102 cm",  hip: '45–47"', hipCm: "114–119 cm" },
  { size: "2XL", waist: '41–43"', waistCm: "104–109 cm", hip: '48–50"', hipCm: "122–127 cm" },
  { size: "3XL", waist: '44–46"', waistCm: "112–117 cm", hip: '51–53"', hipCm: "130–135 cm" },
];

export default function SizeGuideModal({
  type,
  onClose,
}: {
  type: SizeGuideType;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
      onClick={onClose}
    >
      <div
        className="bg-[var(--card)] border border-[var(--border)] max-w-md w-full p-8 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--muted)] hover:text-[var(--foreground)] text-2xl leading-none"
          aria-label="Close size guide"
        >
          ×
        </button>

        <h2 className="font-[family-name:var(--font-heading)] text-body tracking-widest uppercase text-[var(--foreground)] mb-2">
          Size Guide
        </h2>

        {type === "tops" ? (
          <>
            <p className="text-sm text-[var(--muted)] mb-6 leading-relaxed">
              Measure around the fullest part of your chest, keeping the tape flat and level under your arms.
            </p>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left pb-3 text-[var(--muted)] tracking-widest uppercase text-xs font-normal w-16">Size</th>
                  <th className="text-left pb-3 text-[var(--muted)] tracking-widest uppercase text-xs font-normal">Chest circumference</th>
                </tr>
              </thead>
              <tbody>
                {TOPS.map((row) => (
                  <tr key={row.size} className="border-b border-[var(--border)]/30">
                    <td className="py-2.5 text-[var(--foreground)] font-medium">{row.size}</td>
                    <td className="py-2.5 text-[var(--foreground)]">
                      {row.chest}
                      <span className="text-[var(--muted)] text-xs ml-3">{row.cm}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <p className="text-sm text-[var(--muted)] mb-6 leading-relaxed">
              Measure your natural waist (narrowest point) and hips (fullest point, roughly 8&quot; below the waist).
            </p>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left pb-3 text-[var(--muted)] tracking-widest uppercase text-xs font-normal w-16">Size</th>
                  <th className="text-left pb-3 text-[var(--muted)] tracking-widest uppercase text-xs font-normal">Waist</th>
                  <th className="text-left pb-3 text-[var(--muted)] tracking-widest uppercase text-xs font-normal">Hip</th>
                </tr>
              </thead>
              <tbody>
                {BOTTOMS.map((row) => (
                  <tr key={row.size} className="border-b border-[var(--border)]/30">
                    <td className="py-2.5 text-[var(--foreground)] font-medium">{row.size}</td>
                    <td className="py-2.5 text-[var(--foreground)]">
                      {row.waist}
                      <span className="text-[var(--muted)] text-xs ml-2">{row.waistCm}</span>
                    </td>
                    <td className="py-2.5 text-[var(--foreground)]">
                      {row.hip}
                      <span className="text-[var(--muted)] text-xs ml-2">{row.hipCm}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        <p className="text-xs text-[var(--muted)] mt-6 leading-relaxed">
          These are body measurements, not garment measurements. If you&apos;re between sizes, size up.
        </p>
      </div>
    </div>
  );
}
