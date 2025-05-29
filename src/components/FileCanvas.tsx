import { useEffect, useCallback, useRef } from "react";
import { useAppContext } from "../hooks/app/AppContext";
import { Scan } from "../lib/curve";
import type { Rect } from "../lib/types";
import { ByteClass } from "../lib/colors";
import { createRect, scaleRect } from "../lib/structures";

export const FileCanvas = () => {
  const { state } = useAppContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  if (state.view === null) return;
  if (state.bytes === null) return;

  const viewWidth = 256;
  const viewHeight = 1024;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const w = canvas.width;
    const h = canvas.height;
    const scale = w / viewWidth;
    const viewscale = (viewWidth * viewHeight) / state.view.len();

    ctx.clearRect(0, 0, w, h);

    const curve = Scan;
    let r: Rect;

    for (let y = 0; y < viewHeight; y++) {
      let run = 0;
      let run_col: string | null = null;
      for (let x = 0; x < viewWidth; x++) {
        const offset = curve.pointToOffset({ x, y }, viewWidth, viewHeight);
        const view_offset = Math.floor(offset / viewscale);
        if (state.bytes === null) return;
        const col = ByteClass.color(
          state.view.start + view_offset,
          state.bytes,
        );

        if (run_col !== null && run_col !== col) {
          ctx.fillStyle = run_col;
          r = createRect(x - run, y, run, 1);
          r = scaleRect(r, scale);
          ctx.fillRect(r.point.x, r.point.y, r.w, r.h);
          run = 0;
          run_col = col;
        }

        run_col = col;
        run += 1;
      }

      if (run > 0 && run_col) {
        ctx.fillStyle = run_col;
        r = createRect(viewWidth - run, y, run, 1);
        r = scaleRect(r, scale);
        ctx.fillRect(r.point.x, r.point.y, r.w, r.h);
      }
    }
  }, [state.bytes, state.view]);

  useEffect(() => {
    draw();
  }, [draw]);

  return <canvas className="filecanvas" ref={canvasRef}></canvas>;
};
