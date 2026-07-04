import { Slider } from "@/components/ui/slider";
import { usePreviewColors } from "@/hooks/usePreviewColors";

export const SliderComponent = () => {
  const { text, bg } = usePreviewColors();

  return (
    <div
      className="w-full p-6 rounded-md"
      style={{
        backgroundColor: bg,
        color: text,
      }}
    >
      <Slider
        defaultValue={[66]}
        max={100}
        step={1}
        className="w-full bg-amber-300 rounded-3xl"
        style={{
          backgroundColor: `${text}20`,
        }}
      />
    </div>
  );
};
