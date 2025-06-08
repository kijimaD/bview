export type Point = {
  x: number;
  y: number;
};

export type Extent = {
  start: number;
  end: number;
};

export type Polygon = Point[];

// 表示中の範囲。未実装
export type View = {
  start: number;
  end: number;
  len: () => number;
};

export type OnCurve = (p: Point) => boolean;

export type Rect = {
  point: Point;
  w: number;
  h: number;
};
