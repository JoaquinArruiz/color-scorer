import React from "react";
import { Button } from "@/components/ui/button";
import { getHexString, setColor1, setColor2 } from "@/store/colorStore";
import type { ColorPairSuggestionT } from "@/hooks/useColor";

interface ColorPairSuggestionProps {
  suggestion: ColorPairSuggestionT;
}

export const ColorPairSuggestion: React.FC<ColorPairSuggestionProps> = ({
  suggestion,
}) => {
  const { textColor, bgColor, score } = suggestion;

  const handleApply = () => {
    setColor1(textColor);
    setColor2(bgColor);
  };

  // Sample preview text with the suggested colors
  const previewText = "Aa";

  return (
    <div className="flex items-center justify-between gap-2 py-1.5 group hover:bg-white/5 rounded px-1">
      <div className="flex items-center gap-2">
        <div
          className="w-12 h-8 flex items-center justify-center rounded border border-white/20 text-xs font-semibold"
          style={{
            backgroundColor: getHexString(bgColor),
            color: getHexString(textColor),
          }}
        >
          {previewText}
        </div>
        <span className="text-xs text-white/70 font-mono">
          {score.toFixed(2)}
        </span>
      </div>

      <Button
        size="sm"
        variant="ghost"
        className="h-6 text-xs bg-white/10 hover:bg-white/20 px-2"
        onClick={handleApply}
      >
        Apply
      </Button>
    </div>
  );
};

export default ColorPairSuggestion;
