import { TriangleAlert } from "lucide-react";
import { compareMethods } from "@/lib/apca";
import { useApca, useContrast } from "@/hooks/useColor";
import { cn } from "@/lib/utils";

const notes = {
  "wcag-only": {
    title: "Passes WCAG 2, but APCA rates it low",
    body: "WCAG 2 overrates contrast between dark colors, so this pair can be harder to read than its ratio suggests. Consider more contrast for body text.",
  },
  "apca-only": {
    title: "Fails WCAG 2, but APCA rates it readable",
    body: "This often happens with light text on saturated mid tones like orange or blue, where WCAG 2 underrates contrast. WCAG 2 is still the standard to meet today.",
  },
};

// explains why the two methods disagree, only shown when they do
export const MethodNote = ({ className }: { className?: string }) => {
  const { ratio } = useContrast();
  const { lc } = useApca();
  const agreement = compareMethods(ratio, lc);

  if (agreement === "agree") return null;
  const note = notes[agreement];

  return (
    <div
      role="note"
      className={cn(
        "flex gap-2 rounded-lg bg-amber-400/10 p-3 text-xs ring-1 ring-amber-400/20 ring-inset",
        className
      )}
    >
      <TriangleAlert
        aria-hidden
        className="mt-0.5 size-4 shrink-0 text-amber-300"
      />
      <div className="space-y-1">
        <p className="font-semibold text-amber-200">{note.title}</p>
        <p className="text-zinc-300">{note.body}</p>
      </div>
    </div>
  );
};

export default MethodNote;
