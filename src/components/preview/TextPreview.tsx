import { Check, X } from "lucide-react";
import type { WcagCheck } from "@/lib/contrast";
import { useContrast } from "@/hooks/useColor";
import { cn } from "@/lib/utils";
import { PreviewSurface } from "./PreviewSurface";

const LevelChip = ({ level, pass }: { level: string; pass: boolean }) => {
  const Icon = pass ? Check : X;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ring-inset",
        pass
          ? "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20"
          : "bg-rose-400/10 text-rose-300 ring-rose-400/20"
      )}
    >
      <Icon aria-hidden className="size-3" />
      {level}
      <span className="sr-only">{pass ? "passes" : "fails"}</span>
    </span>
  );
};

const samples: {
  title: string;
  size: string;
  checks: [WcagCheck, WcagCheck];
  content: React.ReactNode;
}[] = [
  {
    title: "Large text",
    size: "24px, or 18.66px bold",
    checks: ["aaLarge", "aaaLarge"],
    content: (
      <>
        <p className="text-[24px] leading-tight">
          Good contrast is good design.
        </p>
        <p className="mt-1 text-[18.66px] leading-tight font-bold">
          Headings and buttons count as large text.
        </p>
      </>
    ),
  },
  {
    title: "Normal text",
    size: "16px",
    checks: ["aaNormal", "aaaNormal"],
    content: (
      <p className="text-[16px] leading-relaxed">
        Text that blends into its background is hard to read for people with low
        vision or color blindness, and for anyone using a screen in bright
        sunlight. Body copy should always meet the normal text ratio.
      </p>
    ),
  },
  {
    title: "Small text",
    size: "14px",
    checks: ["aaNormal", "aaaNormal"],
    content: (
      <p className="text-[14px] leading-relaxed">
        Captions, labels and helper text are usually the first to fail. WCAG has
        no separate rule for them, so they need the normal text ratio too.
      </p>
    ),
  },
];

export const TextPreview = () => {
  const { result } = useContrast();

  return (
    <div className="divide-y divide-zinc-800 overflow-hidden rounded-2xl ring-1 ring-zinc-800">
      {samples.map((sample) => (
        <div
          key={sample.title}
          className="grid sm:grid-cols-[11rem_1fr] md:grid-cols-[13rem_1fr]"
        >
          <div className="flex flex-row items-center justify-between gap-2 bg-zinc-900 px-4 py-3 sm:flex-col sm:items-start sm:justify-center">
            <div>
              <h3 className="text-sm font-medium text-zinc-100">
                {sample.title}
              </h3>
              <p className="text-xs text-zinc-400">{sample.size}</p>
            </div>
            <div className="flex gap-1.5">
              <LevelChip level="AA" pass={result[sample.checks[0]]} />
              <LevelChip level="AAA" pass={result[sample.checks[1]]} />
            </div>
          </div>
          <PreviewSurface className="rounded-none px-5 py-5 ring-0 sm:px-6">
            {sample.content}
          </PreviewSurface>
        </div>
      ))}
    </div>
  );
};

export default TextPreview;
