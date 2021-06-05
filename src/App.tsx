import { ChangeEvent, useCallback, useState } from "react";

import { Rule as TRule } from "./constants";

import Rule from "./components/rule/rule";
import Canvas from "./components/canvas/canvas";
import "./App.css";
import { HslColor } from "react-colorful";

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
  const [startingAngle, setStartingAngle] = useState(0);

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

  return (
    <main>
      <h1>Thue-Morse walker</h1>
      <Canvas rules={rules} />
      <h2>Rules</h2>
      <table>
        <thead>
          <tr>
            <th>Element</th>
            <th>Rotate</th>
            <th>Step</th>
            <th>Color</th>
            <th />
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
    </main>
  );
}

export default App;
