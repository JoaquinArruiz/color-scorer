import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import RadialMenuItem from "./radial-menu-item";
import { List, X } from "@phosphor-icons/react";
import { Brush } from "lucide-react";

export interface RadialMenuItemProps {
  id: string;
  icon: React.ReactElement;
  label: string;
  color?: string;
  layer?: number;
  closeOnClick?: boolean;
  onClick?: () => void;
}

interface RadialMenuProps {
  items: RadialMenuItemProps[];
  size?: number;
  innerRadius?: number;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  children?: React.ReactNode;
  className?: string;
  openingAngle?: number;
  distanceMultiplier?: number;
  startAngleOffset?: number;
  closeOnClick?: boolean;
  layerOffset?: number;
  layerSpacing?: Record<number, number>;
}

/**
 * RadialMenu component renders a circular menu with items distributed radially.
 * It supports multiple layers, customizable angles, and dynamic spacing.
 *
 * @component
 * @param {RadialMenuProps} props - The props for the RadialMenu component.
 * @param {RadialMenuItemProps[]} props.items - Array of menu items to display in the radial menu.
 * @param {number} [props.size=300] - The size (diameter) of the radial menu in pixels.
 * @param {number} [props.innerRadius=60] - The radius of the central button in pixels.
 * @param {boolean} [props.isOpen] - External control for the open/close state of the menu.
 * @param {(isOpen: boolean) => void} [props.onToggle] - Callback triggered when the menu is toggled.
 * @param {React.ReactNode} [props.children] - Content to display inside the central button.
 * @param {string} [props.className=""] - Additional CSS classes for the menu container.
 * @param {number} [props.openingAngle=360] - The angle (in degrees) over which the items are distributed.
 * @param {number} [props.distanceMultiplier=1.0] - Multiplier to adjust the distance of items from the center.
 * @param {number} [props.startAngleOffset=0] - Offset angle (in degrees) to rotate the starting position of items.
 * @param {number} [props.layerOffset=0.5] - Distance offset between layers, as a multiplier.
 * @param {boolean} [props.closeOnClick=true] - Whether the menu should close when an item is clicked.
 * @param {Record<number, number>} [props.layerSpacing={}] - Layer-specific spacing multipliers for item distribution.
 *
 * @returns {JSX.Element} The rendered RadialMenu component.
 *
 * @example
 * ```tsx
 * const items = [
 *   { id: "1", label: "Item 1", onClick: () => console.log("Item 1 clicked"), layer: 1 },
 *   { id: "2", label: "Item 2", onClick: () => console.log("Item 2 clicked"), layer: 1 },
 *   { id: "2", label: "Item 2", onClick: () => console.log("Item 2 clicked"), layer: 3 },
 * ];
 *
 * <RadialMenu
 *   items={items}
 *   size={400}
 *   innerRadius={80}
 *   openingAngle={180}
 *   onToggle={(isOpen) => console.log("Menu is now", isOpen ? "open" : "closed")}
 * />
 * ```
 */
const RadialMenu: React.FC<RadialMenuProps> = ({
  items,
  size = 300,
  innerRadius = 60,
  isOpen: externalIsOpen,
  onToggle,
  children,
  className = "",
  openingAngle = 360,
  distanceMultiplier = 1.0,
  startAngleOffset = 0,
  layerOffset = 0.5,
  closeOnClick = true,
  layerSpacing = {}, // Default empty object for layer-specific spacing
}) => {
  const [isOpen, setIsOpen] = useState(externalIsOpen || false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (externalIsOpen !== undefined) {
      setIsOpen(externalIsOpen);
    }
  }, [externalIsOpen]);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle?.(newState);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
        onToggle?.(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onToggle]);

  const itemsByLayer = items.reduce((acc, item) => {
    const layer = item.layer || 1;
    if (!acc[layer]) acc[layer] = [];
    acc[layer].push(item);
    return acc;
  }, {} as Record<number, RadialMenuItemProps[]>);

  return (
    <div
      ref={menuRef}
      className={`relative ${className} `}
      style={{ width: size, height: size }}
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleToggle}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  
           bg-black border-1 border-white hover:bg-black/70 rounded-full flex items-center justify-center
           text-white shadow-lg transition-colors"
        style={{ width: innerRadius, height: innerRadius, zIndex: 999999 }}
      >
        {children || (
          <motion.div
            key={isOpen ? "close" : "open"}
            initial={{ rotate: isOpen ? -90 : 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: isOpen ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <X size={16} weight="bold" /> : <Brush size={24} />}
          </motion.div>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen &&
          items.map((item, index) => {
            // handle both positive and negative angles correctly
            const angleRange = Math.abs(openingAngle);
            const angleDirection = openingAngle >= 0 ? 1 : -1;
            const offsetRadians = (startAngleOffset - 90) * (Math.PI / 180);

            // get the layer for this item
            const currentLayer = item.layer || 1;
            const itemsInCurrentLayer = itemsByLayer[currentLayer]?.length || 1;
            const currentItemIndexInLayer =
              itemsByLayer[currentLayer]?.findIndex((i) => i.id === item.id) ||
              0;

            // apply layer-specific spacing multiplier or default to 1
            const spacingMultiplier = layerSpacing[currentLayer] || 1;

            let itemAngle;
            if (itemsInCurrentLayer <= 1) {
              itemAngle = angleDirection * (angleRange / 2) * (Math.PI / 180);
            } else {
              // adjust the angle step based on the layer spacing multiplier
              const adjustedAngleRange = angleRange * spacingMultiplier;
              const startAngle = angleDirection * (adjustedAngleRange / 2);
              const angleStep = adjustedAngleRange / (itemsInCurrentLayer - 1);

              itemAngle =
                ((startAngle -
                  angleDirection * angleStep * currentItemIndexInLayer) *
                  Math.PI) /
                180;
            }

            const finalAngle = itemAngle + offsetRadians;
            const radius = (size - innerRadius) / 2;

            // use the layer property to adjust distance from center
            const layerMultiplier =
              distanceMultiplier - (currentLayer - 1) * layerOffset;

            const distance = (innerRadius + radius) * layerMultiplier;
            const x = Math.cos(finalAngle) * distance;
            const y = Math.sin(finalAngle) * distance;

            return (
              <RadialMenuItem
                key={item.id}
                item={item}
                onClick={() => {
                  item.onClick?.();
                  if (item.closeOnClick !== false && closeOnClick) {
                    setIsOpen(false);
                    onToggle?.(false);
                  }
                }}
                x={x}
                y={y}
                isActive={activeIndex === index}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              />
            );
          })}
      </AnimatePresence>
    </div>
  );
};

export default RadialMenu;
