import type { Color } from "@/lib/color";

const toLinear = (channel: number): number => {
  const value = channel / 255;
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
};

export const getRelativeLuminance = (color: Color): number =>
  0.2126 * toLinear(color.r) +
  0.7152 * toLinear(color.g) +
  0.0722 * toLinear(color.b);

export const getContrastRatio = (textColor: Color, bgColor: Color): number => {
  const l1 = getRelativeLuminance(textColor);
  const l2 = getRelativeLuminance(bgColor);

  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};
