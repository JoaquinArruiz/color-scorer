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
          Open dialog
        </Button>
      </DialogTrigger>
      <DialogContent
        style={{
          backgroundColor: bg,
          color: text,
        }}
      >
        <DialogHeader>
          <DialogTitle style={{ color: text }}>Delete project?</DialogTitle>
          <DialogDescription style={{ color: text }}>
            This removes the project and its history. You can't undo this.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
