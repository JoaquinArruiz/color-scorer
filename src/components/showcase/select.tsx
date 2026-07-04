import { usePreviewColors } from "@/hooks/usePreviewColors";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

export const SelectComponent = () => {
  const { text, bg } = usePreviewColors();

  return (
    <Select>
      <SelectTrigger
        className="min-w-[120px]"
        style={{
          border: `1px solid ${text}`,
          backgroundColor: bg,
          color: text,
        }}
      >
        <SelectValue placeholder="Select option" />
      </SelectTrigger>
      <SelectContent
        style={{
          border: `1px solid ${text}`,
          backgroundColor: bg,
          color: text,
        }}
      >
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectComponent;
