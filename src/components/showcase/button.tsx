import { Button } from "../ui/button";
import { getHexString, useColorStore } from "@/store/colorStore";

interface ButtonComponentProps {
  noBorder?: boolean;
  filled?: boolean;
}

const ButtonComponent = ({
  noBorder = false,
  filled = false,
}: ButtonComponentProps) => {
  const color = useColorStore();
  return (
    <Button
      style={{
        border: noBorder ? "none" : `1px solid ${getHexString(color.color1)}`,
        backgroundColor: filled
          ? getHexString(color.color1)
          : getHexString(color.color2),
        color: filled ? getHexString(color.color2) : getHexString(color.color1),
      }}
    >
      Button
    </Button>
  );
};

export default ButtonComponent;
