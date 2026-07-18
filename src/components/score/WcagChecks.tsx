import { Check, X } from "lucide-react";
import { WCAG_THRESHOLDS, type WcagCheck } from "@/lib/contrast";
import { useContrast } from "@/hooks/useColor";
import { cn } from "@/lib/utils";

const checks: { key: WcagCheck; level: string; label: string }[] = [
  { key: "aaNormal", level: "AA", label: "Normal" },
  { key: "aaLarge", level: "AA", label: "Large" },
  { key: "aaaNormal", level: "AAA", label: "Normal" },
  { key: "aaaLarge", level: "AAA", label: "Large" },
];

export const WcagChecks = ({ className }: { className?: string }) => {
  const { result } = useContrast();

  return (
    <ul className={cn("grid grid-cols-2 gap-2", className)}>
      {checks.map(({ key, level, label }) => {
        const pass = result[key];
        const Icon = pass ? Check : X;

        return (
          <li
            key={key}
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
            <div className="leading-tight">
              <p className="text-xs font-semibold text-zinc-100">
                {level} <span className="font-normal">{label}</span>
              </p>
              <p
                className={cn(
                  "text-[11px] tabular-nums",
                  pass ? "text-emerald-300" : "text-rose-300"
                )}
              >
                {pass ? "Pass" : "Fail"} · {WCAG_THRESHOLDS[key]}:1
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default WcagChecks;
