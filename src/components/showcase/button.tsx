import { Button } from "../ui/button";
import { usePreviewColors } from "@/hooks/usePreviewColors";

interface ButtonComponentProps {
  label?: string;
  noBorder?: boolean;
  filled?: boolean;
}

const ButtonComponent = ({
  label = "Button",
  noBorder = false,
  filled = false,
}: ButtonComponentProps) => {
  const { text, bg } = usePreviewColors();
  return (
    <Button
      style={{
        border: noBorder ? "none" : `1px solid ${text}`,
        backgroundColor: filled
          ? text
          : bg,
        color: filled ? bg : text,
      }}
    >
      {label}
    </Button>
  );
};

export default ButtonComponent;
