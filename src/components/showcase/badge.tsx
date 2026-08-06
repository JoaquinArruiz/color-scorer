import { usePreviewColors } from "@/hooks/usePreviewColors";
import { Badge } from "../ui/badge";

interface BadgeProps {
  label?: string;
  border?: boolean;
}

export const BadgeComponent = ({ label = "Badge", border }: BadgeProps) => {
  const { text, bg } = usePreviewColors();

  return (
    <Badge
      style={{
        backgroundColor: bg,
        color: text,
        border: border ? `2px solid ${text}` : "none",
      }}
    >
      {label}
    </Badge>
  );
};
