import { usePreviewColors } from "@/hooks/usePreviewColors";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";

export const CardComponent = () => {
  const { text, bg } = usePreviewColors();

  return (
    <Card
      style={{
        backgroundColor: bg,
        color: text,
      }}
      className="w-full"
    >
      <CardHeader>
        <CardTitle style={{ color: text }}>
          Weekly report
        </CardTitle>
        <CardDescription style={{ color: text }}>
          Updated 2 hours ago
        </CardDescription>
      </CardHeader>
      <CardContent style={{ color: text }}>
        <p>
          Visits grew 12% this week, with most traffic coming from search.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          style={{
            backgroundColor: text,
            color: bg,
          }}
        >
          View report
        </Button>
        <Button
          style={{
            backgroundColor: bg,
            color: text,
            border: `1px solid ${text}`,
          }}
        >
          Dismiss
        </Button>
      </CardFooter>
    </Card>
  );
};
