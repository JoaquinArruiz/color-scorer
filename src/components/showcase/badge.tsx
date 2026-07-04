import { usePreviewColors } from "@/hooks/usePreviewColors";
import { Badge } from "../ui/badge";

interface BadgeProps {
  border?: boolean;
}

export const BadgeComponent = ({ border }: BadgeProps) => {
  const { text, bg } = usePreviewColors();

  return (
    <Badge
      style={{
        backgroundColor: bg,
        color: text,
        border: border ? `2px solid ${text}` : "none",
      }}
    >
      Badge
    </Badge>
  );
};
