// バイナリブロックにマウスオーバー表示する
import React, { useEffect, useRef, useState, useCallback } from "react";
import { createRect, scaleRect } from "../lib/structures";
import { Scan } from "../lib/curve";
import { useAppContext } from "../hooks/app/AppContext";
import type { Point, View } from "../lib/types";
import type { Curve } from "../lib/curve";
import { viewWidth, viewHeight } from "../lib/const";

export const CrawlerCanvas = () => {
  const { state } = useAppContext();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [realSize, setRealSize] = useState({ width: 0, height: 0 });

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;
    if (canvasRef.current && state.bytes) {
      const { offsetWidth } = canvasRef.current;
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

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // サイズ調整
    if (canvas.width !== realSize.width || canvas.height !== realSize.height) {
      canvas.width = realSize.width;
      canvas.height = realSize.height;
    }

    ctx.strokeStyle = "#f2ed85";
    ctx.fillStyle = "rgba(100, 100, 100, 0.2)";
    ctx.lineWidth = 2;

    if (state.view === null) return;
    if (state.bytes === null) return;

    const viewscale = (viewWidth * viewHeight) / state.view.len();
    const screenScale = canvas.width / viewWidth;

    // カーソル位置に枠を表示する
    const curve = Scan;
    const cursorOffset = state.cursor - state.view.start;
    if (cursorOffset >= 0 && cursorOffset < state.view.len()) {
      const logicalOffset = cursorOffset * viewscale;
      const { x, y } = curve.offsetToPoint(
        logicalOffset,
        viewWidth,
        viewHeight,
      );
      let r = createRect(x, y, 1, 1);
      r = scaleRect(r, screenScale);
      ctx.strokeStyle = "#ffff00";
      ctx.strokeRect(r.point.x, r.point.y, r.w, r.h);
    }
  }, [realSize.height, realSize.width, state.bytes, state.view, state.cursor]);

  useEffect(() => {
    draw();
  }, [draw, state.cursor]);

  function scale(canvas: HTMLCanvasElement): number {
    return canvas.width / viewWidth;
  }

  // カーソル移動
  const { dispatch } = useAppContext();
  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const canvas = canvasRef.current;
    if (canvas === null) return;
    const coords = evt_coords(e, scale(canvas));
    const offset = mouseOffset({
      coords: coords,
      view: state.view,
      viewWidth: viewWidth,
      viewHeight: viewHeight,
    });
    dispatch({
      type: "SET_CURSOR",
      payload: { cursor: offset },
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // ドラッグ開始
    console.log(e);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    // ドラッグ終了またはクリック処理
    console.log(e);
  };

  const handleMouseLeave = () => {
    // ドラッグ中に外に出たときの処理
  };

  const handleDoubleClick = () => {};

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onDoubleClick={handleDoubleClick}
      className="crawercanvas"
    />
  );
};

function evt_coords(
  e: React.MouseEvent<HTMLSpanElement>,
  scale: number,
): Point {
  const coords = mouseCoords(e);
  return {
    x: Math.floor(coords[0] / scale),
    y: Math.floor(coords[1] / scale),
  };
}

interface MouseOffsetParams {
  coords: Point;
  view: View;
  viewWidth: number;
  viewHeight: number;
}

function mouseOffset({
  coords,
  view,
  viewWidth,
  viewHeight,
}: MouseOffsetParams): number {
  const localOffset = view_offset(
    coords,
    view.len(),
    Scan,
    viewWidth,
    viewHeight,
  );
  return localOffset + view.start;
}

function mouseCoords(e: React.MouseEvent<HTMLSpanElement>): [number, number] {
  let posX = 0;
  let posY = 0;

  if (e.pageX !== undefined && e.pageY !== undefined) {
    posX = e.pageX;
    posY = e.pageY;
  } else if (e.clientX !== undefined && e.clientY !== undefined) {
    posX =
      e.clientX +
      document.body.scrollLeft +
      document.documentElement.scrollLeft;
    posY =
      e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }

  const target = e.target as HTMLElement;
  const rect = target.getBoundingClientRect();

  return [posX - rect.left, posY - rect.top];
}

function view_offset(
  point: Point,
  viewlen: number,
  curve: Curve,
  w: number,
  h: number,
) {
  const visual_offset = curve.pointToOffset(point, w, h);
  return Math.floor((viewlen / (w * h)) * visual_offset);
}
