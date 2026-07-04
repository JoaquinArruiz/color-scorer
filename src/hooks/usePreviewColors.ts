import { useMemo } from "react";
import { getHexString, WHITE } from "@/lib/color";
import { blendColors } from "@/lib/contrast";
import { useColor1, useColor2 } from "@/store/colorStore";

/**
 * Returns the opaque text and background colors exactly as they are scored,
 * so translucent picks render the same way the contrast ratio sees them
 */
export const usePreviewColors = () => {
  const color1 = useColor1();
  const color2 = useColor2();

  return useMemo(() => {
    const bg = blendColors(color2, WHITE);
    const text = blendColors(color1, bg);

    return { text: getHexString(text), bg: getHexString(bg) };
  }, [color1, color2]);
};
