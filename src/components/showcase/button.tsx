import { Button } from "../ui/button";
import { usePreviewColors } from "@/hooks/usePreviewColors";

interface ButtonComponentProps {
  noBorder?: boolean;
  filled?: boolean;
}

const ButtonComponent = ({
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
      Button
    </Button>
  );
};

export default ButtonComponent;
