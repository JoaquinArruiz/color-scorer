import { describe, expect, it } from "vitest";
import { parseHex, type Color } from "@/lib/color";
import { getContrastRatio } from "@/lib/contrast";
import { getBetterColorPairs } from "@/lib/suggestions";

const hex = (value: string): Color => parseHex(value)!;

describe("getBetterColorPairs", () => {
  const text = hex("#888888");
  const bg = hex("#999999");
  const score = getContrastRatio(text, bg);

  it("only suggests pairs with a higher contrast, best first", () => {
    const suggestions = getBetterColorPairs(text, bg, score);
    expect(suggestions.length).toBeGreaterThan(0);
    for (const suggestion of suggestions) {
      expect(suggestion.score).toBeGreaterThan(score);
    }
    const scores = suggestions.map((suggestion) => suggestion.score);
    expect(scores).toEqual([...scores].sort((a, b) => b - a));
  });

  it("returns the same suggestions every time", () => {
    expect(getBetterColorPairs(text, bg, score)).toEqual(
      getBetterColorPairs(text, bg, score)
    );
  });
});
