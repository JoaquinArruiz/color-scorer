import { Slider } from "@/components/ui/slider";
import { getHexString, useColorStore } from "@/store/colorStore";

export const SliderComponent = () => {
  const color = useColorStore();

  return (
    <div
      className="w-full p-6 rounded-md"
      style={{
        backgroundColor: getHexString(color.color2),
        color: getHexString(color.color1),
      }}
    >
      <Slider
        defaultValue={[66]}
        max={100}
        step={1}
        className="w-full bg-amber-300 rounded-3xl"
        style={{
          backgroundColor: `${getHexString(color.color1)}20`,
        }}
      />
    </div>
  );
};
