import React from "react";
import { createPortal } from "react-dom";
import { Sketch } from "@uiw/react-color";
import { X } from "@phosphor-icons/react";
import { type Color, getHexString } from "@/store/colorStore";

interface ColorPickerProps {
  color: Color;
  onChange: (color: Color) => void;
  onClose: () => void;
  title?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  onChange,
  onClose,
  title,
}) => {
  const rgbaString = getHexString(color);

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">{title || "Select Color"}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-4 flex justify-center">
          <Sketch
            color={rgbaString}
            onChange={(color) => {
              const { r, g, b } = color.rgb;
              const a = color.rgba.a ?? 1;
              onChange({ r, g, b, a });
            }}
          />
        </div>

        <div className="flex justify-between items-center">
          <div
            className="w-10 h-10 rounded border border-gray-300"
            style={{ backgroundColor: rgbaString }}
          />
          <button
            onClick={onClose}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Done
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ColorPicker;
