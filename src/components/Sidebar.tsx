import { ArrowUpDown, RotateCcw } from "lucide-react";
import {
  useColor1,
  useColor2,
  setColor1,
  setColor2,
  swapColors,
  resetColors,
} from "@/store/colorStore";
import { Button } from "@/components/ui/button";
import { ColorField } from "@/components/color/ColorField";
import { ColorSuggestions } from "./ColorSuggestions";
import { ShareButton } from "./ShareButton";
import { ScoreSummary } from "@/components/score/ScoreSummary";
import { WcagChecks } from "@/components/score/WcagChecks";
import { WcagInfo } from "@/components/score/WcagInfo";

const SectionTitle = ({ id, children }: { id: string; children: string }) => (
  <h2
    id={id}
    className="text-xs font-medium tracking-wide text-zinc-400 uppercase"
  >
    {children}
  </h2>
);

const Sidebar = () => {
  const color1 = useColor1();
  const color2 = useColor2();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col overflow-y-auto border-r border-zinc-800 bg-zinc-900 lg:flex">
      <header className="flex items-center gap-2.5 px-5 pt-5 pb-4">
        <img
          src={`${import.meta.env.BASE_URL}logo.svg`}
          alt=""
          className="size-7"
        />
        <h1 className="flex-1 text-lg font-semibold tracking-tight">
          Color Scorer
        </h1>
        <ShareButton className="-mr-2 size-8 text-zinc-400" />
      </header>

      <section
        aria-labelledby="score-heading"
        className="space-y-3 border-b border-zinc-800 px-5 pb-5"
      >
        <div className="flex items-center justify-between">
          <SectionTitle id="score-heading">Contrast ratio</SectionTitle>
          <WcagInfo />
        </div>
        <ScoreSummary />
        <WcagChecks />
      </section>

      <section
        aria-labelledby="colors-heading"
        className="space-y-4 border-b border-zinc-800 px-5 py-5"
      >
        <div className="flex items-center justify-between">
          <SectionTitle id="colors-heading">Colors</SectionTitle>
          <Button
            variant="ghost"
            size="sm"
            className="-mr-2 h-7 text-zinc-400"
            onClick={resetColors}
          >
            <RotateCcw />
            Reset
          </Button>
        </div>
        <div>
          <h3 className="mb-1.5 text-sm text-zinc-300">Text</h3>
          <ColorField label="Text" color={color1} onChange={setColor1} />
        </div>
        <div className="flex justify-center">
          <Button
            variant="secondary"
            size="icon"
            className="-my-2 size-8 rounded-full"
            onClick={swapColors}
            aria-label="Swap text and background colors"
            title="Swap colors"
          >
            <ArrowUpDown />
          </Button>
        </div>
        <div>
          <h3 className="mb-1.5 text-sm text-zinc-300">Background</h3>
          <ColorField label="Background" color={color2} onChange={setColor2} />
        </div>
      </section>

      <section aria-labelledby="suggestions-heading" className="px-5 py-5">
        <SectionTitle id="suggestions-heading">
          Better combinations
        </SectionTitle>
        <ColorSuggestions className="mt-3" />
      </section>
    </aside>
  );
};

export default Sidebar;
