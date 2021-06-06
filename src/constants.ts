import { HslColor } from "react-colorful";

export type Rule = {
  step: boolean;
  rotation: number;
  color: HslColor;
};

export type ParamRule = {
  s: boolean; // step
  r: number; // rotation
  c: HslColor; // color
};

export type ParamsObject = {
  r: ParamRule[]; // rules
  c: number; // cycles
  d: number; // delay
  a: number; // starting angle
  b: HslColor; // bg color
};

export type State = {
  rules: Rule[];
  cycles: number;
  delay: number;
  startingAngle: number;
  bgColor: HslColor;
};

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer I>
    ? Array<DeepPartial<I>>
    : DeepPartial<T[P]>;
};
