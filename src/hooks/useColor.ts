import { useMemo } from "react";
import type { Color } from "@/store/colorStore";

interface RGB {
  r: number;
  g: number;
  b: number;
}

// Updated to store a pair of colors
export interface ColorPairSuggestionT {
  textColor: Color;
  bgColor: Color;
  score: number;
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

const getRelativeLuminance = (color: Color): number => {
  let { r, g, b } = color;
  r /= 255;
  g /= 255;
  b /= 255;

  r = r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4;
  g = g <= 0.03928 ? g / 12.92 : ((g + 0.055) / 1.055) ** 2.4;
  b = b <= 0.03928 ? b / 12.92 : ((b + 0.055) / 1.055) ** 2.4;

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

// Calculate contrast ratio between two colors
const calculateContrastRatio = (color1: Color, color2: Color): number => {
  const l1 = getRelativeLuminance(color1);
  const l2 = getRelativeLuminance(color2);

  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

const adjustColor = (
  color: Color,
  hueShift: number,
  satAdjust: number,
  lightAdjust: number
): Color => {
  const r = color.r / 255;
  const g = color.g / 255;
  const b = color.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (max !== min) {
    const diff = max - min;
    s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);

    if (max === r) {
      h = (g - b) / diff + (g < b ? 6 : 0);
    } else if (max === g) {
      h = (b - r) / diff + 2;
    } else {
      h = (r - g) / diff + 4;
    }

    h /= 6;
  }

  h = (h * 360 + hueShift) % 360;
  s = Math.max(0, Math.min(1, s + satAdjust));
  l = Math.max(0, Math.min(1, l + lightAdjust));

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  const newR = Math.round(hue2rgb(p, q, (h / 360 + 1 / 3) % 1) * 255);
  const newG = Math.round(hue2rgb(p, q, h / 360) * 255);
  const newB = Math.round(hue2rgb(p, q, (h / 360 - 1 / 3 + 1) % 1) * 255);

  return {
    r: newR,
    g: newG,
    b: newB,
    a: color.a,
  };
};

// check if two colors are nearly identical to avoid similar recommendations
const areColorsSimilar = (
  color1: Color,
  color2: Color,
  threshold = 15
): boolean => {
  return (
    Math.abs(color1.r - color2.r) +
      Math.abs(color1.g - color2.g) +
      Math.abs(color1.b - color2.b) <
    threshold
  );
};

// Check if a color pair is too common/basic
const isCommonColorPair = (textColor: Color, bgColor: Color): boolean => {
  const black: Color = { r: 0, g: 0, b: 0, a: 1 };
  const white: Color = { r: 255, g: 255, b: 255, a: 1 };

  // Check if it's the basic black on white or white on black
  const isBlackOnWhite =
    areColorsSimilar(textColor, black) && areColorsSimilar(bgColor, white);
  const isWhiteOnBlack =
    areColorsSimilar(textColor, white) && areColorsSimilar(bgColor, black);

  return isBlackOnWhite || isWhiteOnBlack;
};

export const getBetterColorPairs = (
  textColor: Color,
  bgColor: Color,
  currentScore: number,
  limit: number = 5
): ColorPairSuggestionT[] => {
  const suggestions: ColorPairSuggestionT[] = [];
  const existingPairs = new Set<string>();

  const addPairIfBetter = (text: Color, bg: Color) => {
    if (areColorsSimilar(text, bg, 100)) return;
    const score = calculateContrastRatio(text, bg);
    if (score <= currentScore) return;
    const pairKey = `${text.r}-${text.g}-${text.b}_${bg.r}-${bg.g}-${bg.b}`;
    if (existingPairs.has(pairKey)) return;

    existingPairs.add(pairKey);
    suggestions.push({
      textColor: text,
      bgColor: bg,
      score,
    });
  };

  // Black and white presets (only add if significantly better than current)
  const black: Color = { r: 0, g: 0, b: 0, a: 1 };
  const white: Color = { r: 255, g: 255, b: 255, a: 1 };

  // Only recommend black and white if they're significantly better or we're in a low contrast situation
  if (currentScore < 10) {
    addPairIfBetter(black, white);
    addPairIfBetter(white, black);
  }

  for (let lightText = -0.3; lightText <= 0.3; lightText += 0.3) {
    for (let lightBg = -0.3; lightBg <= 0.3; lightBg += 0.3) {
      // Skip if both adjustments are 0 (would be original colors)
      if (lightText === 0 && lightBg === 0) continue;

      const newText = adjustColor(textColor, 0, 0, lightText);
      const newBg = adjustColor(bgColor, 0, 0, lightBg);

      addPairIfBetter(newText, newBg);
    }
  }

  addPairIfBetter(adjustColor(textColor, 180, 0, 0), bgColor);
  addPairIfBetter(textColor, adjustColor(bgColor, 180, 0, 0));

  addPairIfBetter(adjustColor(textColor, 120, 0, 0), bgColor);
  addPairIfBetter(adjustColor(textColor, 240, 0, 0), bgColor);

  const textLuminance = getRelativeLuminance(textColor);
  if (textLuminance < 0.5) {
    addPairIfBetter(textColor, adjustColor(bgColor, 0, 0, 0.4));
  } else {
    addPairIfBetter(textColor, adjustColor(bgColor, 0, 0, -0.4));
  }

  addPairIfBetter(
    adjustColor(textColor, 0, 0.3, 0),
    adjustColor(bgColor, 0, -0.2, 0)
  );

  addPairIfBetter(adjustColor(textColor, 30, 0, 0), bgColor);
  addPairIfBetter(textColor, adjustColor(bgColor, -30, 0, 0));

  if (suggestions.length < limit) {
    // high contrast options
    const darkGray: Color = { r: 30, g: 30, b: 30, a: 1 };
    const lightGray: Color = { r: 240, g: 240, b: 240, a: 1 };
    const navy: Color = { r: 0, g: 0, b: 128, a: 1 };
    const cream: Color = { r: 255, g: 253, b: 208, a: 1 };

    addPairIfBetter(darkGray, lightGray);
    addPairIfBetter(navy, cream);
  }

  if (suggestions.length < limit) {
    for (let i = 0; i < 5; i++) {
      const hueShift = Math.floor(Math.random() * 360);
      const textLightness = Math.random() * 0.6 - 0.3; // -0.3 to 0.3
      const bgLightness = Math.random() * 0.6 - 0.3; // -0.3 to 0.3

      const newText = adjustColor(textColor, hueShift, 0, textLightness);
      const newBg = adjustColor(bgColor, hueShift + 180, 0, bgLightness);

      addPairIfBetter(newText, newBg);
    }
  }

  let result = suggestions.sort((a, b) => b.score - a.score);

  if (result.length > limit + 2) {
    result = result.filter(
      (suggestion) =>
        !isCommonColorPair(suggestion.textColor, suggestion.bgColor)
    );
  }

  return result.slice(0, limit);
};

export const useColorPairSuggestions = (
  textColor: Color,
  bgColor: Color,
  currentScore: number,
  limit: number = 4
) => {
  return useMemo(
    () => getBetterColorPairs(textColor, bgColor, currentScore, limit),
    [textColor, bgColor, currentScore, limit]
  );
};
