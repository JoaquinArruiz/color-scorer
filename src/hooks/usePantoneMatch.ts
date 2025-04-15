import { useEffect, useState } from "react";
import { useColor1, useColor2, getHexString } from "@/store/colorStore";
import { pantoneColors } from "@/data/pantoneColors";

// Function to check if two hex colors are similar (allowing for some tolerance)
const areColorsSimilar = (
  color1: string,
  color2: string,
  tolerance = 5
): boolean => {
  // Convert hex to RGB
  const hex1 = color1.replace("#", "");
  const hex2 = color2.replace("#", "");

  const r1 = parseInt(hex1.substring(0, 2), 16);
  const g1 = parseInt(hex1.substring(2, 4), 16);
  const b1 = parseInt(hex1.substring(4, 6), 16);

  const r2 = parseInt(hex2.substring(0, 2), 16);
  const g2 = parseInt(hex2.substring(2, 4), 16);
  const b2 = parseInt(hex2.substring(4, 6), 16);

  // Calculate difference
  const rDiff = Math.abs(r1 - r2);
  const gDiff = Math.abs(g1 - g2);
  const bDiff = Math.abs(b1 - b2);

  return rDiff <= tolerance && gDiff <= tolerance && bDiff <= tolerance;
};

export const usePantoneMatch = () => {
  const color1 = useColor1();
  const color2 = useColor2();
  const [matchedColor, setMatchedColor] = useState<{
    name: string;
    year: number;
  } | null>(null);

  useEffect(() => {
    const color1Hex = getHexString(color1);
    const color2Hex = getHexString(color2);

    // Check if either color matches a Pantone color
    for (const pantoneColor of pantoneColors) {
      if (
        areColorsSimilar(color1Hex, pantoneColor.hex) ||
        areColorsSimilar(color2Hex, pantoneColor.hex)
      ) {
        setMatchedColor({
          name: pantoneColor.name,
          year: pantoneColor.year,
        });
        return;
      }
    }

    // No match found
    setMatchedColor(null);
  }, [color1, color2]);

  return matchedColor;
};
