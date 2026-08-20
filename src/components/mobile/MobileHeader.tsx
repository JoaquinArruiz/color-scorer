import { ScoreSummary } from "@/components/score/ScoreSummary";
import { WcagInfo } from "@/components/score/WcagInfo";

export const MobileHeader = () => (
  <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-zinc-800 bg-zinc-950/90 px-4 py-3 backdrop-blur lg:hidden">
    <div className="flex items-center gap-2">
      <img
        src={`${import.meta.env.BASE_URL}logo.svg`}
        alt=""
        className="size-6"
      />
      <h1 className="hidden font-semibold tracking-tight xs:block">
        Color Scorer
      </h1>
    </div>
    <div className="flex items-center gap-1">
      <ScoreSummary size="sm" className="gap-2" />
      <WcagInfo />
    </div>
  </header>
);

export default MobileHeader;
