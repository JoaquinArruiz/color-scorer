import { describe, expect, it } from "vitest";
import { adjustColor, getHexString, parseHex, WHITE } from "@/lib/color";

describe("parseHex", () => {
  it("parses short and long hex values", () => {
    expect(parseHex("#fff")).toEqual(WHITE);
    expect(parseHex("ffffff")).toEqual(WHITE);
    expect(parseHex("#FF000080")).toEqual({ r: 255, g: 0, b: 0, a: 0.5 });
  });

  it("rejects invalid values", () => {
    expect(parseHex("#ggg")).toBeNull();
    expect(parseHex("#12345")).toBeNull();
    expect(parseHex("")).toBeNull();
  });
});

describe("getHexString", () => {
  it("formats colors and only adds alpha when asked", () => {
    const color = { r: 255, g: 0, b: 16, a: 0.5 };
    expect(getHexString(color)).toBe("#ff0010");
    expect(getHexString(color, true)).toBe("#ff001080");
    expect(getHexString({ ...color, a: 1 }, true)).toBe("#ff0010");
  });
});

describe("adjustColor", () => {
  it("rotates the hue in both directions", () => {
    const red = { r: 255, g: 0, b: 0, a: 1 };
    expect(adjustColor(red, 120, 0, 0)).toEqual({ r: 0, g: 255, b: 0, a: 1 });
    expect(adjustColor(red, -120, 0, 0)).toEqual({ r: 0, g: 0, b: 255, a: 1 });
  });

  it("clamps lightness", () => {
    expect(adjustColor(WHITE, 0, 0, 0.5)).toEqual(WHITE);
  });
});
