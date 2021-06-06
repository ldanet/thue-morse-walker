import { useEffect } from "react";
import qs from "qs";
import { DeepPartial, ParamsObject, Rule } from "../constants";

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
  startingAngle: number
) => {
  const paramsObj = {
    rules,
    cycles,
    delay,
    startAng: startingAngle,
  };
  const paramString = qs.stringify(paramsObj);
  const url = new URL(window.location.href);
  url.search = paramString;
  return url;
};

export const getValuesFromUrl = (): DeepPartial<ParamsObject> => {
  const params = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const values: DeepPartial<ParamsObject> = {};

  if (Array.isArray(params.rules)) {
    const rules: DeepPartial<Rule>[] = [];

    params.rules.forEach((val, index) => {
      if (typeof val === "object") {
        const rule: DeepPartial<Rule> = {};
        rule.step = getBoolean(val.step);
        rule.rotation = getFloat(val.rotation);

        const paramColor = val.color;

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

    values.rules = rules;
  }
  values.cycles = getInt(params.cycles);
  values.delay = getInt(params.delay);
  values.startAng = getFloat(params.startAng);
  return values;
};

export const useQueryParams = (
  rules: Rule[],
  cycles: number,
  delay: number,
  startingAngle: number,
  setState: (params: DeepPartial<ParamsObject>) => void
) => {
  useEffect(() => {
    setState(getValuesFromUrl());
    // only run on mount
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const url = getUrl(rules, cycles, delay, startingAngle);
    window.history.replaceState(null, "", url.toString());
  }, [rules, cycles, delay, startingAngle]);
};
