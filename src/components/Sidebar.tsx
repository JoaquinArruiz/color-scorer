import { ArrowsClockwise } from "@phosphor-icons/react";
import { useColor1, useColor2, swapColors, resetColors } from "@/store/colorStore";
import { useContrast, useColorPairSuggestions } from "@/hooks/useColor";
import { Button } from "@/components/ui/button";
import SidebarColorPicker from "./SidebarColorPicker";
import { ColorPairSuggestion } from "./ColorPairSuggestion";
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
  const { ratio } = useContrast();
  const colorPairSuggestions = useColorPairSuggestions(color1, color2, ratio);

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-72 flex-col overflow-y-auto border-r border-zinc-800 bg-zinc-900">
      <header className="flex items-center gap-2.5 px-5 pt-5 pb-4">
        <img
          src={`${import.meta.env.BASE_URL}logo.svg`}
          alt=""
          className="size-7"
        />
        <h1 className="text-lg font-semibold tracking-tight">Color Scorer</h1>
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
        <SectionTitle id="colors-heading">Colors</SectionTitle>
        <div>
          <h3 className="mb-2 text-sm text-zinc-300">Text</h3>
          <SidebarColorPicker colorNumber={1} />
        </div>
        <div>
          <h3 className="mb-2 text-sm text-zinc-300">Background</h3>
          <SidebarColorPicker colorNumber={2} />
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={swapColors}>
            <ArrowsClockwise size={16} />
            Swap
          </Button>
          <Button variant="ghost" size="sm" onClick={resetColors}>
            Reset
          </Button>
        </div>
      </section>

      {colorPairSuggestions.length > 0 && (
        <section aria-labelledby="suggestions-heading" className="px-5 py-5">
          <SectionTitle id="suggestions-heading">
            Better combinations
          </SectionTitle>
          <div className="mt-2 space-y-1">
            {colorPairSuggestions.map((suggestion, index) => (
              <ColorPairSuggestion
                key={`pair-${index}`}
                suggestion={suggestion}
              />
            ))}
          </div>
        </section>
      )}
    </aside>
  );
};

export default Sidebar;
