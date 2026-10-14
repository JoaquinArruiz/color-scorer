import type { Color } from "@/lib/color";

/**
 * APCA (Accessible Perceptual Contrast Algorithm), the contrast method being
 * developed for WCAG 3. Constants follow APCA-W3 0.0.98G-4g.
 * It returns a lightness contrast (Lc) from about -108 to 106: positive for
 * dark text on a light background and negative for light text on dark.
 */
const MAIN_TRC = 2.4;
const R_COEF = 0.2126729;
const G_COEF = 0.7151522;
const B_COEF = 0.072175;

const NORM_BG = 0.56;
const NORM_TXT = 0.57;
const REV_TXT = 0.62;
const REV_BG = 0.65;

const BLACK_THRESHOLD = 0.022;
const BLACK_CLAMP = 1.414;
const SCALE = 1.14;
const LOW_OFFSET = 0.027;
const LOW_CLIP = 0.1;
const DELTA_Y_MIN = 0.0005;

// screen luminance estimate, with a soft clamp for very dark colors
const getApcaLuminance = ({ r, g, b }: Color): number => {
  const y =
    R_COEF * (r / 255) ** MAIN_TRC +
    G_COEF * (g / 255) ** MAIN_TRC +
    B_COEF * (b / 255) ** MAIN_TRC;

  return y > BLACK_THRESHOLD ? y : y + (BLACK_THRESHOLD - y) ** BLACK_CLAMP;
};

// expects opaque colors, blend translucent ones first
export const getApcaContrast = (textColor: Color, bgColor: Color): number => {
  const yText = getApcaLuminance(textColor);
  const yBg = getApcaLuminance(bgColor);

  if (Math.abs(yBg - yText) < DELTA_Y_MIN) return 0;

  if (yBg > yText) {
    // dark text on a light background
    const sapc = (yBg ** NORM_BG - yText ** NORM_TXT) * SCALE;
    return sapc < LOW_CLIP ? 0 : (sapc - LOW_OFFSET) * 100;
  }

  // light text on a dark background
  const sapc = (yBg ** REV_BG - yText ** REV_TXT) * SCALE;
  return sapc > -LOW_CLIP ? 0 : (sapc + LOW_OFFSET) * 100;
};

/**
 * Minimum Lc per use, from the APCA readability guidelines (bronze level).
 * APCA ties these to font size and weight, so they are a simplified summary.
 */
export const APCA_LEVELS = [
  { key: "body", lc: 75, label: "Body text", detail: "18px regular and up" },
  {
    key: "content",
    lc: 60,
    label: "Content text",
    detail: "24px regular or 16px bold",
  },
  {
    key: "headline",
    lc: 45,
    label: "Headlines",
    detail: "36px regular or 24px bold",
  },
  {
    key: "spot",
    lc: 30,
    label: "Spot text & UI",
    detail: "placeholders, disabled text, icons",
  },
] as const;

export type ApcaLevelKey = (typeof APCA_LEVELS)[number]["key"];

export const getApcaResult = (lc: number): Record<ApcaLevelKey, boolean> => {
  const value = Math.abs(lc);
  return Object.fromEntries(
    APCA_LEVELS.map((level) => [level.key, value >= level.lc])
  ) as Record<ApcaLevelKey, boolean>;
};

export const formatLc = (lc: number): string =>
  (Math.trunc(Math.abs(lc) * 10) / 10).toFixed(1);
