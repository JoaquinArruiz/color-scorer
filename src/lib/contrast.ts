import { getHexString, WHITE, type Color } from "@/lib/color";

export const WCAG_THRESHOLDS = {
  aaLarge: 3,
  aaNormal: 4.5,
  aaaLarge: 4.5,
  aaaNormal: 7,
} as const;

export type WcagCheck = keyof typeof WCAG_THRESHOLDS;
export type WcagResult = Record<WcagCheck, boolean>;

const toLinear = (channel: number): number => {
  const value = channel / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
};

export const getRelativeLuminance = (color: Color): number =>
  0.2126 * toLinear(color.r) +
  0.7152 * toLinear(color.g) +
  0.0722 * toLinear(color.b);

// composites a (possibly translucent) color over an opaque backdrop
export const blendColors = (top: Color, backdrop: Color): Color => {
  const a = Math.min(1, Math.max(0, top.a));
  const mix = (front: number, back: number) => front * a + back * (1 - a);

  return {
    r: mix(top.r, backdrop.r),
    g: mix(top.g, backdrop.g),
    b: mix(top.b, backdrop.b),
    a: 1,
  };
};

// translucent backgrounds are assumed to sit on a white page
export const getContrastRatio = (textColor: Color, bgColor: Color): number => {
  const background = blendColors(bgColor, WHITE);
  const text = blendColors(textColor, background);

  const l1 = getRelativeLuminance(text);
  const l2 = getRelativeLuminance(background);

  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

export const getWcagResult = (ratio: number): WcagResult => ({
  aaLarge: ratio >= WCAG_THRESHOLDS.aaLarge,
  aaNormal: ratio >= WCAG_THRESHOLDS.aaNormal,
  aaaLarge: ratio >= WCAG_THRESHOLDS.aaaLarge,
  aaaNormal: ratio >= WCAG_THRESHOLDS.aaaNormal,
});

export type WcagRating = "AAA" | "AA" | "AA Large" | "Fail";

export const getWcagRating = (ratio: number): WcagRating => {
  if (ratio >= WCAG_THRESHOLDS.aaaNormal) return "AAA";
  if (ratio >= WCAG_THRESHOLDS.aaNormal) return "AA";
  if (ratio >= WCAG_THRESHOLDS.aaLarge) return "AA Large";
  return "Fail";
};

// truncate instead of rounding so a failing 4.499 is never shown as 4.50
export const formatRatio = (ratio: number): string =>
  (Math.floor(ratio * 100) / 100).toFixed(2);

// opaque colors for a pair exactly as it is scored and drawn
export const blendPair = (textColor: Color, bgColor: Color) => {
  const bg = blendColors(bgColor, WHITE);
  const text = blendColors(textColor, bg);

  return { text, bg };
};

// opaque hex colors for drawing a pair exactly as it is scored
export const getPreviewColors = (textColor: Color, bgColor: Color) => {
  const { text, bg } = blendPair(textColor, bgColor);

  return { text: getHexString(text), bg: getHexString(bg) };
};
