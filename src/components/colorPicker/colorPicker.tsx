import { useCallback, useRef, useState } from "react";
import { HslColor, HslColorPicker } from "react-colorful";
import useClickOutside from "../../utils/useClickOutside";
import "./colorPicker.css";

type Props = {
  color: HslColor;
  onColorChange: (newColor: HslColor) => void;
};

function ColorPicker({ color, onColorChange }: Props) {
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
    background: `hsl(${color.h},${color.s}%,${color.l}%)`,
  };

  return (
    <div className="picker">
      <button style={colorStyle} onClick={toggleDisplay} />
      {isOpen && (
        <div className="picker-panel" ref={panelRef}>
          <HslColorPicker color={color} onChange={onColorChange} />
        </div>
      )}
    </div>
  );
}

export default ColorPicker;
