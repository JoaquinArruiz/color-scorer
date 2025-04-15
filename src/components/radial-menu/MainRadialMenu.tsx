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
  const [showColorPicker1, setShowColorPicker1] = useState(false);
  const [showColorPicker2, setShowColorPicker2] = useState(false);

  // Use the store instead of local state
  const colors = useColorStore();

  // Common styles for radial menu items
  const menuItemStyles = {
    iconContainer: "flex w-full h-full justify-center items-center group",
    icon: "group-hover:fill-white text-white",
    colorClasses:
      "bg-black/90 text-white hover:bg-black/80 border-1 border-white",
  };

  const handleColor1Click = () => {
    setShowColorPicker1(true);
  };

  const handleColor2Click = () => {
    setShowColorPicker2(true);
  };

  const radialMenuItems = [
    {
      id: "color1",
      icon: (
        <div className={menuItemStyles.iconContainer}>
          <Palette size={32} className={menuItemStyles.icon} />
          <div
            className="absolute bottom-0 right-0 w-3 h-3 rounded-full"
            style={{
              backgroundColor: getRgbaString(colors.color1),
            }}
          />
        </div>
      ),
      label: "Color 1",
      color: menuItemStyles.colorClasses,
      onClick: handleColor1Click,
      closeOnClick: false,
      layer: 5,
    },
    {
      id: "color2",
      icon: (
        <div className={menuItemStyles.iconContainer}>
          <Palette size={32} className={menuItemStyles.icon} />
          <div
            className="absolute bottom-0 right-0 w-3 h-3 rounded-full"
            style={{
              backgroundColor: getRgbaString(colors.color2),
            }}
          />
        </div>
      ),
      label: "Color 2",
      color: menuItemStyles.colorClasses,
      onClick: handleColor2Click,
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
      layer: 3,
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

      {showColorPicker1 && (
        <ColorPicker
          color={colors.color1}
          onChange={setColor1}
          onClose={() => setShowColorPicker1(false)}
          title="Color 1"
        />
      )}

      {showColorPicker2 && (
        <ColorPicker
          color={colors.color2}
          onChange={setColor2}
          onClose={() => setShowColorPicker2(false)}
          title="Color 2"
        />
      )}
    </>
  );
};
