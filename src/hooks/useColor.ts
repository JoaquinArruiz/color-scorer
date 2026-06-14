import { useMemo } from "react";
import type { Color } from "@/lib/color";
import { getContrastRatio } from "@/lib/contrast";
import { getBetterColorPairs } from "@/lib/suggestions";

export type { ColorPairSuggestionT } from "@/lib/suggestions";

export const useContrastScore = (textColor: Color, bgColor: Color): number => {
  return useMemo(
    () => getContrastRatio(textColor, bgColor),
    [textColor, bgColor]
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
