import type { ComponentType, ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Code,
  Download,
  ExternalLink,
  Github,
  Globe,
  Linkedin,
} from "lucide-react";
import { SectionHeading } from "@/components/preview/PreviewSurface";
import { AUTHOR, LINKS } from "@/lib/links";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

const ExternalButton = ({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: ComponentType<{ className?: string }>;
  children: ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center gap-2 rounded-md bg-zinc-800 px-3 py-2 text-sm text-zinc-100 transition-colors hover:bg-zinc-700 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none"
  >
    <Icon aria-hidden className="size-4" />
    {children}
    <span className="sr-only">(opens in a new tab)</span>
  </a>
);

const Card = ({ children }: { children: ReactNode }) => (
  <div className="rounded-2xl bg-zinc-900 p-5 ring-1 ring-zinc-800 sm:p-6">
    {children}
  </div>
);

function AboutPage() {
  return (
    <div className="max-w-3xl space-y-8">
      <section aria-labelledby="about-heading">
        <SectionHeading id="about-heading" title="About Color Scorer" />
        <Card>
          <div className="space-y-3 text-sm leading-relaxed text-zinc-300">
            <p>
              Color Scorer checks whether text is readable on its background. It
              scores every pair with the WCAG 2 contrast ratio and with APCA,
              the method being drafted for WCAG 3, suggests the smallest fix
              that keeps your hue, simulates color blindness and checks whole
              palettes at once.
            </p>
            <p>
              It is free, runs entirely in your browser and its source code is
              open.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <ExternalButton href={LINKS.repository} icon={Code}>
              Source code
            </ExternalButton>
            <span className="text-xs text-zinc-500 tabular-nums">
              Version {__APP_VERSION__}
            </span>
          </div>
        </Card>
      </section>

      <section aria-labelledby="author-heading">
        <SectionHeading id="author-heading" title={`Built by ${AUTHOR}`} />
        <Card>
          <p className="text-sm leading-relaxed text-zinc-300">
            I'm a developer who enjoys building tools that are useful and
            pleasant to use. You can find more of my work and get in touch here:
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <ExternalButton href={LINKS.website} icon={Globe}>
              joaquinarruiz.com.ar
            </ExternalButton>
            <ExternalButton href={LINKS.github} icon={Github}>
              GitHub
            </ExternalButton>
            <ExternalButton href={LINKS.linkedin} icon={Linkedin}>
              LinkedIn
            </ExternalButton>
          </div>
        </Card>
      </section>

      <section aria-labelledby="more-heading">
        <SectionHeading id="more-heading" title="Also by me" />
        <Card>
          <div className="flex flex-col gap-5 sm:flex-row">
            <a
              href={LINKS.gutterberg}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 self-start overflow-hidden rounded-lg ring-1 ring-zinc-800 sm:w-56"
            >
              <img
                src={LINKS.gutterbergImage}
                alt="Gutterberg showing a print and play sheet next to its cut-ready version"
                loading="lazy"
                className="aspect-video w-full object-cover"
              />
            </a>
            <div className="min-w-0">
              <h3 className="font-semibold text-zinc-100">Gutterberg</h3>
              <p className="mt-1 text-sm leading-relaxed text-zinc-300">
                A desktop app that turns print-and-play PDFs and card scans into
                cut-ready print sheets, with exact card sizes, clean gutters,
                cut marks and duplex, without touching the original artwork.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <ExternalButton href={LINKS.gutterberg} icon={ExternalLink}>
                  View on GitHub
                </ExternalButton>
                <ExternalButton href={LINKS.gutterbergDownload} icon={Download}>
                  Download
                </ExternalButton>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
