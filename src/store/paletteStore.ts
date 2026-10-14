import { Store, useStore } from "@tanstack/react-store";
import { SAMPLE_PALETTE } from "@/lib/palette";

export const PALETTE_PARAM = "palette";
const MAX_INPUT_LENGTH = 4000;

// start from a palette in a shared link when there is one
const getInitialInput = () => {
  if (typeof window === "undefined") return SAMPLE_PALETTE;
  const fromUrl = new URLSearchParams(window.location.search).get(
    PALETTE_PARAM
  );
  return fromUrl ? fromUrl.slice(0, MAX_INPUT_LENGTH) : SAMPLE_PALETTE;
};

export const paletteStore = new Store<{ input: string }>({
  input: getInitialInput(),
});

export const setPaletteInput = (input: string) => {
  paletteStore.setState(() => ({ input: input.slice(0, MAX_INPUT_LENGTH) }));
};

export function usePaletteInput() {
  return useStore(paletteStore, (state) => state.input);
}
