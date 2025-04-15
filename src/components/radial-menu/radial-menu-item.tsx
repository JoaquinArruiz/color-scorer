import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { createPortal } from "react-dom";
import type { RadialMenuItemProps } from "./radial-menu";
import clsx from "clsx";
import { useColorStore, getHexString } from "@/store/colorStore";

interface Props {
  item: RadialMenuItemProps;
  x: number;
  y: number;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

const RadialMenuItem: React.FC<Props> = ({
  item,
  x,
  y,
  isActive,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const colors = useColorStore();

  useEffect(() => {
    if (isActive && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setTooltipPosition({
        top: rect.bottom + 8,
        left: rect.left + rect.width / 2,
      });
    }
  }, [isActive]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <motion.div
      ref={buttonRef}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: x,
        y: y,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      exit={{ opacity: 0, scale: 0 }}
      className={clsx(
        "absolute",
        "z-0",
        "left-1/2",
        "top-1/2",
        "transform",
        "-translate-x-1/2",
        "-translate-y-1/2",
        `w-[50px]`,
        `h-[50px]`
      )}
      whileHover={{ scale: 1.1 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <motion.button
        onClick={handleClick}
        className={clsx(
          "w-full",
          "flex",
          "h-full",
          "rounded-full",
          "flex",
          "items-center",
          "justify-center",
          "shadow-md",
          "z-0",
          item.color || "bg-white",
          "transition-colors"
        )}
        style={{
          borderColor: getHexString(colors.color2),
        }}
        whileTap={{ scale: 0.95 }}
      >
        {item.icon}
        {item.label && <span className="sr-only">{item.label}</span>}
      </motion.button>

      {isActive &&
        createPortal(
          <div
            className={clsx(
              "fixed",
              "bg-black/90",
              "font-hind",
              "text-white",
              "px-2",
              "py-1",
              "rounded",
              "text-sm",
              "shadow-lg",
              "z-[9999]",
              "transform",
              "-translate-x-1/2",
              "text-nowrap"
            )}
            style={{
              top: `${tooltipPosition.top}px`,
              left: `${tooltipPosition.left}px`,
            }}
          >
            {item.label}
          </div>,
          document.body
        )}
    </motion.div>
  );
};

export default RadialMenuItem;
