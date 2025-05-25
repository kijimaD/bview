import { extentLength, newPolygon, scalePolygon } from "./structures";
import type { Polygon, Point } from "./types";

test("extentLength", () => {
  expect(extentLength({ start: 1, end: 2 })).toBe(1);
  expect(extentLength({ start: 1, end: 10 })).toBe(9);
  expect(extentLength({ start: 10, end: 2 })).toBe(-8);
});

test("newPolygon", () => {
  {
    const input: Point[] = [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
    ];
    const expected: Polygon = {
      points: [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
      ],
    };
    expect(newPolygon(input)).toStrictEqual(expected);
  }
})

describe('scalePolygon', () => {
  it('スケールできる', () => {
    const input: Polygon = {
      points: [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: -1, y: -1 },
      ],
    };
    const expected: Polygon = {
      points: [
        { x: 2, y: 2 },
        { x: 4, y: 4 },
        { x: -2, y: -2 },
      ],
    };

    expect(scalePolygon(input, 2)).toEqual(expected);
  });

  it('0にスケールできる', () => {
    const input: Polygon = {
      points: [
        { x: 1, y: 1 },
        { x: 5, y: 3 },
      ],
    };
    const expected: Polygon = {
      points: [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
      ],
    };

    expect(scalePolygon(input, 0)).toEqual(expected);
  });

  it('空配列の場合変わらない', () => {
    const input: Polygon = { points: [] };
    const expected: Polygon = { points: [] };

    expect(scalePolygon(input, 5)).toEqual(expected);
  });
});
