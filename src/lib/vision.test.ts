import { describe, expect, it } from "vitest";
import { BLACK, parseHex, WHITE, type Color } from "@/lib/color";
import { simulateVision, VISION_TYPES } from "@/lib/vision";

const hex = (value: string): Color => parseHex(value)!;

describe("simulateVision", () => {
  it("leaves colors untouched for normal vision", () => {
    const color = hex("#bb2649");
    expect(simulateVision(color, "normal")).toBe(color);
  });

  it("keeps black and white for every simulation", () => {
    for (const { value } of VISION_TYPES) {
      expect(simulateVision(BLACK, value)).toEqual(BLACK);
      expect(simulateVision(WHITE, value)).toEqual(WHITE);
    }
  });

  it("turns colors into grays without color vision", () => {
    const { r, g, b } = simulateVision(hex("#3b82f6"), "achromatopsia");
    expect(r).toBe(g);
    expect(g).toBe(b);
  });

  it("makes red and green hard to tell apart for protanopia", () => {
    const red = simulateVision(hex("#d00000"), "protanopia");
    const green = simulateVision(hex("#6b8e00"), "protanopia");
    const distance =
      Math.abs(red.r - green.r) +
      Math.abs(red.g - green.g) +
      Math.abs(red.b - green.b);
    expect(distance).toBeLessThan(120);
  });

  it("keeps the alpha channel", () => {
    expect(simulateVision({ ...WHITE, a: 0.5 }, "tritanopia").a).toBe(0.5);
  });
});
