import { Input } from "@/components/ui/input";
import { usePreviewColors } from "@/hooks/usePreviewColors";

export const InputComponent = () => {
  const { text, bg } = usePreviewColors();

  return (
    <div
      className="w-full p-6 rounded-lg"
      style={{
        backgroundColor: bg,
        color: text,
        border: `1px solid ${text}`,
      }}
    >
      <Input
        placeholder="Type something..."
        style={{
          color: text,
          borderColor: text,
        }}
      />
    </div>
  );
};
