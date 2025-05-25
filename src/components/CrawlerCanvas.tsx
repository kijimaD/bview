import React, { useEffect, useRef, useState, useCallback } from "react";

export const CrawlerCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dragging, setDragging] = useState<any>(null);
  const [realSize, setRealSize] = useState({ width: 500, height: 500 });

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
    if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // サイズ調整
      if (canvas.width !== realSize.width || canvas.height !== realSize.height) {
          canvas.width = realSize.width;
      canvas.height = realSize.height;
    }
  }, []);

  useEffect(() => {
    draw();
  }, [draw]);

  const scale = () => {
    return realSize.width / settings.ViewWidth;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // カーソル移動
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // ドラッグ開始
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    // ドラッグ終了またはクリック処理
  };

  const handleMouseLeave = () => {
    // ドラッグ中に外に出たときの処理
  };

  const handleDoubleClick = () => {
    viewstore.actions.zoom_factor(2);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onDoubleClick={handleDoubleClick}
    />
  );
};
