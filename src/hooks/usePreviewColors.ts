import { useMemo } from "react";
import { getHexString } from "@/lib/color";
import { blendPair } from "@/lib/contrast";
import { simulateVision } from "@/lib/vision";
import { useColor1, useColor2 } from "@/store/colorStore";
import { useVision } from "@/store/visionStore";

/**
 * Returns the opaque text and background colors exactly as they are scored,
 * so translucent picks render the same way the contrast ratio sees them.
 * When a vision simulation is active, the colors are shown as seen with it
 */
export const useSimulatedPair = () => {
  const color1 = useColor1();
  const color2 = useColor2();
  const vision = useVision();

  return useMemo(() => {
    const { text, bg } = blendPair(color1, color2);
    return {
      vision,
      text: simulateVision(text, vision),
      bg: simulateVision(bg, vision),
    };
  }, [color1, color2, vision]);
};

export const usePreviewColors = () => {
  const { text, bg } = useSimulatedPair();

  return useMemo(
    () => ({ text: getHexString(text), bg: getHexString(bg) }),
    [text, bg]
  );
};
