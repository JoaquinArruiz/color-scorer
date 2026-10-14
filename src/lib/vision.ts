import type { Color } from "@/lib/color";

export type VisionType =
  | "normal"
  | "protanopia"
  | "deuteranopia"
  | "tritanopia"
  | "achromatopsia";

export const VISION_TYPES: {
  value: VisionType;
  label: string;
  detail: string;
}[] = [
  { value: "normal", label: "Normal vision", detail: "No simulation" },
  { value: "protanopia", label: "Protanopia", detail: "No red cones" },
  { value: "deuteranopia", label: "Deuteranopia", detail: "No green cones" },
  { value: "tritanopia", label: "Tritanopia", detail: "No blue cones" },
  { value: "achromatopsia", label: "Achromatopsia", detail: "No color at all" },
];

type Matrix = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

// Machado, Oliveira and Fernandes (2009) at full severity, applied to linear RGB
const MATRICES: Record<Exclude<VisionType, "normal">, Matrix> = {
  protanopia: [
    0.152286, 1.052583, -0.204868, 0.114503, 0.786281, 0.099216, -0.003882,
    -0.048116, 1.051998,
  ],
  deuteranopia: [
    0.367322, 0.860646, -0.227968, 0.280085, 0.672501, 0.047413, -0.01182,
    0.04294, 0.968881,
  ],
  tritanopia: [
    1.255528, -0.076749, -0.178779, -0.078411, 0.930809, 0.147602, 0.004733,
    0.691367, 0.3039,
  ],
  // only luminance is left
  achromatopsia: [
    0.2126, 0.7152, 0.0722, 0.2126, 0.7152, 0.0722, 0.2126, 0.7152, 0.0722,
  ],
};

const toLinear = (channel: number) => {
  const value = channel / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
};

const toSrgb = (value: number) => {
  const clamped = Math.min(1, Math.max(0, value));
  const srgb =
    clamped <= 0.0031308
      ? clamped * 12.92
      : 1.055 * clamped ** (1 / 2.4) - 0.055;
  return Math.round(srgb * 255);
};

// how a color looks to someone with the given color vision deficiency
export const simulateVision = (color: Color, vision: VisionType): Color => {
  if (vision === "normal") return color;

  const m = MATRICES[vision];
  const r = toLinear(color.r);
  const g = toLinear(color.g);
  const b = toLinear(color.b);

  return {
    r: toSrgb(m[0] * r + m[1] * g + m[2] * b),
    g: toSrgb(m[3] * r + m[4] * g + m[5] * b),
    b: toSrgb(m[6] * r + m[7] * g + m[8] * b),
    a: color.a,
  };
};
