export function num(n: number, base: number, width: number): string {
  let v = n.toString(base);
  while (v.length < width) v = "0" + v;
  return v;
}
