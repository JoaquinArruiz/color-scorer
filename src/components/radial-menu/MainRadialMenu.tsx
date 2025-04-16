import { Palette, ArrowsClockwise } from "@phosphor-icons/react";
import RadialMenu from "@/components/radial-menu/radial-menu";
import { useState } from "react";
import ColorPicker from "./ColorPicker";
import {
  setColor1,
  setColor2,
  getRgbaString,
  useColorStore,
  swapColors,
} from "@/store/colorStore";

export const MainRadialMenu = () => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const colors = useColorStore();

  const menuItemStyles = {
    iconContainer: "flex w-full h-full justify-center items-center group",
    icon: "group-hover:fill-white text-white",
    colorClasses:
      "bg-black/90 text-white hover:bg-black/80 border-1 border-white",
  };

  const handleColorPickerClick = () => {
    setShowColorPicker(true);
  };

  const radialMenuItems = [
    {
      id: "color-picker",
      icon: (
        <div className={menuItemStyles.iconContainer}>
          <Palette size={32} className={menuItemStyles.icon} />
          <div
            className="absolute bottom-0 left-0 w-4 h-4 rounded-full ring-1 ring-black"
            style={{
              backgroundColor: getRgbaString(colors.color1),
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-4 h-4 rounded-full ring-1 ring-black"
            style={{
              backgroundColor: getRgbaString(colors.color2),
            }}
          />
        </div>
      ),
      label: "Colors",
      color: menuItemStyles.colorClasses,
      onClick: handleColorPickerClick,
      closeOnClick: false,
      layer: 5,
    },
    {
      id: "swap",
      icon: (
        <div className={menuItemStyles.iconContainer}>
          <ArrowsClockwise size={32} className={menuItemStyles.icon} />
        </div>
      ),
      label: "Swap Colors",
      color: menuItemStyles.colorClasses,
      onClick: swapColors,
      closeOnClick: false,
      layer: 5,
    },
  ];

  return (
    <>
      <RadialMenu
        items={radialMenuItems}
        size={70}
        innerRadius={50}
        openingAngle={70}
        distanceMultiplier={3.3}
        startAngleOffset={320}
        layerOffset={0.6}
        layerSpacing={{
          5: 1,
          3: 1,
        }}
      />

      {showColorPicker && (
        <ColorPicker
          colors={colors}
          onChangeColor1={setColor1}
          onChangeColor2={setColor2}
          onClose={() => setShowColorPicker(false)}
        />
      )}
    </>
  );
};
