export function num(n: number, base: number, width: number): string {
  var v = n.toString(base);
  while (v.length < width) v = "0" + v;
  return v;
}
