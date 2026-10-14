import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ColorSwatch } from "@/components/color/ColorSwatch";
import { getHexString } from "@/lib/color";
import { formatRatio } from "@/lib/contrast";
import { getQuickFixes } from "@/lib/fixes";
import { setColor1, setColor2, useColor1, useColor2 } from "@/store/colorStore";
import { cn } from "@/lib/utils";

// small lightness tweaks that keep the hue, for when the pair falls short
export const QuickFixes = ({ className }: { className?: string }) => {
  const color1 = useColor1();
  const color2 = useColor2();
  const fixes = useMemo(() => getQuickFixes(color1, color2), [color1, color2]);

  if (fixes.length === 0) {
    return (
      <p className={cn("text-sm text-zinc-400", className)}>
        This pair already reaches AAA, nothing to fix.
      </p>
    );
  }

  return (
    <ul className={cn("space-y-2", className)}>
      {fixes.map((fix) => {
        const hex = getHexString(fix.color, true);
        const action = `${fix.direction === "darker" ? "Darken" : "Lighten"} ${
          fix.target === "text" ? "text" : "background"
        }`;

        return (
          <li
            key={`${fix.level}-${fix.target}-${hex}`}
            className="flex items-center gap-2"
          >
            <ColorSwatch color={fix.color} className="size-6 rounded" />
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-xs text-zinc-100">{action}</p>
              <p className="truncate text-[11px] text-zinc-400 tabular-nums">
                <span className="font-mono uppercase">{hex}</span> · {fix.level}{" "}
                {formatRatio(fix.ratio)}:1
              </p>
            </div>
            <Button
              size="sm"
              variant="secondary"
              className="h-7 px-2 text-xs"
              aria-label={`${action} to ${hex} to reach ${fix.level}`}
              onClick={() =>
                fix.target === "text"
                  ? setColor1(fix.color)
                  : setColor2(fix.color)
              }
            >
              Apply
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

export default QuickFixes;
