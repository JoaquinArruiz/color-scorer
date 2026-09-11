import { Store, useStore } from "@tanstack/react-store";
import { BLACK, WHITE, type Color } from "@/lib/color";
import { readColorsFromUrl } from "@/lib/shareUrl";

export type { Color } from "@/lib/color";
export { getHexString, getRgbaString } from "@/lib/color";

interface ColorState {
  color1: Color;
  color2: Color;
}

// start from the colors in a shared link when there is one
const getInitialState = (): ColorState => {
  const fromUrl =
    typeof window === "undefined"
      ? { color1: null, color2: null }
      : readColorsFromUrl(window.location.search);

  return {
    color1: fromUrl.color1 ?? BLACK,
    color2: fromUrl.color2 ?? WHITE,
  };
};

const initialState = getInitialState();

export const colorStore = new Store<ColorState>(initialState);

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

// reset colors to black and white
export const resetColors = () => {
  colorStore.setState((state) => ({
    ...state,
    color1: BLACK,
    color2: WHITE,
  }));
};

export const swapColors = () => {
  colorStore.setState((state) => ({
    ...state,
    color1: state.color2,
    color2: state.color1,
  }));
};

export { useStore };

export function useColor1() {
  return useStore(colorStore, (state) => state.color1);
}

export function useColor2() {
  return useStore(colorStore, (state) => state.color2);
}

export function useColorStore() {
  return useStore(colorStore, (state) => state);
}
