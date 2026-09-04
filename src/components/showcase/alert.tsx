import { usePreviewColors } from "@/hooks/usePreviewColors";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import { TriangleAlert } from "lucide-react";

export const AlertComponent = () => {
  const { text, bg } = usePreviewColors();

  return (
    <Alert
      className="text-left"
      style={{
        border: `1px solid ${text}`,
        backgroundColor: bg,
        color: text,
      }}
    >
      <TriangleAlert className="size-4" style={{ color: text }} />
      <AlertTitle>Your trial ends in 3 days</AlertTitle>
      <AlertDescription
        style={{
          backgroundColor: bg,
          color: text,
        }}
      >
        Upgrade your plan to keep access to your projects.
      </AlertDescription>
    </Alert>
  );
};

export default AlertComponent;
