import { ArrowUpDown, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColorField } from "@/components/color/ColorField";
import {
  resetColors,
  setColor1,
  setColor2,
  swapColors,
  useColor1,
  useColor2,
} from "@/store/colorStore";

export const MobileColorBar = () => {
  const color1 = useColor1();
  const color2 = useColor2();

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-zinc-800 bg-zinc-900/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-xl items-center gap-3">
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex items-center gap-3">
            <span className="w-20 shrink-0 text-xs text-zinc-400">Text</span>
            <ColorField
              label="Text"
              color={color1}
              onChange={setColor1}
              className="flex-1"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="w-20 shrink-0 text-xs text-zinc-400">
              Background
            </span>
            <ColorField
              label="Background"
              color={color2}
              onChange={setColor2}
              className="flex-1"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={swapColors}
            aria-label="Swap text and background colors"
          >
            <ArrowUpDown />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={resetColors}
            aria-label="Reset colors"
          >
            <RotateCcw />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileColorBar;
