import { getRgbaString, type Color } from "@/lib/color";
import { cn } from "@/lib/utils";

// checkerboard underneath so transparency is visible
export const ColorSwatch = ({
  color,
  className,
}: {
  color: Color;
  className?: string;
}) => (
  <span
    aria-hidden
    className={cn(
      "checkerboard block size-10 overflow-hidden rounded-md ring-1 ring-white/15 ring-inset",
      className
    )}
  >
    <span
      className="block size-full"
      style={{ backgroundColor: getRgbaString(color) }}
    />
  </span>
);

export default ColorSwatch;
