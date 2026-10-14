import { adjustColor, getHsl, isSameColor, type Color } from "@/lib/color";
import { getContrastRatio, WCAG_THRESHOLDS } from "@/lib/contrast";

export interface ColorFix {
  target: "text" | "bg";
  level: "AA" | "AAA";
  direction: "darker" | "lighter";
  color: Color;
  ratio: number;
  // how far the lightness moved, from 0 to 1
  delta: number;
}

const LIGHTNESS_STEP = 0.002;

/**
 * Finds the smallest lightness change to one color of the pair that reaches
 * the target ratio, keeping its hue and saturation
 */
export const findLightnessFix = (
  textColor: Color,
  bgColor: Color,
  target: "text" | "bg",
  targetRatio: number
): Omit<ColorFix, "level"> | null => {
  const color = target === "text" ? textColor : bgColor;
  const { l } = getHsl(color);
  const ratioFor = (candidate: Color) =>
    target === "text"
      ? getContrastRatio(candidate, bgColor)
      : getContrastRatio(textColor, candidate);

  let best: Omit<ColorFix, "level"> | null = null;

  for (const direction of ["darker", "lighter"] as const) {
    const sign = direction === "darker" ? -1 : 1;

    for (
      let delta = LIGHTNESS_STEP;
      delta <= 1 &&
      l + sign * delta >= -LIGHTNESS_STEP / 2 &&
      l + sign * delta <= 1 + LIGHTNESS_STEP / 2;
      delta += LIGHTNESS_STEP
    ) {
      if (best && delta >= best.delta) break;

      const candidate = adjustColor(color, 0, 0, sign * delta);
      const ratio = ratioFor(candidate);

      if (ratio >= targetRatio) {
        best = { target, direction, color: candidate, ratio, delta };
        break;
      }
    }
  }

  return best;
};

// quick fixes for every level the pair does not reach yet, smallest change first
export const getQuickFixes = (
  textColor: Color,
  bgColor: Color,
  limit = 4
): ColorFix[] => {
  const currentRatio = getContrastRatio(textColor, bgColor);
  const fixes: ColorFix[] = [];

  const levels = [
    { level: "AA", ratio: WCAG_THRESHOLDS.aaNormal },
    { level: "AAA", ratio: WCAG_THRESHOLDS.aaaNormal },
  ] as const;

  for (const { level, ratio } of levels) {
    if (currentRatio >= ratio) continue;

    for (const target of ["text", "bg"] as const) {
      const fix = findLightnessFix(textColor, bgColor, target, ratio);
      if (!fix) continue;

      const duplicate = fixes.some(
        (existing) =>
          existing.target === fix.target &&
          isSameColor(existing.color, fix.color)
      );
      if (!duplicate) fixes.push({ ...fix, level });
    }
  }

  // keep AA fixes first, then the smallest change
  return fixes
    .sort((a, b) =>
      a.level === b.level ? a.delta - b.delta : a.level === "AA" ? -1 : 1
    )
    .slice(0, limit);
};
