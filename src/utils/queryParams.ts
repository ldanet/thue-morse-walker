import { useEffect } from "react";
import jsurl from "jsurl";
import { DeepPartial, ParamsObject, Rule, State } from "../constants";
import { HslColor } from "react-colorful";

function getNumber<T extends string>(obj: unknown, key: T): number | undefined {
  if (hasProperty(obj, key)) {
    const val = obj[key];
    if (typeof val === "number") {
      return val;
    }
  }
  return undefined;
}

function getBoolean<T extends string>(
  obj: unknown,
  key: T
): boolean | undefined {
  if (hasProperty(obj, key)) {
    const val = obj[key];
    if (typeof val === "boolean") {
      return val;
    }
  }
  return undefined;
}

function hasProperty<T extends string>(
  value: unknown,
  key: T
): value is { [key in T]: unknown } {
  if ((value as { [key in T]: unknown })[key] !== undefined) {
    return true;
  }
  return false;
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

  const paramString = jsurl.stringify(paramsObj);
  const url = new URL(window.location.href);
  url.search = paramString;
  return url;
};

export const getValuesFromUrl = (): DeepPartial<State> | null => {
  const params: unknown = jsurl.tryParse(
    window.location.search.replace(/^\?/, "")
  );
  const result: DeepPartial<State> = {};
  if (!params || typeof params !== "object") return null;

  if (hasProperty(params, "r") && Array.isArray(params.r)) {
    const rules: DeepPartial<Rule>[] = [];

    params.r.forEach((val: unknown, index) => {
      if (typeof val === "object") {
        const rule: DeepPartial<Rule> = {};
        rule.step = getBoolean(val, "s");
        rule.rotation = getNumber(val, "r");

        const paramColor = hasProperty(val, "c") ? val.c : undefined;

        if (typeof paramColor === "object" && !Array.isArray(paramColor)) {
          rule.color = {
            h: getNumber(paramColor, "h"),
            s: getNumber(paramColor, "s"),
            l: getNumber(paramColor, "l"),
          };
        }
        rules[index] = rule;
      }
    });

    result.rules = rules;
  }
  result.cycles = getNumber(params, "c");
  result.delay = getNumber(params, "d");
  result.startingAngle = getNumber(params, "a");
  if (
    hasProperty(params, "b") &&
    typeof params.b === "object" &&
    !Array.isArray(params.b)
  ) {
    result.bgColor = {
      h: getNumber(params.b, "h"),
      s: getNumber(params.b, "s"),
      l: getNumber(params.b, "l"),
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
  setState: (params: DeepPartial<State> | null) => void
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
