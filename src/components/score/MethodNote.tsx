import { Check, TriangleAlert } from "lucide-react";
import { compareMethods } from "@/lib/apca";
import { useApca, useContrast } from "@/hooks/useColor";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const notes = {
  "wcag-only": {
    title: "APCA rates it lower",
    heading: "Passes WCAG 2, but APCA rates it low",
    body: "WCAG 2 overrates contrast between dark colors, so this pair can be harder to read than its ratio suggests. Consider more contrast for body text.",
  },
  "apca-only": {
    title: "APCA rates it higher",
    heading: "Fails WCAG 2, but APCA rates it readable",
    body: "This often happens with light text on saturated mid tones like orange or blue, where WCAG 2 underrates contrast. WCAG 2 is still the standard to meet today.",
  },
};

/**
 * One line comparing both methods. It always takes the same space so the
 * controls below it never move when the methods start or stop disagreeing
 */
export const MethodNote = ({ className }: { className?: string }) => {
  const { ratio } = useContrast();
  const { lc } = useApca();
  const agreement = compareMethods(ratio, lc);

  if (agreement === "agree") {
    return (
      <p
        className={cn(
          "flex h-8 items-center gap-2 px-1 text-xs text-zinc-400",
          className
        )}
      >
        <Check aria-hidden className="size-4 shrink-0" />
        WCAG 2 and APCA agree on this pair
      </p>
    );
  }

  const note = notes[agreement];

  return (
    <div
      role="note"
      className={cn(
        "flex h-8 items-center gap-2 rounded-md bg-amber-400/10 pr-1 pl-2 text-xs ring-1 ring-amber-400/20 ring-inset",
        className
      )}
    >
      <TriangleAlert aria-hidden className="size-4 shrink-0 text-amber-300" />
      <span className="min-w-0 flex-1 truncate font-medium text-amber-200">
        {note.title}
      </span>
      <Popover>
        <PopoverTrigger className="shrink-0 rounded px-1.5 py-0.5 text-amber-200 underline underline-offset-2 hover:text-amber-100 focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:outline-none">
          Why?
        </PopoverTrigger>
        <PopoverContent className="w-72 space-y-1 text-sm" align="end">
          <p className="font-semibold">{note.heading}</p>
          <p className="text-zinc-300">{note.body}</p>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MethodNote;
