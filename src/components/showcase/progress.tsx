import { Progress } from "@/components/ui/progress";
import { usePreviewColors } from "@/hooks/usePreviewColors";
import { useEffect, useState } from "react";

export const ProgressComponent = () => {
  const { text, bg } = usePreviewColors();
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
        backgroundColor: bg,
        color: text,
        border: `1px solid ${text}`,
      }}
    >
      {progress >= 100 ? <p>Upload complete</p> : <p>Uploading… {progress}%</p>}
      <Progress
        value={progress}
        className="w-full"
        style={{
          backgroundColor: `${text}20`,
        }}
      ></Progress>
    </div>
  );
};
