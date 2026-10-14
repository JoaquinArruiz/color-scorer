import { useId } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColorSwatch } from "@/components/color/ColorSwatch";
import {
  MAX_PALETTE_COLORS,
  SAMPLE_PALETTE,
  type PaletteColor,
} from "@/lib/palette";
import { setPaletteInput, usePaletteInput } from "@/store/paletteStore";

export const PaletteInput = ({ colors }: { colors: PaletteColor[] }) => {
  const id = useId();
  const input = usePaletteInput();

  return (
    <div className="space-y-3 rounded-2xl bg-zinc-900 p-4 ring-1 ring-zinc-800">
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={id} className="text-sm font-semibold text-zinc-100">
          Your palette
        </label>
        {input !== SAMPLE_PALETTE && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-zinc-400"
            onClick={() => setPaletteInput(SAMPLE_PALETTE)}
          >
            <RotateCcw />
            Sample
          </Button>
        )}
      </div>
      <textarea
        id={id}
        value={input}
        onChange={(event) => setPaletteInput(event.target.value)}
        rows={6}
        spellCheck={false}
        placeholder={"#0f172a, #f8fafc, #2563eb\nor --brand: #2563eb;"}
        aria-describedby={`${id}-help`}
        className="w-full resize-y rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus-visible:border-zinc-400"
      />
      <p id={`${id}-help`} className="text-xs text-zinc-400">
        Paste hex values, CSS variables or design tokens (JSON, JS or a Tailwind
        config). Up to {MAX_PALETTE_COLORS} colors.
      </p>
      {colors.length > 0 && (
        <ul className="flex flex-wrap gap-2" aria-label="Colors found">
          {colors.map((entry) => (
            <li
              key={entry.hex}
              className="flex items-center gap-1.5 rounded-full bg-zinc-950 py-1 pr-2.5 pl-1 ring-1 ring-zinc-800"
            >
              <ColorSwatch
                color={entry.color}
                className="size-5 rounded-full"
              />
              <span className="text-xs text-zinc-300">{entry.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PaletteInput;
