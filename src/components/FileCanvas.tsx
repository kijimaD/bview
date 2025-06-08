// バイナリブロックの色分け表示
import { useState, useEffect, useCallback, useRef } from "react";
import { useAppContext } from "../hooks/app/AppContext";
import { Scan } from "../lib/curve";
import type { Rect } from "../lib/types";
import { ByteClass } from "../lib/colors";
import { createRect, scaleRect } from "../lib/structures";
import { viewWidth, viewHeight } from "../lib/const";

export const FileCanvas = () => {
  const { state } = useAppContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [realSize, setRealSize] = useState({ width: 0, height: 0 });

  {
    const handleResize = useCallback(() => {
      if (canvasRef.current && state.bytes) {
        const { offsetWidth } = canvasRef.current;
        // FIXME: ファイルサイズが大きいときに非常に長くなるのでちゃんと設定する
        // FIXME: 横幅を大きくして描画ピクセルが大きくなるとスクロールが足りなくなる
        const height = state.bytes?.length / 32;
        setRealSize({ width: offsetWidth, height: height });
      }
    }, [state.bytes]);

    useEffect(() => {
      handleResize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [handleResize]);
  }
  {
    const draw = useCallback(() => {
      if (state.view === null) return;
      if (state.bytes === null) return;

      const canvas = canvasRef.current;
      if (canvas === null) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // サイズ調整
      if (
        canvas.width !== realSize.width ||
        canvas.height !== realSize.height
      ) {
        canvas.width = realSize.width;
        canvas.height = realSize.height;
      }

      // canvasサイズで変動する
      const scale = canvas.width / viewWidth;
      // 1バイト分を描画するサイズ
      const viewScale = state.byteDrawScale;

      const curve = Scan;
      let r: Rect;
      for (let y = 0; y < viewHeight; y++) {
        // 描画効率のため続く色はまとめて塗る
        let run = 0;
        let runColor: string | null = null;
        for (let x = 0; x < viewWidth; x++) {
          const offset = curve.pointToOffset({ x, y }, viewWidth, viewHeight);
          const viewOffset = Math.floor(offset / viewScale);
          const color = ByteClass.color(
            state.view.start + viewOffset,
            state.bytes,
          );

          // 色が変わったら塗る
          if (runColor !== null && runColor !== color) {
            ctx.fillStyle = runColor;
            r = createRect(x - run, y, run, 1);
            r = scaleRect(r, scale);
            ctx.fillRect(r.point.x, r.point.y, r.w, r.h);

            // リセット
            run = 0;
            runColor = color;
          }

          runColor = color;
          run += 1;
        }

        // まとめて塗る
        if (run > 0 && runColor) {
          ctx.fillStyle = runColor;
          r = createRect(viewWidth - run, y, run, 1);
          r = scaleRect(r, scale);
          ctx.fillRect(r.point.x, r.point.y, r.w, r.h);
        }
      }
    }, [
      state.bytes,
      state.view,
      realSize.height,
      realSize.width,
      state.byteDrawScale,
    ]);

    useEffect(() => {
      draw();
    }, [draw]);
  }

  return <canvas className="filecanvas" ref={canvasRef} />;
};
