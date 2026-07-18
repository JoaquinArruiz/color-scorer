import { formatRatio, type WcagRating } from "@/lib/contrast";
import { useContrast } from "@/hooks/useColor";
import { cn } from "@/lib/utils";

const ratingStyles: Record<WcagRating, string> = {
  AAA: "bg-emerald-400/15 text-emerald-300 ring-emerald-400/30",
  AA: "bg-emerald-400/15 text-emerald-300 ring-emerald-400/30",
  "AA Large": "bg-amber-400/15 text-amber-300 ring-amber-400/30",
  Fail: "bg-rose-400/15 text-rose-300 ring-rose-400/30",
};

const ratingLabels: Record<WcagRating, string> = {
  AAA: "Passes AAA",
  AA: "Passes AA",
  "AA Large": "Large text only",
  Fail: "Fails",
};

export const RatingBadge = ({
  rating,
  className,
}: {
  rating: WcagRating;
  className?: string;
}) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold whitespace-nowrap ring-1 ring-inset",
      ratingStyles[rating],
      className
    )}
  >
    {ratingLabels[rating]}
  </span>
);

interface ScoreSummaryProps {
  size?: "sm" | "lg";
  className?: string;
}

export const ScoreSummary = ({ size = "lg", className }: ScoreSummaryProps) => {
  const { ratio, rating } = useContrast();

  return (
    <div
      className={cn("flex items-center gap-3", className)}
      aria-live="polite"
    >
      <p className="flex items-baseline gap-0.5 tabular-nums">
        <span
          className={cn(
            "font-bold tracking-tight text-zinc-50",
            size === "lg" ? "text-4xl" : "text-2xl"
          )}
        >
          {formatRatio(ratio)}
        </span>
        <span
          className={cn(
            "text-zinc-400",
            size === "lg" ? "text-lg" : "text-sm"
          )}
        >
          :1
        </span>
        <span className="sr-only">contrast ratio</span>
      </p>
      <RatingBadge rating={rating} />
    </div>
  );
};

export default ScoreSummary;
