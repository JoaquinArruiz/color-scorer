import { WcagChecks } from "@/components/score/WcagChecks";
import { ApcaChecks, ApcaInfo, ApcaScore } from "@/components/score/ApcaChecks";
import { ColorSuggestions } from "@/components/ColorSuggestions";
import { SectionHeading } from "@/components/preview/PreviewSurface";

// what the desktop sidebar shows, laid out above the preview on small screens
export const MobileOverview = () => (
  <div className="mb-8 space-y-8 lg:hidden">
    <section aria-labelledby="mobile-checks-heading">
      <SectionHeading id="mobile-checks-heading" title="WCAG checks" />
      <WcagChecks className="sm:grid-cols-4" />
    </section>
    <section aria-labelledby="mobile-apca-heading">
      <div className="flex items-start justify-between">
        <SectionHeading
          id="mobile-apca-heading"
          title="APCA"
          description="The contrast method being drafted for WCAG 3."
        />
        <ApcaInfo />
      </div>
      <ApcaScore className="mb-3" />
      <ApcaChecks className="sm:grid-cols-4" />
    </section>
    <section aria-labelledby="mobile-suggestions-heading">
      <SectionHeading
        id="mobile-suggestions-heading"
        title="Better combinations"
        description="Tap a pair to use it."
      />
      <ColorSuggestions className="sm:grid-cols-6" />
    </section>
  </div>
);

export default MobileOverview;
