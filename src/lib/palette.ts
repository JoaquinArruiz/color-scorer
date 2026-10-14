import { getHexString, parseHex, type Color } from "@/lib/color";

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
