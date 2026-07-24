import { useMemo } from "react";
import { getPreviewColors } from "@/lib/contrast";
import { useColor1, useColor2 } from "@/store/colorStore";

/**
 * Returns the opaque text and background colors exactly as they are scored,
 * so translucent picks render the same way the contrast ratio sees them
 */
export const usePreviewColors = () => {
  const color1 = useColor1();
  const color2 = useColor2();

  return useMemo(() => getPreviewColors(color1, color2), [color1, color2]);
};
