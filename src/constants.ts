import { HslColor } from "react-colorful";

export type Rule = {
  step: boolean;
  rotation: number;
  color: HslColor;
};

export type ParamsObject = {
  rules: Rule[];
  cycles: number;
  delay: number;
  startAng: number;
};

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer I>
    ? Array<DeepPartial<I>>
    : DeepPartial<T[P]>;
};
