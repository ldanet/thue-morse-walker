import { ChangeEvent, useCallback, useState } from "react";

import { DeepPartial, Rule as TRule, State } from "./constants";

import Rule from "./components/rule/rule";
import Canvas from "./components/canvas/canvas";
import Settings from "./components/settings/Settings";
import "./App.css";
import { HslColor } from "react-colorful";
import { useQueryParams } from "./utils/queryParams";

const defaultRules = [
  {
    step: true,
    rotation: 60,
    color: { h: 350, s: 80, l: 50 },
  },
  {
    step: true,
    rotation: 180,
    color: { h: 212.5, s: 80, l: 50 },
  },
];

function App() {
  const [rules, setRules] = useState<TRule[]>(defaultRules);
  const [delay, setDelay] = useState(0);
  const [cycles, setCycles] = useState(8);
  const [bgColor, setBgColor] = useState<HslColor>({ h: 0, s: 0, l: 100 });
  const [startingAngle, setStartingAngle] = useState(0);
  const [hideSettings, setHideSettings] = useState(false);

  const handleStepChange = useCallback(
    (index, e: ChangeEvent<HTMLInputElement>) => {
      setRules((oldRules) => {
        const newRules = [...oldRules];
        const newRule = { ...oldRules[index], step: e.target.checked };
        newRules[index] = newRule;
        return newRules;
      });
    },
    []
  );

  const handleRotationChange = useCallback((index: number, angle: number) => {
    setRules((oldRules) => {
      const newRules = [...oldRules];
      const newRule = {
        ...oldRules[index],
        rotation: isNaN(angle) ? 0 : angle,
      };
      newRules[index] = newRule;
      return newRules;
    });
  }, []);

  const handleColorChange = useCallback((index: number, color: HslColor) => {
    setRules((oldRules) => {
      const newRules = [...oldRules];

      const newRule = { ...oldRules[index], color };
      newRules[index] = newRule;
      return newRules;
    });
  }, []);

  const handleDeleteRule = useCallback((index: number) => {
    setRules((oldRules) => {
      const newRules = [...oldRules];
      if (newRules.length > 2) {
        newRules.splice(index, 1);
      }
      return newRules;
    });
  }, []);

  const handleAddRule = useCallback(() => {
    setRules((oldRules) => {
      const newRules = [...oldRules];
      const newRule = { ...newRules[newRules.length - 1] }; // Duplicate last rule
      newRule.color = { ...newRule.color, h: (newRule.color.h + 222.5) % 360 };
      newRules.push(newRule);
      return newRules;
    });
  }, []);

  const handleToggleSettings = useCallback(() => {
    setHideSettings((hidden) => !hidden);
  }, []);

  const setStateFromParams = useCallback((params: DeepPartial<State>) => {
    if (params.rules !== undefined) {
      setRules((rules) => {
        const newRules = [...rules];
        params.rules?.forEach((newRule, term) => {
          const oldRule = rules[term] ?? rules[rules.length - 1];
          newRules[term] = {
            ...oldRule,
            ...newRule,
            color: {
              ...oldRule.color,
              ...(newRule.color ?? {
                h: oldRule.color.h + 222.5 * term - (rules.length - 1),
              }),
            },
          };
        });
        // Make sure rule array is not sparse
        return newRules.filter(Boolean);
      });
    }
    if (params.cycles !== undefined) {
      setCycles(params.cycles);
    }
    if (params.delay !== undefined) {
      setDelay(params.delay);
    }
    if (params.startingAngle !== undefined) {
      setStartingAngle(params.startingAngle);
    }
    if (params.bgColor !== undefined) {
      setBgColor((oldColor) => ({ ...oldColor, ...params.bgColor }));
    }
  }, []);

  useQueryParams(
    rules,
    cycles,
    delay,
    startingAngle,
    bgColor,
    setStateFromParams
  );

  return (
    <main>
      <h1>Thue-Morse walker</h1>
      <Canvas
        rules={rules}
        cycles={cycles}
        delay={delay}
        startingAngle={startingAngle}
        bgColor={bgColor}
      />
      <button className="controls-toggle" onClick={handleToggleSettings}>
        {hideSettings ? "Show" : "Hide"} controls
      </button>
      <div className={hideSettings ? "hide" : undefined}>
        <p>
          Total sequence length: {rules.length}&nbsp;^&nbsp;{cycles} ={" "}
          {rules.length ** cycles}
        </p>
        <Settings
          cycles={cycles}
          delay={delay}
          startingAngle={startingAngle}
          setCycles={setCycles}
          setDelay={setDelay}
          setStartingAngle={setStartingAngle}
          bgColor={bgColor}
          setBgColor={setBgColor}
        />
        <h2>Rules</h2>
        <table>
          <thead>
            <tr>
              <th id="h-term">Term</th>
              <th id="h-rotate">Rotate</th>
              <th id="h-step">Step</th>
              <th id="h-color">Color</th>
              <td />
            </tr>
          </thead>
          <tbody>
            {rules.map((rule, index) => (
              <Rule
                key={index}
                index={index}
                ruleSet={rule}
                onStepChange={handleStepChange}
                onRotationChange={handleRotationChange}
                onColorChange={handleColorChange}
                onDeleteRule={handleDeleteRule}
                deleteable={rules.length > 2}
              />
            ))}
          </tbody>
        </table>
        <button title="Add rule" onClick={handleAddRule}>
          +
        </button>
      </div>
    </main>
  );
}

export default App;
