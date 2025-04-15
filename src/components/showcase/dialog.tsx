import { getHexString, useColorStore } from "@/store/colorStore";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export const DialogComponent = () => {
  const color = useColorStore();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          style={{
            backgroundColor: getHexString(color.color2),
            color: getHexString(color.color1),
          }}
        >
          Open Dialog
        </Button>
      </DialogTrigger>
      <DialogContent
        style={{
          backgroundColor: getHexString(color.color2),
          color: getHexString(color.color1),
        }}
      >
        <DialogHeader>
          <DialogTitle style={{ color: getHexString(color.color1) }}>
            Dialog Title
          </DialogTitle>
          <DialogDescription
            style={{ color: getHexString(color.color1), opacity: 0.8 }}
          >
            This is a dialog description. You can put any content here.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
