import { Eye } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatLc, getApcaContrast } from "@/lib/apca";
import { formatRatio, getContrastRatio } from "@/lib/contrast";
import { VISION_TYPES, type VisionType } from "@/lib/vision";
import { useSimulatedPair } from "@/hooks/usePreviewColors";
import { setVision } from "@/store/visionStore";

// lets the previews be seen as people with color vision deficiencies see them
export const VisionControls = () => {
  const { vision, text, bg } = useSimulatedPair();
  const active = VISION_TYPES.find((type) => type.value === vision)!;

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-zinc-900 p-4 ring-1 ring-zinc-800 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <Eye aria-hidden className="size-5 shrink-0 text-zinc-400" />
        <div>
          <h2 className="text-sm font-semibold text-zinc-100">
            Simulate color vision
          </h2>
          <p className="text-xs text-zinc-400">
            {vision === "normal"
              ? "See the previews as people with color blindness do."
              : `${active.detail}. Seen this way the pair has ${formatRatio(
                  getContrastRatio(text, bg)
                )}:1 · Lc ${formatLc(getApcaContrast(text, bg))}`}
          </p>
        </div>
      </div>
      <Select
        value={vision}
        onValueChange={(value) => setVision(value as VisionType)}
      >
        <SelectTrigger
          aria-label="Color vision simulation"
          className="w-full sm:w-56"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {VISION_TYPES.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default VisionControls;
