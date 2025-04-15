import { Info } from "@phosphor-icons/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useColor1, useColor2, getHexString } from "@/store/colorStore";
import { useContrastScore } from "@/hooks/useColor";

import { Repeat } from "@phosphor-icons/react";
import { resetColors } from "@/store/colorStore";
import { Button } from "@/components/ui/button";

const ActionBar = () => {
  const color1 = useColor1();
  const color2 = useColor2();
  const score = useContrastScore(getHexString(color1), getHexString(color2));
  const scoreColor =
    score < 4.5
      ? "text-red-500"
      : score < 7
      ? "text-yellow-500"
      : "text-green-500";

  return (
    <div className="fixed bottom-8 left-32 ring-1 ring-white -translate-x-1/2 bg-black/90 px-6 py-3 rounded-full flex items-center gap-3 transition-all ease-in-out duration-300">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={resetColors}
              className="bg-transparent rounded-full"
              aria-description="Reset colors"
            >
              <Repeat size={24} className="text-white" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" className="w-32 p-2 bg-white/90">
            Reset colors to white and black
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <span className={`text-2xl font-bold ${scoreColor}`}>
        {score.toFixed(2)}
      </span>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Info
              size={24}
              className="text-gray-400 cursor-help hover:text-gray-300 transition-colors"
            />
          </TooltipTrigger>
          <TooltipContent side="top" className="w-80 p-2 bg-black/90">
            <h3 className="font-semibold text-white mb-3">
              WCAG Contrast Requirements
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-green-400 font-medium mb-1">
                  Level AAA (Enhanced)
                </h4>
                <p className="text-gray-300">• Normal text: 7:1 or higher</p>
                <p className="text-gray-300">• Large text: 4.5:1 or higher</p>
              </div>
              <div>
                <h4 className="text-yellow-400 font-medium mb-1">
                  Level AA (Standard)
                </h4>
                <p className="text-gray-300">• Normal text: 4.5:1 or higher</p>
                <p className="text-gray-300">• Large text: 3:1 or higher</p>
              </div>
              <div>
                <h4 className="text-red-400 font-medium mb-1">
                  Below AA (Insufficient)
                </h4>
                <p className="text-gray-300">
                  The contrast ratio is below the recommended level
                </p>
              </div>
              <p className="text-xs text-gray-400 border-t border-gray-700 pt-2 mt-2">
                Large text is defined as 14 point (18.66px) and bold or larger,
                or 18 point (24px) or larger.
              </p>
              <p className="text-xs text-gray-400 mt-2">
                The contrast ratio is calculated using the next formula:
              </p>
              <p className="text-xs text-gray-400">(L1 + 0.05) / (L2 + 0.05)</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ActionBar;
