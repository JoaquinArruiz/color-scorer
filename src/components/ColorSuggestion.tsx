import React from "react";
import { Button } from "@/components/ui/button";
import { getHexString, type Color } from "@/store/colorStore";

interface ColorSuggestionProps {
  color: Color;
  score: number;
  onApply: () => void;
}

const ColorSuggestion: React.FC<ColorSuggestionProps> = ({
  color,
  score,
  onApply,
}) => {
  return (
    <div className="flex items-center justify-between gap-2 py-1">
      <div className="flex items-center gap-2">
        <div
          className="w-6 h-6 rounded-full border border-white/30"
          style={{ backgroundColor: getHexString(color) }}
        />
        <span className="text-xs text-white/70 font-mono">
          {score.toFixed(2)}
        </span>
      </div>
      <Button
        size="sm"
        variant="ghost"
        className="h-6 text-xs bg-white/10 hover:bg-white/20 px-2"
        onClick={onApply}
      >
        Apply
      </Button>
    </div>
  );
};

export default ColorSuggestion;
