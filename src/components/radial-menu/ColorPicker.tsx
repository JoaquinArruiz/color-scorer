import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Sketch } from "@uiw/react-color";
import { X, CaretRight, ArrowsClockwise } from "@phosphor-icons/react";
import { type Color, getHexString, swapColors } from "@/store/colorStore";

interface ColorPickerProps {
  colors: {
    color1: Color;
    color2: Color;
  };
  onChangeColor1: (color: Color) => void;
  onChangeColor2: (color: Color) => void;
  onClose: () => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  colors,
  onChangeColor1,
  onChangeColor2,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<"color1" | "color2">("color1");

  const activeColor = activeTab === "color1" ? colors.color1 : colors.color2;
  const rgbaString = getHexString(activeColor);

  const handleChange = (color: any) => {
    const { r, g, b } = color.rgb;
    const a = color.rgba.a ?? 1;
    if (activeTab === "color1") {
      onChangeColor1({ r, g, b, a });
    } else {
      onChangeColor2({ r, g, b, a });
    }
  };

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20">
      <div className="bg-white rounded-lg shadow-xl p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Color Picker</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex justify-center">
          <div className="flex mb-4 border-b">
            <button
              onClick={() => setActiveTab("color1")}
              className={`px-4 py-2 flex items-center ${
                activeTab === "color1" ? "border-b-2 border-blue-500" : ""
              }`}
            >
              <div
                className="w-5 h-5 rounded-full mr-2 border border-gray-300"
                style={{ backgroundColor: getHexString(colors.color1) }}
              />
              Color 1
            </button>
            <button
              onClick={() => setActiveTab("color2")}
              className={`px-4 py-2 flex items-center ${
                activeTab === "color2" ? "border-b-2 border-blue-500" : ""
              }`}
            >
              <div
                className="w-5 h-5 rounded-full mr-2 border border-gray-300"
                style={{ backgroundColor: getHexString(colors.color2) }}
              />
              Color 2
            </button>
          </div>
        </div>

        <div className="mb-4 flex justify-center">
          <Sketch color={rgbaString} onChange={handleChange} />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div
              className="w-8 h-8 rounded-full border border-gray-300"
              style={{ backgroundColor: getHexString(colors.color1) }}
            />
            <CaretRight size={16} />
            <div
              className="w-8 h-8 rounded-full border border-gray-300"
              style={{ backgroundColor: getHexString(colors.color2) }}
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => {
                swapColors();
              }}
              className="p-2 bg-gray-200 hover:bg-gray-300 rounded"
            >
              <ArrowsClockwise size={24} className="text-gray-500" />
            </button>
          </div>
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
