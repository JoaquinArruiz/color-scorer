import { useMemo } from "react";
import type { Color } from "@/lib/color";
import { getContrastRatio, getWcagRating, getWcagResult } from "@/lib/contrast";
import { getBetterColorPairs } from "@/lib/suggestions";
import { useColor1, useColor2 } from "@/store/colorStore";

export type { ColorPairSuggestionT } from "@/lib/suggestions";

export const useContrastScore = (textColor: Color, bgColor: Color): number => {
  return useMemo(
    () => getContrastRatio(textColor, bgColor),
    [textColor, bgColor]
  );
};

// contrast ratio and wcag results for the colors currently in the store
export const useContrast = () => {
  const ratio = useContrastScore(useColor1(), useColor2());

  return useMemo(
    () => ({
      ratio,
      rating: getWcagRating(ratio),
      result: getWcagResult(ratio),
    }),
    [ratio]
  );
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
