import type { Point } from "./types";

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

export type Curve = {
  offsetToPoint: OffsetToPointFn;
  pointToOffset: PointToOffsetFn;
};

export const Scan: Curve = {
  offsetToPoint: (offset, canvasWidth) => {
    const y = Math.floor(offset / canvasWidth);
    let x = offset % canvasWidth;
    if (y % 2 === 1) {
      x = canvasWidth - x - 1;
    }
    return { x, y };
  },

  pointToOffset: (point, canvasWidth) => {
    let x = point.x;
    if (point.y % 2 === 1) {
      x = canvasWidth - x - 1;
    }
    return point.y * canvasWidth + x;
  },
};
