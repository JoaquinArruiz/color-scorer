import { useState } from "react";
import { X } from "lucide-react";
import { usePantoneMatch } from "@/hooks/usePantoneMatch";

// a pantone style color chip that shows up when a color of the year is picked
export const PantoneChip = () => {
  const match = usePantoneMatch();
  const [dismissed, setDismissed] = useState<string | null>(null);

  if (!match || dismissed === match.name) return null;

  return (
    <aside
      key={match.name}
      aria-live="polite"
      aria-label="Pantone color of the year"
      className="fixed right-4 bottom-36 z-40 w-44 overflow-hidden rounded-md bg-white text-zinc-900 shadow-2xl ring-1 ring-black/10 motion-safe:animate-chip-in lg:right-6 lg:bottom-6"
    >
      <div className="relative h-24" style={{ backgroundColor: match.hex }}>
        <button
          type="button"
          onClick={() => setDismissed(match.name)}
          aria-label="Dismiss"
          className="absolute top-1.5 right-1.5 rounded-full bg-white/85 p-1 text-zinc-700 transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:outline-none"
        >
          <X className="size-3.5" />
        </button>
      </div>
      <div className="space-y-0.5 px-3 py-2.5">
        <p className="text-[11px] font-bold tracking-[0.2em]">PANTONE</p>
        <p className="text-sm leading-tight font-semibold">{match.name}</p>
        <p className="text-xs text-zinc-600">Color of the Year {match.year}</p>
        <p className="font-mono text-xs text-zinc-600 uppercase">
          {match.hex}
        </p>
      </div>
    </aside>
  );
};

export default PantoneChip;
