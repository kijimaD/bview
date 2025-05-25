import type { Point, Extent, Polygon } from "./types";

export function extentLength(extent: Extent): number {
  return extent.end - extent.start;
}

export function newExtent(start: number, end: number): Extent {
  return {
    start: Math.min(start, end),
    end: Math.max(start, end),
  };
}

export function newPolygon(points: Point[]): Polygon {
  return { points };
}

export function scalePolygon(polygon: Polygon, factor: number): Polygon {
  return {
    points: polygon.points.map((p) => ({
      x: p.x * factor,
      y: p.y * factor,
    })),
  };
}

export function extentOutline(
  curve: (i: number) => number,
  extent: Extent,
  width: number,
  height: number
): Polygon {
  const len = extentLength(extent);
  const points: Point[] = [];

  const stride = Math.max(Math.floor(len / width), 1);

  // Top line: left to right
  for (let i = extent.start; i < extent.end; i += stride) {
    const x = ((i - extent.start) / len) * width;
    const y = curve(i) * height;
    points.push({ x, y });
  }

  // Bottom line: right to left
  for (let i = extent.end; i > extent.start; i -= stride) {
    const x = ((i - extent.start) / len) * width;
    const y = height; // baseline
    points.push({ x, y });
  }

  return newPolygon(points);
}
