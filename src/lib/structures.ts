import type { View, Point, Extent, Polygon } from "./types";
import type { Curve } from "./curve";

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
  return points;
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
  console.log(curve, view, extent, w, h);
  // const scale = (w * h) / view.len();
  // const view_start = Math.ceil((extent.start - view.start) * scale);
  // const view_end = Math.ceil((extent.end - view.start) * scale) - 1;

  // const oncurve = (x: Point): boolean => {
  //   if (x.x < 0 || x.y < 0) return false;
  //   if (x.x > w || x.y > h) return false;

  //   const v = curve.pointToOffset(x, w, h);
  //   return v >= view_start && v <= view_end;
  // };

  // let poly = Polygon.construct(
  //   curve.offsetToPoint(view_start, w, h),
  //   oncurve
  // );

  // poly = Polygon.trim(poly);
  // poly = Polygon.outline(poly, oncurve);

  const poly: Polygon = [];
  return poly;
};
