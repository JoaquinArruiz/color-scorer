import { adjustColor, BLACK, WHITE, type Color } from "@/lib/color";
import { getContrastRatio, getRelativeLuminance } from "@/lib/contrast";

export interface ColorPairSuggestionT {
  textColor: Color;
  bgColor: Color;
  score: number;
}

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
  // Check if it's the basic black on white or white on black
  const isBlackOnWhite =
    areColorsSimilar(textColor, BLACK) && areColorsSimilar(bgColor, WHITE);
  const isWhiteOnBlack =
    areColorsSimilar(textColor, WHITE) && areColorsSimilar(bgColor, BLACK);

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
    const score = getContrastRatio(text, bg);
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

  // Only recommend black and white if they're significantly better or we're in a low contrast situation
  if (currentScore < 10) {
    addPairIfBetter(BLACK, WHITE);
    addPairIfBetter(WHITE, BLACK);
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
    // fixed hue/lightness variations so the list stays stable between renders
    const variations = [
      { hue: 60, text: -0.3, bg: 0.3 },
      { hue: 135, text: 0.3, bg: -0.3 },
      { hue: 210, text: -0.25, bg: 0.25 },
      { hue: 285, text: 0.25, bg: -0.25 },
      { hue: 330, text: -0.3, bg: 0.2 },
    ];

    for (const variation of variations) {
      const newText = adjustColor(textColor, variation.hue, 0, variation.text);
      const newBg = adjustColor(bgColor, variation.hue + 180, 0, variation.bg);

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
