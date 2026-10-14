import { describe, expect, it } from "vitest";
import { BLACK, parseHex, WHITE, type Color } from "@/lib/color";
import { formatLc, getApcaContrast, getApcaResult } from "@/lib/apca";

const hex = (value: string): Color => parseHex(value)!;

describe("getApcaContrast", () => {
  it("matches the reference values of apca-w3", () => {
    expect(getApcaContrast(hex("#888"), WHITE)).toBeCloseTo(63.056, 2);
    expect(getApcaContrast(WHITE, hex("#888"))).toBeCloseTo(-68.541, 2);
    expect(getApcaContrast(BLACK, hex("#aaa"))).toBeCloseTo(58.146, 2);
    expect(getApcaContrast(hex("#aaa"), BLACK)).toBeCloseTo(-56.241, 2);
  });

  it("is polarity sensitive", () => {
    expect(getApcaContrast(BLACK, WHITE)).toBeCloseTo(106.04, 1);
    expect(getApcaContrast(WHITE, BLACK)).toBeCloseTo(-107.88, 1);
  });

  it("returns 0 for identical colors", () => {
    expect(getApcaContrast(hex("#3366cc"), hex("#3366cc"))).toBe(0);
  });
});

describe("getApcaResult", () => {
  it("uses the absolute lightness contrast", () => {
    expect(getApcaResult(-62)).toEqual({
      body: false,
      content: true,
      headline: true,
      spot: true,
    });
  });
});

describe("formatLc", () => {
  it("drops the sign and truncates to one decimal", () => {
    expect(formatLc(-107.88)).toBe("107.8");
    expect(formatLc(74.99)).toBe("74.9");
  });
});
