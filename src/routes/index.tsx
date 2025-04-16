import ButtonComponent from "@/components/showcase/button";
import { createFileRoute } from "@tanstack/react-router";
import { AlertComponent } from "@/components/showcase/alert";
import { BadgeComponent } from "@/components/showcase/badge";
import { BreadcrumComponent } from "@/components/showcase/breadcrum";
import { CalendarComponent } from "@/components/showcase/calendar";
import { DialogComponent } from "@/components/showcase/dialog";
import { CardComponent } from "@/components/showcase/card";
import { CheckboxComponent } from "@/components/showcase/checkbox";
import { MenubarComponent } from "@/components/showcase/menubar";
import { SelectComponent } from "@/components/showcase/select";
import {
  ChartComponent1,
  ChartComponent2,
  ChartComponent3,
  ChartComponent4,
} from "@/components/showcase/chart";
import { CommandComponent } from "@/components/showcase/command";
import { SliderComponent } from "@/components/showcase/slider";
import { ProgressComponent } from "@/components/showcase/progress";
import { InputComponent } from "@/components/showcase/input";
import { InputOTPComponent } from "@/components/showcase/input-otp";
import PantoneLogo from "@/components/easter-eggs/PantoneLogo";
import { usePantoneMatch } from "@/hooks/usePantoneMatch";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const matchedColor = usePantoneMatch();

  return (
    <div className="text-center pt-2 px-4 space-y-5 max-w-[1024px] mx-auto">
      <PantoneLogo matchedColor={matchedColor} />

      <div className="flex flex-col xl:flex-row gap-2 w-full xl:justify-between items-center">
        <BreadcrumComponent />
        <div className="flex gap-2">
          <BadgeComponent />
          <BadgeComponent border />
          <SelectComponent />
        </div>
        <div className="flex gap-2">
          <ButtonComponent />
          <ButtonComponent noBorder />
          <ButtonComponent filled />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 w-full">
        <div className="flex flex-col gap-4 items-center">
          <AlertComponent />
          <div className="flex flex-col 3xl:flex-row gap-4 xl:items-center">
            <CalendarComponent />
            <CardComponent />
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <div className="flex gap-4 items-center">
            <DialogComponent />
            <CheckboxComponent />
          </div>
          <SliderComponent />
          <ProgressComponent />
          <InputComponent />
          <InputOTPComponent />
          <CommandComponent />
        </div>

        <div className="flex flex-col gap-4 items-center">
          <MenubarComponent />
          <ChartComponent4 />
          <ChartComponent2 />
          <ChartComponent3 />
          <ChartComponent1 />
        </div>
      </div>
    </div>
  );
}
