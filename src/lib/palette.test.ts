import { describe, expect, it } from "vitest";
import { parsePalette } from "@/lib/palette";

const names = (input: string) => parsePalette(input).map((color) => color.name);
const hexes = (input: string) => parsePalette(input).map((color) => color.hex);

describe("parsePalette", () => {
  it("reads plain hex lists in any separator", () => {
    expect(hexes("#fff, #000000\n#1d4ed8 #FEF3C7")).toEqual([
      "#ffffff",
      "#000000",
      "#1d4ed8",
      "#fef3c7",
    ]);
  });

  it("names colors from css variables", () => {
    expect(names("--brand: #2563eb;\n--brand-dark: #1e40af;")).toEqual([
      "brand",
      "brand-dark",
    ]);
  });

  it("names colors from json and js tokens", () => {
    const input = `{
      "blue-500": "#3b82f6",
      primary: '#0f172a',
    }`;
    expect(names(input)).toEqual(["blue-500", "primary"]);
  });

  it("falls back to the hex when a line has several colors", () => {
    expect(names("pair: #000 #fff")).toEqual(["#000000", "#ffffff"]);
  });

  it("accepts hex values without # when none have it", () => {
    expect(hexes("1d4ed8, fef3c7")).toEqual(["#1d4ed8", "#fef3c7"]);
  });

  it("keeps transparency and skips duplicates", () => {
    expect(hexes("#ff000080 #FF000080 #f00")).toEqual(["#ff000080", "#ff0000"]);
  });

  it("stops at the maximum", () => {
    const many = Array.from(
      { length: 20 },
      (_, index) => `#${index.toString(16).padStart(2, "0")}0000`
    ).join(" ");
    expect(parsePalette(many, 5)).toHaveLength(5);
  });
});
