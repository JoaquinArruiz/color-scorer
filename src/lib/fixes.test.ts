import { describe, expect, it } from "vitest";
import { getHsl, parseHex, WHITE, type Color } from "@/lib/color";
import { getContrastRatio } from "@/lib/contrast";
import { findLightnessFix, getQuickFixes } from "@/lib/fixes";

const hex = (value: string): Color => parseHex(value)!;

describe("findLightnessFix", () => {
  it("darkens light gray text just enough to reach AA", () => {
    const fix = findLightnessFix(hex("#777777"), WHITE, "text", 4.5)!;
    expect(fix.direction).toBe("darker");
    expect(getContrastRatio(fix.color, WHITE)).toBeGreaterThanOrEqual(4.5);
    expect(fix.delta).toBeLessThan(0.02);
  });

  it("keeps the hue of the color it changes", () => {
    const blue = hex("#60a5fa");
    const fix = findLightnessFix(blue, WHITE, "text", 4.5)!;
    expect(Math.abs(getHsl(fix.color).h - getHsl(blue).h)).toBeLessThan(3);
    expect(fix.ratio).toBeGreaterThanOrEqual(4.5);
  });

  it("returns null when no lightness reaches the target", () => {
    const gray = hex("#808080");
    // a mid gray background can't reach 21:1 with any text color
    expect(findLightnessFix(gray, gray, "text", 21)).toBeNull();
  });
});

describe("getQuickFixes", () => {
  it("returns AA fixes first and nothing for a passing pair", () => {
    const fixes = getQuickFixes(hex("#999999"), WHITE);
    expect(fixes.length).toBeGreaterThan(0);
    expect(fixes[0].level).toBe("AA");
    expect(getQuickFixes(hex("#000000"), WHITE)).toEqual([]);
  });
});

describe("getHsl", () => {
  it("returns hue in degrees", () => {
    expect(getHsl(hex("#ff0000"))).toEqual({ h: 0, s: 1, l: 0.5 });
    expect(getHsl(hex("#0000ff")).h).toBe(240);
  });
});
