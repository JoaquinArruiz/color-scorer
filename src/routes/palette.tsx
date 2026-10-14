import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PaletteInput } from "@/components/palette/PaletteInput";
import { PaletteMatrix } from "@/components/palette/PaletteMatrix";
import { SectionHeading } from "@/components/preview/PreviewSurface";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  countPassingPairs,
  PALETTE_LEVELS,
  parsePalette,
  type PaletteMetric,
} from "@/lib/palette";
import { usePaletteUrlSync } from "@/hooks/usePaletteUrlSync";
import { usePaletteInput } from "@/store/paletteStore";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/palette")({
  component: PalettePage,
});

const metrics: { value: PaletteMetric; label: string }[] = [
  { value: "wcag", label: "WCAG 2" },
  { value: "apca", label: "APCA" },
];

function PalettePage() {
  usePaletteUrlSync();
  const input = usePaletteInput();
  const colors = useMemo(() => parsePalette(input), [input]);
  const [metric, setMetric] = useState<PaletteMetric>("wcag");
  // index into the metric's levels: AA for wcag, content text for apca
  const [minLevel, setMinLevel] = useState(1);
  const levels = PALETTE_LEVELS[metric];

  const { passing, total } = useMemo(
    () => countPassingPairs(colors, metric, minLevel),
    [colors, metric, minLevel]
  );

  return (
    <div className="space-y-8">
      <section aria-labelledby="palette-heading">
        <SectionHeading
          id="palette-heading"
          title="Palette matrix"
          description="Check every text and background combination of a palette at once. Click a pair to open it in the checker."
        />
        <PaletteInput colors={colors} />
      </section>

      <section aria-labelledby="matrix-heading" className="space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="matrix-heading"
              className="text-base font-semibold text-zinc-100"
            >
              Combinations
            </h2>
            <p className="text-sm text-zinc-400" aria-live="polite">
              {total === 0
                ? "Add at least two colors to compare them."
                : `${passing} of ${total} pairs reach ${levels[minLevel].label}.`}
            </p>
          </div>
          <div className="flex gap-2">
            <div
              role="radiogroup"
              aria-label="Contrast method"
              className="flex rounded-md bg-zinc-900 p-0.5 ring-1 ring-zinc-800"
            >
              {metrics.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={metric === option.value}
                  onClick={() => setMetric(option.value)}
                  className={cn(
                    "rounded px-3 py-1.5 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none",
                    metric === option.value
                      ? "bg-zinc-100 font-medium text-zinc-900"
                      : "text-zinc-400 hover:text-zinc-100"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <Select
              value={String(minLevel)}
              onValueChange={(value) => setMinLevel(Number(value))}
            >
              <SelectTrigger
                aria-label="Highlight pairs that reach"
                className="w-44"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {levels.map((level, index) => (
                  <SelectItem key={level.label} value={String(index)}>
                    {level.label} ·{" "}
                    {metric === "wcag" ? `${level.min}:1` : `Lc ${level.min}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {colors.length >= 2 && (
          <PaletteMatrix colors={colors} metric={metric} minLevel={minLevel} />
        )}
      </section>
    </div>
  );
}
