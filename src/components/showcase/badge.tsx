import { getHexString, useColorStore } from "@/store/colorStore";
import { Badge } from "../ui/badge";

interface BadgeProps {
  border?: boolean;
}

export const BadgeComponent = ({ border }: BadgeProps) => {
  const color = useColorStore();

  return (
    <Badge
      style={{
        backgroundColor: getHexString(color.color2),
        color: getHexString(color.color1),
        border: border ? `2px solid ${getHexString(color.color1)}` : "none",
      }}
    >
      Badge
    </Badge>
  );
};
