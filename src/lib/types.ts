export type Point = {
  x: number;
  y: number;
};

export type Extent = {
  start: number;
  end: number;
};

export type Polygon = Point[];

// 見る範囲
export type View = {
  start: number;
  len: () => number;
};

export type OnCurve = (p: Point) => boolean;

export type Rect = {
  point: Point;
  w: number;
  h: number;
};
