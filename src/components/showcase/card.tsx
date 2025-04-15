import { getHexString, useColorStore } from "@/store/colorStore";
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
  const color = useColorStore();

  return (
    <Card
      style={{
        backgroundColor: getHexString(color.color2),
        color: getHexString(color.color1),
      }}
      className="w-full"
    >
      <CardHeader>
        <CardTitle style={{ color: getHexString(color.color1) }}>
          Color Harmony Explorer
        </CardTitle>
        <CardDescription
          style={{ color: getHexString(color.color1), opacity: 0.8 }}
        >
          Discover the perfect color
        </CardDescription>
      </CardHeader>
      <CardContent style={{ color: getHexString(color.color1) }}>
        <p>
          Experience the dynamic interplay of colors as you adjust the palette.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          style={{
            backgroundColor: getHexString(color.color1),
            color: getHexString(color.color2),
          }}
        >
          Explore Colors
        </Button>
        <Button
          style={{
            backgroundColor: getHexString(color.color2),
            color: getHexString(color.color1),
            border: `1px solid ${getHexString(color.color1)}`,
          }}
        >
          Explore Colors
        </Button>
      </CardFooter>
    </Card>
  );
};
