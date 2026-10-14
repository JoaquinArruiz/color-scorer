import { Check, Info, X } from "lucide-react";
import { APCA_LEVELS, formatLc } from "@/lib/apca";
import { useApca } from "@/hooks/useColor";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export const ApcaInfo = () => (
  <Popover>
    <PopoverTrigger
      aria-label="About APCA"
      className="rounded-full p-1 text-zinc-400 transition-colors hover:text-zinc-100 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none"
    >
      <Info className="size-4" />
    </PopoverTrigger>
    <PopoverContent className="w-80 space-y-2 text-sm" align="start">
      <h3 className="font-semibold">APCA lightness contrast</h3>
      <p className="text-zinc-300">
        APCA is the contrast method being developed for WCAG 3. It models how
        people perceive lightness, so it treats dark text on light and light
        text on dark differently, and it gives a lightness contrast (Lc) from 0
        to about 106 instead of a ratio.
      </p>
      <ul className="space-y-1 text-zinc-300">
        {APCA_LEVELS.map((level) => (
          <li key={level.key}>
            <span className="font-medium text-zinc-100">Lc {level.lc}</span>{" "}
            {level.label.toLowerCase()} ({level.detail})
          </li>
        ))}
      </ul>
      <p className="border-t border-zinc-800 pt-2 text-xs text-zinc-400">
        APCA is still a draft and is not a legal requirement yet. WCAG 2 is the
        standard to meet today; APCA helps you spot pairs that pass it but are
        still hard to read.
      </p>
    </PopoverContent>
  </Popover>
);

export const ApcaScore = ({ className }: { className?: string }) => {
  const { lc } = useApca();
  const polarity = lc > 0 ? "Dark on light" : lc < 0 ? "Light on dark" : null;

  return (
    <p
      className={cn("flex items-baseline gap-2 tabular-nums", className)}
      aria-live="polite"
    >
      <span className="text-2xl font-bold tracking-tight text-zinc-50">
        Lc {formatLc(lc)}
      </span>
      {polarity && <span className="text-xs text-zinc-400">{polarity}</span>}
    </p>
  );
};

export const ApcaChecks = ({ className }: { className?: string }) => {
  const { result } = useApca();

  return (
    <ul className={cn("grid grid-cols-2 gap-2", className)}>
      {APCA_LEVELS.map((level) => {
        const pass = result[level.key];
        const Icon = pass ? Check : X;

        return (
          <li
            key={level.key}
            title={level.detail}
            className={cn(
              "flex items-center gap-2 rounded-lg px-2.5 py-2 ring-1 ring-inset",
              pass
                ? "bg-emerald-400/10 ring-emerald-400/20"
                : "bg-rose-400/10 ring-rose-400/20"
            )}
          >
            <Icon
              aria-hidden
              className={cn(
                "size-4 shrink-0",
                pass ? "text-emerald-300" : "text-rose-300"
              )}
            />
            <div className="min-w-0 leading-tight">
              <p className="truncate text-xs font-semibold text-zinc-100">
                {level.label}
              </p>
              <p
                className={cn(
                  "text-[11px] tabular-nums",
                  pass ? "text-emerald-300" : "text-rose-300"
                )}
              >
                {pass ? "Pass" : "Fail"} · Lc {level.lc}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ApcaChecks;
