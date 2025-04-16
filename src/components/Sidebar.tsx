import React from "react";
import { ArrowsClockwise } from "@phosphor-icons/react";
import {
  useColor1,
  useColor2,
  getHexString,
  swapColors,
  resetColors,
} from "@/store/colorStore";
import { useContrastScore } from "@/hooks/useColor";
import { Button } from "@/components/ui/button";
import SidebarColorPicker from "./SidebarColorPicker";

const Sidebar = () => {
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
    <div className="fixed left-0 top-0 w-60 h-screen bg-black/90 text-white flex flex-col z-50 overflow-y-auto ring-1 ring-white/20">
      <div className="p-4 border-b border-white/20">
        <h1 className="text-xl font-bold mb-2">Color Scorer</h1>
        <div className="flex items-center gap-2">
          <span className={`text-2xl font-bold ${scoreColor}`}>
            {score.toFixed(2)}
          </span>
          <span className="text-sm text-white/70">Contrast Score</span>
        </div>
      </div>

      <div className="p-4 border-b border-white/20">
        <div className="mb-4">
          <h2 className="text-sm font-medium mb-2 text-white/70">
            Background Color
          </h2>
          <SidebarColorPicker colorNumber={2} />
        </div>

        <div className="mb-4">
          <h2 className="text-sm font-medium mb-2 text-white/70">Text Color</h2>
          <SidebarColorPicker colorNumber={1} />
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            onClick={swapColors}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20"
          >
            <ArrowsClockwise size={16} />
            Swap Colors
          </Button>
          <Button
            onClick={resetColors}
            className="bg-white/10 hover:bg-white/20"
          >
            Reset
          </Button>
        </div>
      </div>

      <div className="p-4 text-sm">
        <h2 className="font-medium mb-2">WCAG Contrast Requirements</h2>
        <div className="space-y-3">
          <div>
            <h3 className="text-green-400 font-medium">Level AAA (Enhanced)</h3>
            <p className="text-white/70">• Normal text: 7:1 or higher</p>
            <p className="text-white/70">• Large text: 4.5:1 or higher</p>
          </div>
          <div>
            <h3 className="text-yellow-400 font-medium">Level AA (Standard)</h3>
            <p className="text-white/70">• Normal text: 4.5:1 or higher</p>
            <p className="text-white/70">• Large text: 3:1 or higher</p>
          </div>
          <div>
            <h3 className="text-red-400 font-medium">
              Below AA (Insufficient)
            </h3>
            <p className="text-white/70">
              The contrast ratio is below the recommended level
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
