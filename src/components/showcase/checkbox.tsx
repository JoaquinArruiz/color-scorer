import { getHexString, useColorStore } from "@/store/colorStore";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export const CheckboxComponent = () => {
  const color = useColorStore();

  return (
    <div
      className="flex items-center gap-2 rounded-lg p-4"
      style={{
        backgroundColor: getHexString(color.color2),
      }}
    >
      <Checkbox
        id="terms"
        style={{
          borderColor: getHexString(color.color1),
          backgroundColor: "transparent",
        }}
      />
      <Label
        htmlFor="terms"
        style={{
          color: getHexString(color.color1),
        }}
      >
        Accept terms
      </Label>
    </div>
  );
};
