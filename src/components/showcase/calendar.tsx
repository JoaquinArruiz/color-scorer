import { Calendar } from "@/components/ui/calendar";
import { usePreviewColors } from "@/hooks/usePreviewColors";

export const CalendarComponent = () => {
  const { text, bg } = usePreviewColors();
  const date = new Date();

  return (
    <div
      className="w-full p-3 rounded-lg flex items-center justify-center"
      style={{
        backgroundColor: bg,
        color: text,
        border: `1px solid ${text}`,
      }}
    >
      <Calendar
        mode="single"
        selected={date}
        className="rounded-md"
        styles={{
          caption_label: { color: text },
          day: { color: text },
          nav_button: { color: text },
          head_cell: { color: text },
        }}
      />
    </div>
  );
};
