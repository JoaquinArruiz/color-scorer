import { Progress } from "@/components/ui/progress";
import { getHexString, useColorStore } from "@/store/colorStore";
import { useEffect, useState } from "react";

export const ProgressComponent = () => {
  const color = useColorStore();
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isHolding) return;

      setProgress((prev) => {
        if (prev >= 100) {
          setIsHolding(true);

          setTimeout(() => {
            setProgress(0);
            setIsHolding(false);
          }, 3000);

          return 100;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isHolding]);

  return (
    <div
      className="w-full p-4 rounded-lg space-y-2"
      style={{
        backgroundColor: getHexString(color.color2),
        color: getHexString(color.color1),
        border: `1px solid ${getHexString(color.color1)}`,
      }}
    >
      {progress >= 100 ? <p>Completed!</p> : <p>Progress: {progress}%</p>}
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
