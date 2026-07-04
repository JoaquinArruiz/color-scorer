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
          Color Harmony Explorer
        </CardTitle>
        <CardDescription
          style={{ color: text, opacity: 0.8 }}
        >
          Discover the perfect color
        </CardDescription>
      </CardHeader>
      <CardContent style={{ color: text }}>
        <p>
          Experience the dynamic interplay of colors as you adjust the palette.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          style={{
            backgroundColor: text,
            color: bg,
          }}
        >
          Explore Colors
        </Button>
        <Button
          style={{
            backgroundColor: bg,
            color: text,
            border: `1px solid ${text}`,
          }}
        >
          Explore Colors
        </Button>
      </CardFooter>
    </Card>
  );
};
