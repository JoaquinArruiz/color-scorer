import { getApcaContrast } from "@/lib/apca";
import { getHexString, parseHex, type Color } from "@/lib/color";
import { blendPair, getContrastRatio } from "@/lib/contrast";

export interface PaletteColor {
  name: string;
  hex: string;
  color: Color;
}

export const MAX_PALETTE_COLORS = 16;

const HEX_PATTERN = /#(?:[\da-f]{8}|[\da-f]{6}|[\da-f]{3,4})\b/gi;
const BARE_HEX_PATTERN = /\b(?:[\da-f]{8}|[\da-f]{6}|[\da-f]{3})\b/gi;
// the key before a color, as in `--brand: #fff`, `"blue-500": "#fff"` or `primary = '#fff'`
const NAME_PATTERN = /["']?(-{0,2}[a-z_][\w-]*)["']?\s*[:=]\s*["']?$/i;

/**
 * Reads colors from whatever the user pastes: hex lists, css variables,
 * json or js design tokens and tailwind style color objects
 */
export const parsePalette = (
  input: string,
  max = MAX_PALETTE_COLORS
): PaletteColor[] => {
  const colors: PaletteColor[] = [];
  const seen = new Set<string>();
  // only fall back to hex values without # when there are none with it
  const pattern = input.includes("#") ? HEX_PATTERN : BARE_HEX_PATTERN;

  for (const line of input.split(/\r?\n/)) {
    const matches = [...line.matchAll(pattern)];

    for (const match of matches) {
      const color = parseHex(match[0]);
      if (!color) continue;

      const hex = getHexString(color, true);
      if (seen.has(hex)) continue;

      const before = line.slice(0, match.index);
      const name =
        matches.length === 1
          ? before.match(NAME_PATTERN)?.[1].replace(/^-+/, "")
          : undefined;

      seen.add(hex);
      colors.push({ name: name ?? hex, hex, color });
      if (colors.length >= max) return colors;
    }
  }

  return colors;
};

export const SAMPLE_PALETTE = `--ink: #0f172a;
--muted: #64748b;
--paper: #f8fafc;
--white: #ffffff;
--brand: #2563eb;
--accent: #fbbf24;
--danger: #e11d48;
--success: #047857;`;

export type PaletteMetric = "wcag" | "apca";

// strongest level first, the first one a pair reaches is its level
export const PALETTE_LEVELS: Record<
  PaletteMetric,
  { label: string; min: number }[]
> = {
  wcag: [
    { label: "AAA", min: 7 },
    { label: "AA", min: 4.5 },
    { label: "AA Large", min: 3 },
  ],
  apca: [
    { label: "Body", min: 75 },
    { label: "Content", min: 60 },
    { label: "Headline", min: 45 },
  ],
};

export interface PairScore {
  value: number;
  // index in PALETTE_LEVELS, or null when no level is reached
  level: number | null;
}

export const scorePair = (
  textColor: Color,
  bgColor: Color,
  metric: PaletteMetric
): PairScore => {
  const { text, bg } = blendPair(textColor, bgColor);
  const value =
    metric === "wcag"
      ? getContrastRatio(text, bg)
      : Math.abs(getApcaContrast(text, bg));
  const level = PALETTE_LEVELS[metric].findIndex(({ min }) => value >= min);

  return { value, level: level === -1 ? null : level };
};

// how many text/background pairs (excluding a color on itself) reach a level
export const countPassingPairs = (
  colors: PaletteColor[],
  metric: PaletteMetric,
  minLevel: number
) => {
  let passing = 0;
  let total = 0;

  for (const text of colors) {
    for (const bg of colors) {
      if (text === bg) continue;
      total++;
      const { level } = scorePair(text.color, bg.color, metric);
      if (level !== null && level <= minLevel) passing++;
    }
  }

  return { passing, total };
};
