export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export const BLACK: Color = { r: 0, g: 0, b: 0, a: 1 };
export const WHITE: Color = { r: 255, g: 255, b: 255, a: 1 };

const toHexPair = (value: number) =>
  Math.round(value).toString(16).padStart(2, "0");

export const getRgbaString = (color: Color): string => {
  return `rgba(${color.r},${color.g},${color.b},${color.a})`;
};

export const getHexString = (color: Color, withAlpha = false): string => {
  const hex = `#${toHexPair(color.r)}${toHexPair(color.g)}${toHexPair(color.b)}`;
  return withAlpha && color.a < 1 ? `${hex}${toHexPair(color.a * 255)}` : hex;
};

// accepts #rgb, #rgba, #rrggbb and #rrggbbaa (with or without the #)
export const parseHex = (value: string): Color | null => {
  let hex = value.trim().replace(/^#/, "");
  if (!/^([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i.test(hex)) return null;

  if (hex.length <= 4) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const a = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1;

  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
    a: Math.round(a * 100) / 100,
  };
};

export const isSameColor = (color1: Color, color2: Color): boolean =>
  color1.r === color2.r &&
  color1.g === color2.g &&
  color1.b === color2.b &&
  color1.a === color2.a;

export const getHsl = ({ r, g, b }: Color) => {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const l = (max + min) / 2;

  if (max === min) return { h: 0, s: 0, l };

  const diff = max - min;
  const s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);
  let h =
    max === red
      ? (green - blue) / diff + (green < blue ? 6 : 0)
      : max === green
        ? (blue - red) / diff + 2
        : (red - green) / diff + 4;
  h *= 60;

  return { h, s, l };
};

// shifts a color in HSL space, hue in degrees and saturation/lightness in 0-1 steps
export const adjustColor = (
  color: Color,
  hueShift: number,
  satAdjust: number,
  lightAdjust: number
): Color => {
  const r = color.r / 255;
  const g = color.g / 255;
  const b = color.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (max !== min) {
    const diff = max - min;
    s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);

    if (max === r) {
      h = (g - b) / diff + (g < b ? 6 : 0);
    } else if (max === g) {
      h = (b - r) / diff + 2;
    } else {
      h = (r - g) / diff + 4;
    }

    h /= 6;
  }

  h = ((((h * 360 + hueShift) % 360) + 360) % 360) / 360;
  s = Math.max(0, Math.min(1, s + satAdjust));
  l = Math.max(0, Math.min(1, l + lightAdjust));

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  return {
    r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, h) * 255),
    b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
    a: color.a,
  };
};
