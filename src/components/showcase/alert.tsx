import { getHexString, useColorStore } from "@/store/colorStore";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import { Warning } from "@phosphor-icons/react";

export const AlertComponent = () => {
  const color = useColorStore();

  return (
    <Alert
      className="text-left"
      style={{
        border: `1px solid ${getHexString(color.color1)}`,
        backgroundColor: getHexString(color.color2),
        color: getHexString(color.color1),
      }}
    >
      <Warning size={16} fill={getHexString(color.color1)} />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription
        style={{
          backgroundColor: getHexString(color.color2),
          color: getHexString(color.color1),
        }}
      >
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  );
};

export default AlertComponent;
