import { useNavigate } from "@tanstack/react-router";
import { ColorSwatch } from "@/components/color/ColorSwatch";
import { formatLc } from "@/lib/apca";
import { formatRatio, getPreviewColors } from "@/lib/contrast";
import {
  PALETTE_LEVELS,
  scorePair,
  type PaletteColor,
  type PaletteMetric,
} from "@/lib/palette";
import { setColor1, setColor2 } from "@/store/colorStore";
import { cn } from "@/lib/utils";

interface PaletteMatrixProps {
  colors: PaletteColor[];
  metric: PaletteMetric;
  minLevel: number;
}

const ColorLabel = ({ entry }: { entry: PaletteColor }) => (
  <span className="flex min-w-0 items-center gap-1.5">
    <ColorSwatch color={entry.color} className="size-4 shrink-0 rounded-full" />
    <span className="truncate text-xs font-normal text-zinc-300">
      {entry.name}
    </span>
  </span>
);

// every text color (rows) on every background (columns) of the palette
export const PaletteMatrix = ({
  colors,
  metric,
  minLevel,
}: PaletteMatrixProps) => {
  const navigate = useNavigate();
  const levels = PALETTE_LEVELS[metric];

  const applyPair = (text: PaletteColor, bg: PaletteColor) => {
    setColor1(text.color);
    setColor2(bg.color);
    navigate({ to: "/" });
  };

  return (
    <div className="overflow-x-auto rounded-2xl bg-zinc-900 p-2 ring-1 ring-zinc-800">
      <table className="border-separate border-spacing-1">
        <caption className="sr-only">
          Contrast of each text color on each background color
        </caption>
        <thead>
          <tr>
            <th
              scope="col"
              className="sticky left-0 z-10 bg-zinc-900 px-1 text-left text-[11px] font-medium text-zinc-500"
            >
              Text ↓ · Background →
            </th>
            {colors.map((bg) => (
              <th key={bg.hex} scope="col" className="max-w-28 px-1 pb-1">
                <ColorLabel entry={bg} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {colors.map((text) => (
            <tr key={text.hex}>
              <th
                scope="row"
                className="sticky left-0 z-10 max-w-32 bg-zinc-900 pr-2"
              >
                <ColorLabel entry={text} />
              </th>
              {colors.map((bg) => {
                if (text === bg) {
                  return (
                    <td
                      key={bg.hex}
                      aria-label="Same color"
                      className="h-16 w-28 rounded-md text-center text-zinc-700"
                    >
                      —
                    </td>
                  );
                }

                const { value, level } = scorePair(
                  text.color,
                  bg.color,
                  metric
                );
                const passes = level !== null && level <= minLevel;
                const preview = getPreviewColors(text.color, bg.color);
                const score =
                  metric === "wcag"
                    ? `${formatRatio(value)}:1`
                    : `Lc ${formatLc(value)}`;
                const label = level === null ? "Fail" : levels[level].label;

                return (
                  <td key={bg.hex} className="p-0">
                    <button
                      type="button"
                      onClick={() => applyPair(text, bg)}
                      title={`${text.name} on ${bg.name}: ${score}, ${label}. Click to use this pair.`}
                      aria-label={`${text.name} text on ${bg.name}, ${score}, ${label}`}
                      className={cn(
                        "relative flex h-16 w-28 flex-col items-center justify-center rounded-md ring-1 ring-white/10 transition hover:ring-white/50 focus-visible:ring-2 focus-visible:ring-zinc-200 focus-visible:outline-none",
                        !passes &&
                          "opacity-30 hover:opacity-100 focus-visible:opacity-100"
                      )}
                      style={{
                        backgroundColor: preview.bg,
                        color: preview.text,
                      }}
                    >
                      <span className="text-lg leading-none font-semibold">
                        Aa
                      </span>
                      <span className="absolute right-1 bottom-1 rounded bg-black/75 px-1 text-[10px] leading-4 text-white tabular-nums">
                        {label === "Fail" ? score : `${label} ${score}`}
                      </span>
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaletteMatrix;
