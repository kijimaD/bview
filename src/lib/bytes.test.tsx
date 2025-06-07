import { num } from "./bytes";

test("num", () => {
  expect(num(1, 16, 2)).toBe("01");
  expect(num(10, 16, 2)).toBe("0a");
  expect(num(10, 2, 4)).toBe("1010");
});
