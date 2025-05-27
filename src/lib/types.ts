export type Point = {
  x: number;
  y: number;
};

export type Extent = {
  start: number;
  end: number;
};

export type Polygon = Point[];

export type View = {
  start: number;
  len: () => number;
};

export type OnCurve = (p: Point) => boolean;
