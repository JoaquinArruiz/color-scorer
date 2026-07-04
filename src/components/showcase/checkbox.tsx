import { usePreviewColors } from "@/hooks/usePreviewColors";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export const CheckboxComponent = () => {
  const { text, bg } = usePreviewColors();

  return (
    <div
      className="flex items-center gap-2 rounded-lg p-4"
      style={{
        backgroundColor: bg,
      }}
    >
      <Checkbox
        id="terms"
        style={{
          borderColor: text,
          backgroundColor: "transparent",
        }}
      />
      <Label
        htmlFor="terms"
        style={{
          color: text,
        }}
      >
        Accept terms
      </Label>
    </div>
  );
};
