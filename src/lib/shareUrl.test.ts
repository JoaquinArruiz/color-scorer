import { describe, expect, it } from "vitest";
import { BLACK, WHITE } from "@/lib/color";
import { buildShareUrl, readColorsFromUrl } from "@/lib/shareUrl";

describe("share url", () => {
  it("round trips both colors, including transparency", () => {
    const translucent = { r: 29, g: 78, b: 216, a: 0.5 };
    const url = buildShareUrl(
      "https://example.com/color-scorer/",
      translucent,
      WHITE
    );

    expect(url).toBe(
      "https://example.com/color-scorer/?text=1d4ed880&bg=ffffff"
    );
    const { color1, color2 } = readColorsFromUrl(new URL(url).search);
    expect(color1).toEqual({ ...translucent, a: 0.5 });
    expect(color2).toEqual(WHITE);
  });

  it("keeps other query params", () => {
    const url = buildShareUrl("https://example.com/?ref=x", BLACK, WHITE);
    expect(new URL(url).searchParams.get("ref")).toBe("x");
  });

  it("ignores missing or invalid values", () => {
    expect(readColorsFromUrl("?text=nope")).toEqual({
      color1: null,
      color2: null,
    });
  });
});
