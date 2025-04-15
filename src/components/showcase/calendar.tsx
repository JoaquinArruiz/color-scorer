import { Calendar } from "@/components/ui/calendar";
import { getHexString, useColorStore } from "@/store/colorStore";

export const CalendarComponent = () => {
  const color = useColorStore();
  const date = new Date();

  return (
    <div
      className="w-full p-3 rounded-lg flex items-center justify-center"
      style={{
        backgroundColor: getHexString(color.color2),
        color: getHexString(color.color1),
        border: `1px solid ${getHexString(color.color1)}`,
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
