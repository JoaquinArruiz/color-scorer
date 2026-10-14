import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/", label: "Pair checker" },
  { to: "/palette", label: "Palette matrix" },
] as const;

export const PageTabs = ({ className }: { className?: string }) => {
  const pathname = useLocation({ select: (location) => location.pathname });

  return (
    <nav aria-label="Pages" className={cn("flex gap-1", className)}>
      {tabs.map((tab) => {
        const active = pathname === tab.to;

        return (
          <Link
            key={tab.to}
            to={tab.to}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none",
              active
                ? "bg-zinc-800 font-medium text-zinc-50"
                : "text-zinc-400 hover:text-zinc-100"
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default PageTabs;
