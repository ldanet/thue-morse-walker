import { HslColor } from "react-colorful";
import { Rule } from "../../constants";
import { getCSSColor } from "../../utils/color";
import { getSequenceTerm } from "../../utils/walker";

import "./sequenceSample.css";

type Props = {
  bgColor: HslColor;
  rules: Rule[];
};

const getMaxWidth = (base: number) => {
  let result = base;
  let maxWidth = base;
  let power = 1;
  while (maxWidth < 30) {
    result = maxWidth;
    power += 1;
    maxWidth = base ** power;
  }
  return result;
};

const SequenceSample = ({ bgColor, rules }: Props) => {
  const base = rules.length;
  const maxWidth = getMaxWidth(base);
  return (
    <>
      <h3>Sample</h3>
      <p className="sequence-sample" style={{ maxWidth: `${maxWidth}em` }}>
        {[...new Array(maxWidth * (base * 2))].map((_, n) => {
          const term = getSequenceTerm(base, n);
          return (
            <span
              className="sequence-sample_term"
              key={n}
              style={{
                backgroundColor: getCSSColor(rules[term].color),
                color: getCSSColor(bgColor),
              }}
            >
              {term}
            </span>
          );
        })}
      </p>
    </>
  );
};

export default SequenceSample;
