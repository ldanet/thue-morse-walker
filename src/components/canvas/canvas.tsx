import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import "./canvas.css";
import drawStep, { Coordinates, DrawStepArgs } from "../../utils/walker";
import { Rule } from "../../constants";

const USER_STOP_MESSAGE = "Stopping drawing on user request";

type Props = {
  rules: Rule[];
};

const Canvas = ({ rules }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [stopDrawing, setStopDrawing] = useState(false);
  const [delay, setDelay] = useState(0);
  const [cycles, setCycles] = useState(8);

  const changeCycles = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCycles(parseInt(e.target.value, 10));
  }, []);

  const changeDelay = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDelay(Math.max(0, parseInt(e.target.value, 10)));
  }, []);

  const step = useCallback(
    (args: DrawStepArgs) => {
      return new Promise<DrawStepArgs>((resolve, reject) => {
        if (stopDrawing === true) {
          reject(new Error(USER_STOP_MESSAGE));
        } else {
          setTimeout(() => {
            resolve(drawStep(args));
          }, delay);
        }
      });
    },
    [delay, stopDrawing]
  );

  // Make sure the stepping function used in the loop is always ip to date when it's called
  const stepFnRef = useRef(step);
  useEffect(() => {
    stepFnRef.current = step;
  }, [step]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.getContext) {
      return Promise.reject();
    }

    const height = canvas.height;
    const width = canvas.width;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return Promise.reject();
    }

    ctx.clearRect(0, 0, width, height); // clear canvas before starting new drawing
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const coords: Coordinates = {
      x: width / 2,
      y: height / 2,
      angle: 0,
      length: 64,
      color: rules[0].color,
    };

    const args: DrawStepArgs = { ctx, i: 0, coords, rules };

    let promise = Promise.resolve(args);
    for (let i = 0; i < rules.length ** cycles; i += 1) {
      promise = promise.then((...args) => stepFnRef.current(...args));
    }
    return promise;
  }, [cycles, rules]);

  const startDrawing = useCallback(() => {
    if (!canvasRef.current || isDrawing === true) {
      // do nothing
    } else if (!canvasRef.current.getContext) {
      console.warn("Canvas is not supported");
    } else {
      setIsDrawing(true);
      draw()
        .catch((err) => {
          if (err.message === USER_STOP_MESSAGE) {
            console.log(USER_STOP_MESSAGE);
          } else {
            console.error(err);
          }
        })
        .finally(() => {
          console.log("Finished drawing");
          setIsDrawing(false);
          setStopDrawing(false);
        });
    }
  }, [isDrawing, draw]);

  const handleStopDrawing = useCallback(() => {
    if (isDrawing) {
      setStopDrawing(true);
    }
  }, [isDrawing]);

  return (
    <div>
      <canvas className="canvas" ref={canvasRef} width="500" height="500" />
      <div>
        <div>
          <label htmlFor="cycles">
            Number of elements: {rules.length}&nbsp;^&nbsp;
          </label>
          <input
            type="number"
            id="cycles"
            value={cycles}
            onChange={changeCycles}
          />{" "}
          = {rules.length ** cycles}
        </div>
        <div>
          <label htmlFor="delay">Delay: </label>
          <input
            type="number"
            id="delay"
            value={delay}
            onChange={changeDelay}
          />
          ms
        </div>
        <button onClick={isDrawing ? handleStopDrawing : startDrawing}>
          {isDrawing ? "Stop" : "Draw"}
        </button>
      </div>
    </div>
  );
};

export default Canvas;