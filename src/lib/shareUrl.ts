import { getHexString, parseHex, type Color } from "@/lib/color";

const TEXT_PARAM = "text";
const BG_PARAM = "bg";

export const readColorsFromUrl = (
  search: string
): { color1: Color | null; color2: Color | null } => {
  const params = new URLSearchParams(search);

  return {
    color1: parseHex(params.get(TEXT_PARAM) ?? ""),
    color2: parseHex(params.get(BG_PARAM) ?? ""),
  };
};

export const buildShareUrl = (href: string, color1: Color, color2: Color) => {
  const url = new URL(href);
  url.searchParams.set(TEXT_PARAM, getHexString(color1, true).slice(1));
  url.searchParams.set(BG_PARAM, getHexString(color2, true).slice(1));
  return url.toString();
};
