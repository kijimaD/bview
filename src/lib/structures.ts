import type { View, Point, Extent, Polygon, OnCurve, Rect } from "./types";
import type { Curve } from "./curve";

// +--------→ x（→）
// |
// |
// ↓
// y（↓）

// ================
// Extent

export function extentLength(extent: Extent): number {
  return extent.end - extent.start;
}

export function newExtent(start: number, end: number): Extent {
  return {
    start: Math.min(start, end),
    end: Math.max(start, end),
  };
}

export function scalePolygon(polygon: Polygon, factor: number): Polygon {
  return polygon.map((p) => ({
    x: p.x * factor,
    y: p.y * factor,
  }));
}

export const extentOutline = (
  curve: Curve,
  view: View,
  extent: Extent,
  w: number,
  h: number,
): Polygon => {
  const scale = (w * h) / view.end;
  const view_start = Math.ceil((extent.start - view.start) * scale);
  const view_end = Math.ceil((extent.end - view.start) * scale) - 1;

  const oncurve = (x: Point): boolean => {
    if (x.x < 0 || x.y < 0) return false;
    if (x.x > w || x.y > h) return false;

    const v = curve.pointToOffset(x, w, h);
    return v >= view_start && v <= view_end;
  };

  let poly = constructPolygon(curve.offsetToPoint(view_start, w, h), oncurve);
  poly = trimPolygon(poly);
  // poly = outlinePolygon(poly);

  return poly;
};

// ================
// Point

export const pointEq = (a: Point, b: Point): boolean =>
  a.x === b.x && a.y === b.y;

export const pointSub = (a: Point, b: Point): Point => ({
  x: a.x - b.x,
  y: a.y - b.y,
});

export const neighbours = (p: Point): Polygon => [
  { x: p.x, y: p.y - 1 }, // up
  { x: p.x + 1, y: p.y }, // right
  { x: p.x, y: p.y + 1 }, // down
  { x: p.x - 1, y: p.y }, // left
];

export const rotate = <T>(arr: T[], n: number): T[] => {
  const len = arr.length;
  return arr.slice(n % len).concat(arr.slice(0, n % len));
};

export const rprev = <T>(arr: T[], i: number): T =>
  arr[(i - 1 + arr.length) % arr.length];
export const rnext = <T>(arr: T[], i: number): T => arr[(i + 1) % arr.length];

export const dir = (p: Point): string => {
  if (p.x === 1 && p.y === 0) return "r";
  if (p.x === -1 && p.y === 0) return "l";
  if (p.x === 0 && p.y === -1) return "u";
  if (p.x === 0 && p.y === 1) return "d";
  return "?"; // unexpected vector
};

export const nextPoint = (points: Polygon, oncurve: OnCurve): Point => {
  const p = points.find(oncurve);
  if (!p) throw new Error("This should never happen");
  return p;
};

// 多角形の始点を探す
export const findStart = (
  point: Point,
  oncurve: OnCurve,
): [Point, Point] | null => {
  let current = point;
  while (true) {
    const above = { x: current.x, y: current.y - 1 };
    if (oncurve(above)) {
      current = above;
    } else {
      const right = { x: current.x + 1, y: current.y };
      if (oncurve(right)) return [current, right];

      const down = { x: current.x, y: current.y + 1 };
      if (oncurve(down)) return [current, down];

      const left = { x: current.x - 1, y: current.y };
      if (oncurve(left)) return [current, left];

      return null;
    }
  }
};

export const constructPolygon = (
  startPoint: Point,
  oncurve: OnCurve,
): Polygon => {
  const start = findStart(startPoint, oncurve);
  if (!start) return [startPoint];

  let current: [Point, Point] = start;
  const polygon: Polygon = [];

  while (true) {
    const n = neighbours(current[1]);
    const i = n.findIndex((p) => pointEq(p, current[0]));
    const rotated = rotate(n, i + 1);
    const next: [Point, Point] = [current[1], nextPoint(rotated, oncurve)];
    polygon.push(next[1]);

    if (pointEq(next[0], start[0]) && pointEq(next[1], start[1])) break;
    current = next;
  }

  return polygon;
};

// 不要な中間点を取り除いて角だけを残す
export const trimPolygon = (points: Point[]): Point[] => {
  const result: Point[] = [];
  const nil = { x: 0, y: 0 };

  if (points.length < 2) return [...points];

  for (let i = 0; i < points.length; i++) {
    const prev = rprev(points, i);
    const next = rnext(points, i);
    const curr = points[i];

    const a = pointSub(curr, prev);
    const b = pointSub(next, curr);

    if (!pointEq(a, nil) && !pointEq(b, nil) && !pointEq(a, b)) {
      result.push(curr);
    }
  }

  return result;
};

export const outlinePolygon = (points: Polygon): Polygon => {
  if (points.length < 2) {
    const f = points[0];
    return [
      f,
      { x: f.x + 1, y: f.y },
      { x: f.x + 1, y: f.y + 1 },
      { x: f.x, y: f.y + 1 },
    ];
  }

  return points.flatMap((p, i) => {
    const prev = rprev(points, i);
    const next = rnext(points, i);

    const inDir = dir(pointSub(p, prev));
    const outDir = dir(pointSub(next, p));
    const corner = inDir + outDir;

    switch (corner) {
      // Outer corners
      case "rd":
        return [{ x: p.x + 1, y: p.y }];
      case "dl":
        return [{ x: p.x + 1, y: p.y + 1 }];
      case "lu":
        return [{ x: p.x, y: p.y + 1 }];
      case "ur":
        return [p];

      // Inner corners
      case "dr":
        return [{ x: p.x + 1, y: p.y }];
      case "ld":
        return [{ x: p.x + 1, y: p.y + 1 }];
      case "ul":
        return [{ x: p.x, y: p.y + 1 }];
      case "ru":
        return [p];

      // Single-pixel fingers
      case "ud":
        return [p, { x: p.x + 1, y: p.y }];
      case "rl":
        return [
          { x: p.x + 1, y: p.y },
          { x: p.x + 1, y: p.y + 1 },
        ];
      case "du":
        return [
          { x: p.x + 1, y: p.y + 1 },
          { x: p.x, y: p.y + 1 },
        ];
      case "lr":
        return [{ x: p.x, y: p.y + 1 }, p];

      default:
        throw new Error(`Unexpected corner direction: ${corner}`);
    }
  });
};

// ================
// Rect

export function createRect(
  x: number,
  y: number,
  w: number = 1,
  h: number = 1,
): Rect {
  return {
    point: { x, y },
    w,
    h,
  };
}

export function rectToString(rect: Rect): string {
  return `Rect(${rect.point.x}, ${rect.point.y}, ${rect.w}, ${rect.h})`;
}

export function scaleRect(rect: Rect, f: number): Rect {
  const sx = Math.floor(rect.point.x * f);
  const sy = Math.floor(rect.point.y * f);
  const sw = Math.ceil((rect.point.x + rect.w) * f) - sx;
  const sh = Math.ceil((rect.point.y + rect.h) * f) - sy;
  return createRect(sx, sy, sw, sh);
}

export function rectContains(rect: Rect, p: Point): boolean {
  return (
    p.x >= rect.point.x &&
    p.x < rect.point.x + rect.w &&
    p.y >= rect.point.y &&
    p.y < rect.point.y + rect.h
  );
}
