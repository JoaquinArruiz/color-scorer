import { useEffect } from "react";
import { buildShareUrl } from "@/lib/shareUrl";
import { useColor1, useColor2 } from "@/store/colorStore";

// mirrors the current colors in the address bar so the page can be shared
export const useColorUrlSync = () => {
  const color1 = useColor1();
  const color2 = useColor2();

  useEffect(() => {
    // the picker fires on every drag step, so wait for it to settle
    const timeout = setTimeout(() => {
      const url = buildShareUrl(window.location.href, color1, color2);
      window.history.replaceState(window.history.state, "", url);
    }, 200);

    return () => clearTimeout(timeout);
  }, [color1, color2]);
};
