import { usePreviewColors } from "@/hooks/usePreviewColors";
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
  const { text, bg } = usePreviewColors();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          style={{
            backgroundColor: bg,
            color: text,
          }}
        >
          Open Dialog
        </Button>
      </DialogTrigger>
      <DialogContent
        style={{
          backgroundColor: bg,
          color: text,
        }}
      >
        <DialogHeader>
          <DialogTitle style={{ color: text }}>
            Dialog Title
          </DialogTitle>
          <DialogDescription
            style={{ color: text, opacity: 0.8 }}
          >
            This is a dialog description. You can put any content here.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
