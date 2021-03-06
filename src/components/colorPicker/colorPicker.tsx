import { useCallback, useRef, useState } from "react";
import { HslColor, HslColorPicker } from "react-colorful";
import { getCSSColor } from "../../utils/color";
import useClickOutside from "../../utils/useClickOutside";
import "./colorPicker.css";

type Props = {
  className?: string;
  color: HslColor;
  onColorChange: (newColor: HslColor) => void;
  label?: string;
  positionX?: "left" | "right" | "center";
  positionY?: "top" | "bottom";
};

function ColorPicker({
  className,
  color,
  onColorChange,
  label,
  positionX = "left",
  positionY = "bottom",
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClickOutside = useCallback(() => {
    setIsOpen(false);
  }, []);
  useClickOutside(panelRef, handleClickOutside);

  const toggleDisplay = useCallback(() => {
    setIsOpen((isOpen) => !isOpen);
  }, []);

  const colorStyle = {
    background: getCSSColor(color),
  };

  return (
    <div className={`picker ${className ?? ""}`}>
      <button
        style={colorStyle}
        onClick={toggleDisplay}
        aria-label={`${isOpen ? "Close" : "Open"} color picker for ${label}`}
      />
      {isOpen && (
        <div
          className={`picker-panel picker-panel--${positionX} picker-panel--${positionY}`}
          ref={panelRef}
        >
          <HslColorPicker color={color} onChange={onColorChange} />
        </div>
      )}
    </div>
  );
}

export default ColorPicker;
