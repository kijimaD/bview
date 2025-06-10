import type { Point } from "./types";

// 充填法のインターフェース
export type Curve = {
  offsetToPoint: OffsetToPointFn;
  pointToOffset: PointToOffsetFn;
};

type OffsetToPointFn = (
  offset: number,
  canvasWidth: number,
  canvasHeight: number,
) => Point;

type PointToOffsetFn = (
  point: Point,
  canvasWidth: number,
  canvasHeight: number,
) => number;

// ================

// 1--->2
// 3--->4
export const Scan: Curve = {
  offsetToPoint: (offset, canvasWidth) => {
    return {
      x: offset % canvasWidth,
      y: Math.floor(offset / canvasWidth),
    };
  },

  pointToOffset: (point, canvasWidth) => {
    return point.y * canvasWidth + point.x;
  },
};
