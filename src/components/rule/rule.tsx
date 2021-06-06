import FloatInput from "../floatInput/floatInput";
import ColorPicker from "../colorPicker/colorPicker";
import { Rule as TRule } from "../../constants";
import { ChangeEvent, useCallback } from "react";
import { HslColor } from "react-colorful";

type Props = {
  index: number;
  ruleSet: TRule;
  onStepChange: (index: number, event: ChangeEvent<HTMLInputElement>) => void;
  onRotationChange: (index: number, angle: number) => void;
  onColorChange: (index: number, newColor: HslColor) => void;
  onDeleteRule: (index: number) => void;
  deleteable: boolean;
};

function Rule({
  index,
  ruleSet,
  onStepChange,
  onRotationChange,
  onColorChange,
  onDeleteRule,
  deleteable,
}: Props) {
  const handleStepChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onStepChange(index, e);
    },
    [index, onStepChange]
  );
  const handleRotationChange = useCallback(
    (angle: number) => {
      onRotationChange(index, angle);
    },
    [index, onRotationChange]
  );
  const handleColorChange = useCallback(
    (newColor: HslColor) => {
      onColorChange(index, newColor);
    },
    [index, onColorChange]
  );

  const handleDeleteRule = useCallback(() => {
    onDeleteRule(index);
  }, [index, onDeleteRule]);
  return (
    <tr>
      <td id={`term-${index}`}>{index}</td>
      <td>
        <FloatInput
          id={`angle-${index}`}
          onChange={handleRotationChange}
          value={ruleSet.rotation}
          aria-labelledby={`h-term term-${index} h-rotation`}
        />
        °
      </td>
      <td>
        <input
          type="checkbox"
          id={`step-${index}`}
          onChange={handleStepChange}
          checked={ruleSet.step}
          aria-labelledby={`h-term term-${index} h-step`}
        />
      </td>
      <td>
        <ColorPicker
          color={ruleSet.color}
          onColorChange={handleColorChange}
          label={`term ${index}`}
        />
      </td>
      <td>
        <button
          title={`Delete rule for term ${index}`}
          onClick={handleDeleteRule}
          disabled={!deleteable}
        >
          X
        </button>
      </td>
    </tr>
  );
}

export default Rule;
