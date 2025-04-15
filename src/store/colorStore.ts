import { Store, useStore } from "@tanstack/react-store";

export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface ColorState {
  color1: Color;
  color2: Color;
}

const initialState: ColorState = {
  color1: { r: 0, g: 0, b: 0, a: 1 }, // Black
  color2: { r: 255, g: 255, b: 255, a: 1 }, // White
};

export const colorStore = new Store<ColorState>(initialState);

// Helper functions for updating colors
export const setColor1 = (color: Color) => {
  colorStore.setState((state) => ({
    ...state,
    color1: color,
  }));
};

export const setColor2 = (color: Color) => {
  colorStore.setState((state) => ({
    ...state,
    color2: color,
  }));
};

// Reset colors to black and white
export const resetColors = () => {
  colorStore.setState((state) => ({
    ...state,
    color1: { r: 0, g: 0, b: 0, a: 1 },
    color2: { r: 255, g: 255, b: 255, a: 1 },
  }));
};

export const swapColors = () => {
  colorStore.setState((state) => ({
    ...state,
    color1: state.color2,
    color2: state.color1,
  }));
};

export const getRgbaString = (color: Color): string => {
  return `rgba(${color.r},${color.g},${color.b},${color.a})`;
};

export const getHexString = (color: Color, transparency?: number): string => {
  const r = color.r.toString(16).padStart(2, "0");
  const g = color.g.toString(16).padStart(2, "0");
  const b = color.b.toString(16).padStart(2, "0");
  const a = Math.round(color.a * 255)
    .toString(16)
    .padStart(2, "0");

  return `#${r}${g}${b}${transparency ? a : ""}`;
};

// Export the useStore hook directly
export { useStore };

// Custom selector hooks
export function useColor1() {
  return useStore(colorStore, (state) => state.color1);
}

export function useColor2() {
  return useStore(colorStore, (state) => state.color2);
}

// Full store state hook
export function useColorStore() {
  return useStore(colorStore, (state) => state);
}
