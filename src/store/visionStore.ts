import { Store, useStore } from "@tanstack/react-store";
import type { VisionType } from "@/lib/vision";

export const visionStore = new Store<{ vision: VisionType }>({
  vision: "normal",
});

export const setVision = (vision: VisionType) => {
  visionStore.setState(() => ({ vision }));
};

export function useVision() {
  return useStore(visionStore, (state) => state.vision);
}
