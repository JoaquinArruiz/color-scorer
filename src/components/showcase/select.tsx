import { getHexString, useColorStore } from "@/store/colorStore";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

export const SelectComponent = () => {
  const color = useColorStore();

  return (
    <Select>
      <SelectTrigger
        className="min-w-[120px]"
        style={{
          border: `1px solid ${getHexString(color.color1)}`,
          backgroundColor: getHexString(color.color2),
          color: getHexString(color.color1),
        }}
      >
        <SelectValue placeholder="Select option" />
      </SelectTrigger>
      <SelectContent
        style={{
          border: `1px solid ${getHexString(color.color1)}`,
          backgroundColor: getHexString(color.color2),
          color: getHexString(color.color1),
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
