import { useMemo } from "react";
import { parseHex, type Color } from "@/lib/color";
import { useColor1, useColor2 } from "@/store/colorStore";
import { pantoneColors, type PantoneColor } from "@/data/pantoneColors";

const areColorsSimilar = (color1: Color, color2: Color, tolerance = 5) =>
  Math.abs(color1.r - color2.r) <= tolerance &&
  Math.abs(color1.g - color2.g) <= tolerance &&
  Math.abs(color1.b - color2.b) <= tolerance;

// returns the pantone color of the year matching either picked color, if any
export const usePantoneMatch = (): PantoneColor | null => {
  const color1 = useColor1();
  const color2 = useColor2();

  return useMemo(
    () =>
      pantoneColors.find((pantoneColor) => {
        const pantone = parseHex(pantoneColor.hex);
        return (
          pantone !== null &&
          (areColorsSimilar(color1, pantone) ||
            areColorsSimilar(color2, pantone))
        );
      }) ?? null,
    [color1, color2]
  );
};
