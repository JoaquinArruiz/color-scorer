import { useState, useEffect } from "react";

type Orientation = "portrait" | "landscape";

export const useOrientation = (): Orientation => {
  const [orientation, setOrientation] = useState<Orientation>(
    window.innerWidth > window.innerHeight ? "landscape" : "portrait"
  );

  useEffect(() => {
    const handleResize = () => {
      setOrientation(
        window.innerWidth > window.innerHeight ? "landscape" : "portrait"
      );
    };

    window.addEventListener("resize", handleResize);

    // Set initial orientation
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return orientation;
};
