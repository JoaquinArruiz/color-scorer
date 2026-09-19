import type { CSSProperties, ReactNode } from "react";
import { usePreviewColors } from "@/hooks/usePreviewColors";
import { cn } from "@/lib/utils";

interface PreviewSurfaceProps {
  className?: string;
  children: ReactNode;
}

// an area painted with the background color where the theme tokens map to the tested pair
export const PreviewSurface = ({
  className,
  children,
}: PreviewSurfaceProps) => {
  const { text, bg } = usePreviewColors();

  return (
    <div
      className={cn(
        "preview-surface rounded-2xl ring-1 ring-white/10 motion-safe:transition-colors motion-safe:duration-300",
        className
      )}
      style={{ "--preview-bg": bg, "--preview-text": text } as CSSProperties}
    >
      {children}
    </div>
  );
};

export const SectionHeading = ({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description?: string;
}) => (
  <div className="mb-3">
    <h2 id={id} className="text-base font-semibold text-zinc-100">
      {title}
    </h2>
    {description && <p className="text-sm text-zinc-400">{description}</p>}
  </div>
);

export default PreviewSurface;
