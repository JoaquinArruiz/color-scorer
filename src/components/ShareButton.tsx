import { useEffect, useState } from "react";
import { Check, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildShareUrl } from "@/lib/shareUrl";
import { useColor1, useColor2 } from "@/store/colorStore";

export const ShareButton = ({ className }: { className?: string }) => {
  const color1 = useColor1();
  const color2 = useColor2();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timeout);
  }, [copied]);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(
        buildShareUrl(window.location.href, color1, color2)
      );
      setCopied(true);
    } catch {
      // clipboard can be unavailable (insecure context or denied permission)
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className={className}
      aria-label={copied ? "Link copied" : "Copy link to these colors"}
      title={copied ? "Link copied" : "Copy link"}
    >
      {copied ? <Check className="text-emerald-300" /> : <Link />}
    </Button>
  );
};

export default ShareButton;
