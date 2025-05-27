import React, { useEffect, useRef, useState, useCallback } from "react";

export const CrawlerCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [realSize, setRealSize] = useState({ width: 500, height: 500 });
  console.log(realSize);

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
    // const canvas = canvasRef.current;
    // if (!canvas) return;
    // const ctx = canvas.getContext("2d");
    // if (!ctx) return;
    //
    // // サイズ調整
    //   if (canvas.width !== realSize.width || canvas.height !== realSize.height) {
    //       canvas.width = realSize.width;
    //       canvas.height = realSize.height;
    //   }
    //
    //   ctx.strokeStyle = "#f2ed85";
    //   ctx.fillStyle = "rgba(100, 100, 100, 0.2)";
    //   ctx.lineWidth = 2;
    //
    //   const viewWidth = 256;
    //   const viewHeight = 1024;
    //   const scale = canvas.width/viewWidth;
    //
    //   let poly = extentOutline(
    //       Scan,
    //       this.props.view,
    //       this.state.dragging || this.props.focus,
    //       viewWidth,
    //       viewHeight,
    //   );
    //
    //   poly = poly.scale(scale);
    //   this.save_poly(poly);
    //   ctx.beginPath();
    //   function xrange(x: number){
    //       const max = canvas.width - viewWidth
    //       if (x < 2) {
    //           return 1;
    //       } else if (x > max) {
    //           return max;
    //       }
    //       return x;
    //   }
    //   function yrange(y: number){
    //       const max = canvas?.height - viewHeight
    //       if (y < 2) {
    //           return 1;
    //       } else if (y > max) {
    //           return max;
    //       }
    //       return y;
    //   }
    //   ctx.moveTo(xrange(poly.points[0].x), yrange(poly.points[0].y));
    //   for (let i = 1; i < poly.points.length; i++){
    //       ctx.lineTo(xrange(poly.points[i].x), yrange(poly.points[i].y));
    //   }
    //   ctx.closePath();
    //   ctx.stroke();
    //   ctx.fill();
  }, []);

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
    />
  );
};
