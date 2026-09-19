import { Info } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const levels = [
  {
    title: "Level AAA (Enhanced)",
    color: "text-emerald-300",
    rules: ["Normal text: 7:1 or higher", "Large text: 4.5:1 or higher"],
  },
  {
    title: "Level AA (Standard)",
    color: "text-emerald-300",
    rules: ["Normal text: 4.5:1 or higher", "Large text: 3:1 or higher"],
  },
  {
    title: "Below AA (Insufficient)",
    color: "text-rose-300",
    rules: ["The contrast ratio is below the recommended level"],
  },
];

export const WcagInfo = () => (
  <Popover>
    <PopoverTrigger
      aria-label="About WCAG contrast levels"
      className="rounded-full p-1 text-zinc-400 transition-colors hover:text-zinc-100 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none"
    >
      <Info className="size-4" />
    </PopoverTrigger>
    <PopoverContent className="w-80 space-y-3 text-sm" align="start">
      <h3 className="font-semibold">WCAG contrast requirements</h3>
      {levels.map((level) => (
        <div key={level.title}>
          <h4 className={`font-medium ${level.color}`}>{level.title}</h4>
          <ul className="text-zinc-300">
            {level.rules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>
      ))}
      <p className="border-t border-zinc-800 pt-3 text-xs text-zinc-400">
        Large text is 18.66px (14pt) bold or 24px (18pt) regular and larger. The
        ratio is (L1 + 0.05) / (L2 + 0.05), where L1 and L2 are the relative
        luminance of the lighter and darker color.
      </p>
    </PopoverContent>
  </Popover>
);

export default WcagInfo;
