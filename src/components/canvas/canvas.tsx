import { useCallback, useEffect, useRef, useState } from "react";
import "./canvas.css";
import drawStep, { Coordinates, DrawStepArgs } from "../../utils/walker";
import { Rule } from "../../constants";

const USER_STOP_MESSAGE = "Stopping drawing on user request";

type Props = {
  rules: Rule[];
  delay: number;
  cycles: number;
  startingAngle: number;
};

const Canvas = ({ rules, delay, cycles, startingAngle }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const stopDrawing = useRef(false);

  const step = useCallback(
    (args: DrawStepArgs) => {
      return new Promise<DrawStepArgs>((resolve, reject) => {
        if (stopDrawing.current === true) {
          reject(new Error(USER_STOP_MESSAGE));
        } else {
          setTimeout(() => {
            resolve(drawStep(args));
          }, delay);
        }
      });
    },
    [delay]
  );

  // Make sure the stepping function used in the loop is always ip to date when it's called
  const stepFnRef = useRef(step);
  useEffect(() => {
    stepFnRef.current = step;
  }, [step]);

  const draw = useCallback(async () => {
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
      angle: startingAngle,
      length: 64,
      color: rules[0].color,
    };

    let args: DrawStepArgs = { ctx, i: 0, coords, rules };

    for (let i = 0; i < rules.length ** cycles; i += 1) {
      if (stopDrawing.current) break;
      args = await stepFnRef.current(args);
    }
    return;
  }, [cycles, rules, startingAngle]);

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
      stopDrawing.current = true;
    }
  }, [isDrawing]);

  return (
    <div>
      <canvas className="canvas" ref={canvasRef} width="500" height="500" />
      <div>
        Total sequence length: {rules.length}&nbsp;^&nbsp;{cycles} ={" "}
        {rules.length ** cycles}
        <button
          className="draw-button"
          onClick={isDrawing ? handleStopDrawing : startDrawing}
        >
          {isDrawing ? "Stop" : "Draw"}
        </button>
      </div>
    </div>
  );
};

export default Canvas;
