import { ChangeEvent, useCallback } from "react";
import FloatInput from "../floatInput/floatInput";

type Props = {
  cycles: number;
  setCycles: (cycles: number) => void;
  delay: number;
  setDelay: (delay: number) => void;
  startingAngle: number;
  setStartingAngle: (angle: number) => void;
};

function Settings({
  cycles,
  delay,
  startingAngle,
  setCycles,
  setDelay,
  setStartingAngle,
}: Props) {
  const changeCycles = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setCycles(parseInt(e.target.value, 10));
    },
    [setCycles]
  );

  const changeDelay = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setDelay(Math.max(0, parseInt(e.target.value, 10) ?? 0));
    },
    [setDelay]
  );

  return (
    <>
      <h2>Settings</h2>
      <div>
        <label htmlFor="cycles">Cycles: </label>
        <input
          type="number"
          id="cycles"
          value={cycles}
          onChange={changeCycles}
        />
      </div>
      <div>
        <label htmlFor="delay">Delay: </label>
        <input type="number" id="delay" value={delay} onChange={changeDelay} />
        ms
      </div>
      <div>
        <label htmlFor="startingAngle">Starting angle: </label>
        <FloatInput
          id={`startingAngle`}
          onChange={setStartingAngle}
          value={startingAngle}
        />
        °
      </div>
    </>
  );
}

export default Settings;
