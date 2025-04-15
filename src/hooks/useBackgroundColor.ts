import { useMemo } from "react";
import { type Color } from "@/store/colorStore";

/**
 * Hook to determine appropriate background color based on a foreground color
 * Returns a grayscale color that contrasts with the input color
 */
export const useBackgroundColor = (color: Color | null): string => {
  return useMemo(() => {
    if (!color) return "#ffffff";

    const r = color.r;
    const g = color.g;
    const b = color.b;

    const brightness = Math.round(0.299 * r + 0.587 * g + 0.114 * b);

    // invert brightness for contrast
    const backgroundValue = 255 - brightness;

    // convert to hex, dont use the getHexString because it only accepts a Color type, and this below is a string
    const bgHex = backgroundValue.toString(16).padStart(2, "0");
    return `#${bgHex}${bgHex}${bgHex}`;
  }, [color]);
};
