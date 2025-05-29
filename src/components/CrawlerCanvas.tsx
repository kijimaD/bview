// バイナリブロックにマウスオーバー表示する
import React, { useEffect, useRef, useState, useCallback } from "react";
import { extentOutline, scalePolygon } from "../lib/structures";
import { Scan } from "../lib/curve";
import { useAppContext } from "../hooks/app/AppContext";

export const CrawlerCanvas = () => {
  const { state } = useAppContext();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [realSize, setRealSize] = useState({ width: 128, height: 128 });

  const handleResize = useCallback(() => {
    if (canvasRef.current) {
      const { offsetWidth, offsetHeight } = canvasRef.current;
      setRealSize({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

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

    const viewWidth = 256;
    const viewHeight = 1024;
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
    // this.save_poly(poly);
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
  }, [realSize.height, realSize.width, state.bytes, state.view]);

  useEffect(() => {
    draw();
  }, [draw]);

  const handleMouseMove = (e: React.MouseEvent) => {
    // カーソル移動
    console.log(e);
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
