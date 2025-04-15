import React from "react";
import { motion } from "motion/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PantoneLogoProps {
  matchedColor: {
    name: string;
    year: number;
  } | null;
}

const PantoneLogo: React.FC<PantoneLogoProps> = ({ matchedColor }) => {
  if (!matchedColor) return null;

  return (
    <motion.div
      className="fixed left-4 top-4 z-50 cursor-pointer rounded-b-md"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Pantone_logo.svg/960px-Pantone_logo.svg.png"
              className="w-32 bg-white/90 p-3 rounded-xl"
            />
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="bg-white text-black border border-gray-200"
        >
          <div className="text-sm whitespace-nowrap">
            <p className="font-bold">{matchedColor.name}</p>
            <p>Pantone Color of the Year {matchedColor.year}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </motion.div>
  );
};

export default PantoneLogo;
