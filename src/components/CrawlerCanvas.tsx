// バイナリブロックにマウスオーバー表示する
import React, { useEffect, useRef, useState, useCallback } from "react";
import { extentOutline, scalePolygon } from "../lib/structures";
import { Scan } from "../lib/curve";
import { useAppContext } from "../hooks/app/AppContext";
import type { Point, View } from "../lib/types";
import type { Curve } from "../lib/curve";

export const CrawlerCanvas = () => {
  const { state } = useAppContext();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [realSize, setRealSize] = useState({ width: 128, height: 128 });
  const viewWidth = 256;
  const viewHeight = 1024;
  const canvas = canvasRef.current;

  const handleResize = useCallback(() => {
    if (canvas === null) return;
    if (canvasRef.current && state.bytes) {
      const { offsetWidth } = canvasRef.current;
      const height = state.bytes?.length / 32;
      setRealSize({ width: offsetWidth, height: height });
    }
  }, [state.bytes, canvas]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const draw = useCallback(() => {
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

    const factor = canvas.width / viewWidth;

    if (state.view === null) return;
    if (state.bytes === null) return;
    let poly = extentOutline(
      Scan,
      state.view,
      { start: 0, end: state.bytes.length },
      viewWidth,
      viewHeight,
    );

    poly = scalePolygon(poly, factor);
    ctx.beginPath();
    function xrange(x: number): number {
      if (canvas === null) return 0;
      const max = canvas.width - viewWidth;
      if (x < 2) {
        return 1;
      } else if (x > max) {
        return max;
      }
      return x;
    }
    function yrange(y: number): number {
      if (canvas === null) return 0;
      const max = canvas.height - viewHeight;
      if (y < 2) {
        return 1;
      } else if (y > max) {
        return max;
      }
      return y;
    }
    ctx.moveTo(xrange(poly[0].x), yrange(poly[0].y));
    for (let i = 1; i < poly.length; i++) {
      ctx.lineTo(xrange(poly[i].x), yrange(poly[i].y));
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }, [realSize.height, realSize.width, state.bytes, state.view, canvas]);

  useEffect(() => {
    draw();
  }, [draw]);

  function scale(canvas: HTMLCanvasElement): number {
    return canvas.width / viewWidth;
  }

  // カーソル移動
  const { dispatch } = useAppContext();
  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
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
