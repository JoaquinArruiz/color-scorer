import { getHexString } from "@/lib/color";
import { formatRatio, getPreviewColors } from "@/lib/contrast";
import { useColorPairSuggestions, useContrast } from "@/hooks/useColor";
import { setColor1, setColor2, useColor1, useColor2 } from "@/store/colorStore";
import { cn } from "@/lib/utils";

export const ColorSuggestions = ({ className }: { className?: string }) => {
  const color1 = useColor1();
  const color2 = useColor2();
  const { ratio } = useContrast();
  const suggestions = useColorPairSuggestions(color1, color2, ratio, 6);

  if (suggestions.length === 0) {
    return (
      <p className={cn("text-sm text-zinc-400", className)}>
        This pair already has the best contrast we can suggest.
      </p>
    );
  }

  return (
    <ul className={cn("grid grid-cols-3 gap-2", className)}>
      {suggestions.map(({ textColor, bgColor, score }) => {
        const preview = getPreviewColors(textColor, bgColor);
        const key = `${getHexString(textColor)}-${getHexString(bgColor)}`;

        return (
          <li key={key}>
            <button
              type="button"
              onClick={() => {
                setColor1(textColor);
                setColor2(bgColor);
              }}
              aria-label={`Use ${getHexString(textColor)} text on ${getHexString(bgColor)}, ${formatRatio(score)} to 1`}
              title="Apply this combination"
              className="block w-full overflow-hidden rounded-lg ring-1 ring-white/10 transition hover:ring-white/40 focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:outline-none"
            >
              <span
                className="flex h-12 items-center justify-center text-lg font-semibold"
                style={{ backgroundColor: preview.bg, color: preview.text }}
              >
                Aa
              </span>
              <span className="block bg-zinc-950 py-1 text-[11px] text-zinc-300 tabular-nums">
                {formatRatio(score)}:1
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ColorSuggestions;
