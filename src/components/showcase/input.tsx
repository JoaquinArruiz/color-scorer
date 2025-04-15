import { Input } from "@/components/ui/input";
import { getHexString, useColorStore } from "@/store/colorStore";

export const InputComponent = () => {
  const color = useColorStore();

  return (
    <div
      className="w-full p-6 rounded-lg"
      style={{
        backgroundColor: getHexString(color.color2),
        color: getHexString(color.color1),
        border: `1px solid ${getHexString(color.color1)}`,
      }}
    >
      <Input
        placeholder="Type something..."
        style={{
          color: getHexString(color.color1),
          borderColor: getHexString(color.color1),
        }}
      />
    </div>
  );
};
