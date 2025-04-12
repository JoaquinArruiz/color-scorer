import { useMemo } from "react";

interface RGB {
  r: number;
  g: number;
  b: number;
}

export const useContrastScore = (color1: string, color2: string): number => {
  return useMemo(() => {
    const hexToRgb = (hex: string): RGB | null => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null;
    };

    const getRelativeLuminance = (rgb: RGB): number => {
      let { r, g, b } = rgb;
      r /= 255;
      g /= 255;
      b /= 255;

      r = r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4;
      g = g <= 0.03928 ? g / 12.92 : ((g + 0.055) / 1.055) ** 2.4;
      b = b <= 0.03928 ? b / 12.92 : ((b + 0.055) / 1.055) ** 2.4;

      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    if (!rgb1 || !rgb2) {
      return 0;
    }

    const L1 = getRelativeLuminance(rgb1);
    const L2 = getRelativeLuminance(rgb2);

    return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
  }, [color1, color2]);
};
