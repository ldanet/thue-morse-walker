import { useEffect } from "react";
import qs from "qs";
import { DeepPartial, ParamsObject, Rule, State } from "../constants";
import { HslColor } from "react-colorful";

function isNumber(val: string): boolean {
  return !isNaN(parseFloat(val)) && isFinite(parseFloat(val));
}

function isBoolean(val: string): boolean {
  return val === "false" || val === "true";
}

function getInt(val: unknown): number | undefined {
  if (typeof val === "string" && isNumber(val)) {
    return parseInt(val, 10);
  }
  return undefined;
}

function getFloat(val: unknown): number | undefined {
  if (typeof val === "string" && isNumber(val)) {
    return parseFloat(val);
  }
  return undefined;
}

function getBoolean(val: unknown): boolean | undefined {
  if (typeof val === "string" && isBoolean(val)) {
    return val === "true";
  }
  return undefined;
}

export const getUrl = (
  rules: Rule[],
  cycles: number,
  delay: number,
  startingAngle: number,
  bgColor: HslColor
) => {
  const paramsObj: ParamsObject = {
    r: rules.map((rule) => ({ s: rule.step, r: rule.rotation, c: rule.color })),
    c: cycles,
    d: delay,
    a: startingAngle,
    b: bgColor,
  };
  const paramString = qs.stringify(paramsObj);
  const url = new URL(window.location.href);
  url.search = paramString;
  return url;
};

export const getValuesFromUrl = (): DeepPartial<State> => {
  const params = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const result: DeepPartial<State> = {};

  if (Array.isArray(params.r)) {
    const rules: DeepPartial<Rule>[] = [];

    params.r.forEach((val, index) => {
      if (typeof val === "object") {
        const rule: DeepPartial<Rule> = {};
        rule.step = getBoolean(val.s);
        rule.rotation = getFloat(val.r);

        const paramColor = val.c;

        if (typeof paramColor === "object" && !Array.isArray(paramColor)) {
          rule.color = {
            h: getInt(paramColor.h),
            s: getInt(paramColor.s),
            l: getInt(paramColor.l),
          };
        }
        rules[index] = rule;
      }
    });

    result.rules = rules;
  }
  result.cycles = getInt(params.c);
  result.delay = getInt(params.d);
  result.startingAngle = getFloat(params.a);
  if (typeof params.b === "object" && !Array.isArray(params.b)) {
    result.bgColor = {
      h: getInt(params.b.h),
      s: getInt(params.b.s),
      l: getInt(params.b.l),
    };
  }
  return result;
};

export const useQueryParams = (
  rules: Rule[],
  cycles: number,
  delay: number,
  startingAngle: number,
  bgColor: HslColor,
  setState: (params: DeepPartial<State>) => void
) => {
  useEffect(() => {
    setState(getValuesFromUrl());
    // only run on mount
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const url = getUrl(rules, cycles, delay, startingAngle, bgColor);
    window.history.replaceState(null, "", url.toString());
  }, [rules, cycles, delay, startingAngle, bgColor]);
};
