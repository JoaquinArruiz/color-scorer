import { lazy, Suspense, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import ButtonComponent from "@/components/showcase/button";
import { AlertComponent } from "@/components/showcase/alert";
import { BadgeComponent } from "@/components/showcase/badge";
import { BreadcrumComponent } from "@/components/showcase/breadcrum";
import { DialogComponent } from "@/components/showcase/dialog";
import { CardComponent } from "@/components/showcase/card";
import { CheckboxComponent } from "@/components/showcase/checkbox";
import { MenubarComponent } from "@/components/showcase/menubar";
import { SelectComponent } from "@/components/showcase/select";
import { CommandComponent } from "@/components/showcase/command";
import { SliderComponent } from "@/components/showcase/slider";
import { ProgressComponent } from "@/components/showcase/progress";
import { InputComponent } from "@/components/showcase/input";
import { InputOTPComponent } from "@/components/showcase/input-otp";
import { PantoneChip } from "@/components/easter-eggs/PantoneChip";
import {
  PreviewSurface,
  SectionHeading,
} from "@/components/preview/PreviewSurface";
import { TextPreview } from "@/components/preview/TextPreview";
import { VisionControls } from "@/components/preview/VisionControls";
import { cn } from "@/lib/utils";

// recharts and the calendar are the heaviest dependencies, load them on demand
const CalendarComponent = lazy(() =>
  import("@/components/showcase/calendar").then((module) => ({
    default: module.CalendarComponent,
  }))
);
const loadCharts = () => import("@/components/showcase/chart");
const ChartComponent1 = lazy(() =>
  loadCharts().then((module) => ({ default: module.ChartComponent1 }))
);
const ChartComponent2 = lazy(() =>
  loadCharts().then((module) => ({ default: module.ChartComponent2 }))
);

const ShowcaseFallback = ({ className = "h-56" }: { className?: string }) => (
  <div
    aria-hidden
    className={cn("w-full rounded-lg bg-current/5 animate-pulse", className)}
  />
);

const ShowcaseGroup = ({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: ReactNode;
}) => (
  <div className={cn("min-w-0 space-y-3", className)}>
    <h3 className="text-xs font-semibold tracking-wide uppercase">{title}</h3>
    {children}
  </div>
);

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="space-y-8">
      <PantoneChip />

      <VisionControls />

      <section aria-labelledby="text-heading">
        <SectionHeading
          id="text-heading"
          title="Text preview"
          description="How your text reads at the sizes WCAG cares about."
        />
        <TextPreview />
      </section>

      <section aria-labelledby="components-heading">
        <SectionHeading
          id="components-heading"
          title="Components"
          description="Common interface elements drawn only with your two colors."
        />
        <PreviewSurface className="grid gap-x-8 gap-y-10 p-4 sm:p-6 md:grid-cols-2 xl:grid-cols-3">
          <ShowcaseGroup title="Actions">
            <div className="flex flex-wrap gap-2">
              <ButtonComponent label="Primary" filled />
              <ButtonComponent label="Outline" />
              <ButtonComponent label="Ghost" noBorder />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <BadgeComponent label="New" border />
              <BadgeComponent label="Beta" />
              <SelectComponent />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <DialogComponent />
              <CheckboxComponent />
            </div>
          </ShowcaseGroup>

          <ShowcaseGroup title="Navigation">
            <BreadcrumComponent />
            <MenubarComponent />
          </ShowcaseGroup>

          <ShowcaseGroup title="Feedback">
            <AlertComponent />
            <ProgressComponent />
          </ShowcaseGroup>

          <ShowcaseGroup title="Forms">
            <InputComponent />
            <InputOTPComponent />
            <SliderComponent />
          </ShowcaseGroup>

          <ShowcaseGroup title="Content">
            <CardComponent />
          </ShowcaseGroup>

          <ShowcaseGroup title="Search">
            <CommandComponent />
          </ShowcaseGroup>

          <ShowcaseGroup title="Calendar">
            <Suspense fallback={<ShowcaseFallback className="h-80" />}>
              <CalendarComponent />
            </Suspense>
          </ShowcaseGroup>

          <ShowcaseGroup title="Data" className="md:col-span-1 xl:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2">
              <Suspense fallback={<ShowcaseFallback />}>
                <ChartComponent1 />
                <ChartComponent2 />
              </Suspense>
            </div>
          </ShowcaseGroup>
        </PreviewSurface>
      </section>
    </div>
  );
}
