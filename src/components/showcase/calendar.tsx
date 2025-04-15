import { Calendar } from "@/components/ui/calendar";
import { getHexString, useColorStore } from "@/store/colorStore";

export const CalendarComponent = () => {
  const color = useColorStore();
  const date = new Date();

  return (
    <div
      style={{
        backgroundColor: getHexString(color.color2),
        padding: "0.75rem",
        borderRadius: "0.5rem",
        color: getHexString(color.color1),
      }}
    >
      <Calendar
        mode="single"
        selected={date}
        className="rounded-md"
        styles={{
          caption_label: { color: getHexString(color.color1) },
          day: { color: getHexString(color.color1) },
          nav_button: { color: getHexString(color.color1) },
          head_cell: { color: getHexString(color.color1) },
        }}
      />
    </div>
  );
};
