import { HslColor } from "react-colorful";

export const getCSSColor = (color: HslColor) =>
  `hsl(${color.h},${color.s}%,${color.l}%)`;
