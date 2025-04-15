import { Progress } from "@/components/ui/progress";
import { getHexString, useColorStore } from "@/store/colorStore";
import { useEffect, useState } from "react";

export const ProgressComponent = () => {
  const color = useColorStore();

  const [progress, setProgress] = useState(0);
  const handleProgress = (value: number) => {
    setProgress(value);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0; // Reset to 0 instead of stopping
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="w-full p-4 rounded-lg space-y-2"
      style={{
        backgroundColor: getHexString(color.color2),
        color: getHexString(color.color1),
        border: `1px solid ${getHexString(color.color1)}`,
      }}
    >
      <p>Progress: {progress}%</p>
      <Progress
        value={progress}
        className="w-full"
        style={{
          backgroundColor: `${getHexString(color.color1)}20`,
        }}
      ></Progress>
    </div>
  );
};
