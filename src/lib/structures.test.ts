import {
  rotate,
  extentLength,
  scalePolygon,
  newExtent,
  pointEq,
  neighbours,
  dir,
  pointSub,
  outlinePolygon,
} from "./structures";
import type { Point, Polygon, Extent } from "./types";

test("extentLength", () => {
  expect(extentLength({ start: 1, end: 2 })).toBe(1);
  expect(extentLength({ start: 1, end: 10 })).toBe(9);
  expect(extentLength({ start: 10, end: 2 })).toBe(-8);
});

describe("newExtent", () => {
  it("初期化できる", () => {
    const input = { start: 1, end: 4 };
    const expected: Extent = { start: 1, end: 4 };

    expect(newExtent(input.start, input.end).start).toEqual(expected.start);
    expect(newExtent(input.start, input.end).end).toEqual(expected.end);
  });

  it("大小が逆でも正しく変換される", () => {
    const input = { start: 4, end: 1 };
    const expected: Extent = { start: 1, end: 4 };

    expect(newExtent(input.start, input.end)).toEqual(expected);
  });
});

describe("scalePolygon", () => {
  it("スケールできる", () => {
    const input: Polygon = [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: -1, y: -1 },
    ];
    const expected: Polygon = [
      { x: 2, y: 2 },
      { x: 4, y: 4 },
      { x: -2, y: -2 },
    ];

    expect(scalePolygon(input, 2)).toEqual(expected);
  });

  it("0にスケールできる", () => {
    const input: Polygon = [
      { x: 1, y: 1 },
      { x: 5, y: 3 },
    ];
    const expected: Polygon = [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ];

    expect(scalePolygon(input, 0)).toEqual(expected);
  });

  it("空配列の場合変わらない", () => {
    const input: Polygon = [];
    const expected: Polygon = [];

    expect(scalePolygon(input, 5)).toEqual(expected);
  });
});

test("pointEq", () => {
  const inputA: Point = { x: 1, y: 2 };
  const inputB: Point = { x: 1, y: 2 };
  const inputC: Point = { x: 3, y: 4 };

  expect(pointEq(inputA, inputB)).toEqual(true);
  expect(pointEq(inputA, inputC)).toEqual(false);
});

describe("neighbours", () => {
  it("取得できる", () => {
    const input: Point = { x: 1, y: 2 };
    const expected: Point[] = [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 1, y: 3 },
      { x: 0, y: 2 },
    ];
    expect(neighbours(input)).toEqual(expected);
  });
});

describe("rotate", () => {
  it("入れ替えできる", () => {
    const input: Polygon = [
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 1, y: 3 },
    ];
    const expected: Polygon = [
      { x: 1, y: 3 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
    ];
    expect(rotate(input, 2)).toEqual(expected);
  });
  it("numberでも使える", () => {
    const input: number[] = [1, 2, 3, 4, 5];
    const expected: number[] = [3, 4, 5, 1, 2];
    expect(rotate(input, 2)).toEqual(expected);
  });
});

describe("dir", () => {
  it("方向を返す", () => {
    {
      // A
      // B
      const input = pointSub({ x: 1, y: 1 }, { x: 1, y: 2 });
      expect(dir(input)).toEqual("u");
    }
    {
      // A B
      const input = pointSub({ x: 1, y: 1 }, { x: 2, y: 1 });
      expect(dir(input)).toEqual("l");
    }
  });
});

describe("outlinePolygon", () => {
  it("枠を返す", () => {
    expect(
      outlinePolygon([
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ]),
    ).toEqual([
      { x: 1, y: 2 },
      { x: 1, y: 1 },
      { x: 3, y: 1 },
      { x: 3, y: 2 },
    ]);
  });
  it("error", () => {
    expect(
      outlinePolygon([
        { x: 1, y: 1 },
        { x: 3, y: 1 },
      ]),
    ).toEqual([
      { x: 1, y: 2 },
      { x: 1, y: 1 },
      { x: 3, y: 1 },
      { x: 3, y: 2 },
    ]);
  });
});
