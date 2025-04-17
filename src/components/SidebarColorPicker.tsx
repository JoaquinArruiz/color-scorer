import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sketch } from "@uiw/react-color";
import {
  useColor1,
  useColor2,
  getHexString,
  setColor1,
  setColor2,
} from "@/store/colorStore";

interface SidebarColorPickerProps {
  colorNumber: 1 | 2;
}

const SidebarColorPicker: React.FC<SidebarColorPickerProps> = ({
  colorNumber,
}) => {
  const [open, setOpen] = useState(false);

  const color1 = useColor1();
  const color2 = useColor2();

  const color = colorNumber === 1 ? color1 : color2;
  const setColor = colorNumber === 1 ? setColor1 : setColor2;

  const handleChange = (color: any) => {
    const { r, g, b } = color.rgb;
    const a = color.rgba.a ?? 1;
    setColor({ r, g, b, a });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <div className="flex items-center gap-2">
          <div
            className="w-10 h-10 rounded border border-white/30"
            style={{ backgroundColor: getHexString(color) }}
          />
          <div className="text-sm font-mono">{getHexString(color)}</div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Sketch
          color={getHexString(color)}
          onChange={handleChange}
          style={{ width: "240px" }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default SidebarColorPicker;
