import { useEffect } from "react";
import { SAMPLE_PALETTE } from "@/lib/palette";
import { PALETTE_PARAM, usePaletteInput } from "@/store/paletteStore";

// keeps a custom palette in the address bar so the matrix can be shared
export const usePaletteUrlSync = () => {
  const input = usePaletteInput();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const url = new URL(window.location.href);
      if (input.trim() && input !== SAMPLE_PALETTE) {
        url.searchParams.set(PALETTE_PARAM, input);
      } else {
        url.searchParams.delete(PALETTE_PARAM);
      }
      window.history.replaceState(window.history.state, "", url);
    }, 300);

    return () => clearTimeout(timeout);
  }, [input]);
};
