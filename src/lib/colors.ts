export type ColorScheme = {
  name: string;
  description: string;
  keys: [string, string][];
  colorValue: (uint: number) => string;
  color: (offset: number, bytes: Uint8Array) => string;
};

export const ByteClass: ColorScheme = {
  name: "byteclass",
  description: "simple byte color",
  keys: [
    ["0x00", "#000000"],
    ["low", "#4daf4a"],
    ["ascii", "#1072b8"],
    ["high", "#e41a1c"],
    ["0xff", "#ffffff"],
  ],
  colorValue(c: number): string {
    const ascii = "#1072b8";
    const nul = "#000000";
    const ff = "#ffffff";
    const ctl = "#4daf4a";
    const high = "#e41a1c";

    if (c === 0) return nul;
    else if (c == 255) return ff;
    else if (c >= 32 && c <= 126) return ascii;
    else if (c == 9 || c == 10 || c == 13) return ascii;
    else if (c < 32) return ctl;
    return high;
  },
  color(offset: number, bytes: Uint8Array): string {
    const c = bytes[offset];
    return this.colorValue(c); // ✅ OK: this は ByteClass を指す
  },
};
