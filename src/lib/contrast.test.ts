import { describe, expect, it } from "vitest";
import { BLACK, WHITE, parseHex, type Color } from "@/lib/color";
import {
  blendColors,
  formatRatio,
  getContrastRatio,
  getRelativeLuminance,
  getWcagRating,
  getWcagResult,
} from "@/lib/contrast";

const hex = (value: string): Color => parseHex(value)!;

describe("getRelativeLuminance", () => {
  it("returns 0 for black and 1 for white", () => {
    expect(getRelativeLuminance(BLACK)).toBe(0);
    expect(getRelativeLuminance(WHITE)).toBeCloseTo(1);
  });
});

describe("getContrastRatio", () => {
  it("returns 21 for black on white", () => {
    expect(getContrastRatio(BLACK, WHITE)).toBeCloseTo(21);
  });

  it("returns 1 for identical colors", () => {
    expect(getContrastRatio(hex("#3366cc"), hex("#3366cc"))).toBeCloseTo(1);
  });

  it("is symmetric for opaque colors", () => {
    const a = hex("#bb2649");
    const b = hex("#f5df4d");
    expect(getContrastRatio(a, b)).toBeCloseTo(getContrastRatio(b, a));
  });

  it("matches known reference values", () => {
    expect(getContrastRatio(hex("#777777"), WHITE)).toBeCloseTo(4.48, 2);
    expect(getContrastRatio(hex("#767676"), WHITE)).toBeCloseTo(4.54, 2);
    expect(getContrastRatio(hex("#0000ff"), WHITE)).toBeCloseTo(8.59, 2);
  });

  it("lowers the ratio for translucent text", () => {
    const halfBlack = { ...BLACK, a: 0.5 };
    const ratio = getContrastRatio(halfBlack, WHITE);
    expect(ratio).toBeLessThan(21);
    expect(ratio).toBeCloseTo(getContrastRatio(hex("#808080"), WHITE), 1);
  });

  it("treats translucent backgrounds as sitting on white", () => {
    const clear = { ...BLACK, a: 0 };
    expect(getContrastRatio(BLACK, clear)).toBeCloseTo(21);
  });
});

describe("blendColors", () => {
  it("returns the top color when it is opaque", () => {
    expect(blendColors(BLACK, WHITE)).toEqual(BLACK);
  });

  it("returns the backdrop when the top color is transparent", () => {
    expect(blendColors({ ...BLACK, a: 0 }, WHITE)).toEqual(WHITE);
  });
});

describe("getWcagResult", () => {
  it("applies the wcag thresholds", () => {
    expect(getWcagResult(3)).toEqual({
      aaLarge: true,
      aaNormal: false,
      aaaLarge: false,
      aaaNormal: false,
    });
    expect(getWcagResult(4.5)).toEqual({
      aaLarge: true,
      aaNormal: true,
      aaaLarge: true,
      aaaNormal: false,
    });
    expect(Object.values(getWcagResult(7)).every(Boolean)).toBe(true);
  });
});

describe("getWcagRating", () => {
  it("returns the highest level reached", () => {
    expect(getWcagRating(2)).toBe("Fail");
    expect(getWcagRating(3.5)).toBe("AA Large");
    expect(getWcagRating(5)).toBe("AA");
    expect(getWcagRating(12)).toBe("AAA");
  });
});

describe("formatRatio", () => {
  it("never rounds a failing ratio up to a passing one", () => {
    expect(formatRatio(4.499)).toBe("4.49");
    expect(formatRatio(21)).toBe("21.00");
  });
});
