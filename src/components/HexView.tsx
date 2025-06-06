import React from "react";
import type { View } from "../lib/types";
import { num } from "../lib/bytes";

interface HexRowProps {
  offset: number;
  dataBytes: Uint8Array;
  view: View;
  cursor: number | null;
  width: number;
}

const HexRow: React.FC<HexRowProps> = ({
  offset,
  dataBytes,
  view,
  cursor,
  width,
}) => {
  const renderByte = (
    value: number,
    offset: number,
    ascii: boolean,
    selected: boolean,
  ) => {
    const className = selected ? "selected" : "";
    const disp = ascii
      ? value >= 32 && value <= 126
        ? String.fromCharCode(value)
        : "."
      : num(value, 16, 2);

    return (
      <span
        key={offset}
        data-offset={offset}
        className={className}
        onMouseOver={() => {}}
        onClick={() => {}}
      >
        {disp}
      </span>
    );
  };

  const bytes: React.ReactNode[] = [];
  const ascii: React.ReactNode[] = [];
  const end = offset + width;

  for (let i = offset; i < end; i++) {
    if (i === offset + width / 2) {
      bytes.push(<span key={`brk${i}`} />);
      ascii.push(<span key={`brk${i}`}> </span>);
    }
    if (i < view.start || i >= view.end) {
      bytes.push(<span key={i}> </span>);
      ascii.push(<span key={i}> </span>);
    } else {
      const value = dataBytes[i];
      bytes.push(renderByte(value, i, false, cursor === i));
      ascii.push(renderByte(value, i, true, cursor === i));
    }
  }

  const address = num(offset, 16, 7);

  return (
    <tr>
      <td className="address">{address}</td>
      <td className="bytes">{bytes}</td>
      <td className="ascii">{ascii}</td>
    </tr>
  );
};

interface HexViewProps {
  bytes: Uint8Array;
  view: View;
  cursor: number;
  width: number;
  height: number;
}

export const HexView: React.FC<HexViewProps> = ({
  bytes,
  view,
  cursor,
  width,
  height,
}) => {
  const lines = [];
  // 縦のループ
  for (let i = 0; i < height; i++) {
    // オフセット
    // 1行目: 0
    // 2行目: 20
    // 3行目: 40
    // というようになる
    lines.push(
      <HexRow
        dataBytes={bytes}
        view={view}
        cursor={cursor}
        offset={cursor + i * width}
        width={width}
      />,
    );
  }

  return (
    <div className="hexview">
      <table className="spacertable">
        <tbody>
          <tr>
            <td className="textarea">
              <table>
                <tbody>
                  <tr>
                    <th></th>
                    <th></th>
                  </tr>
                  {lines}
                </tbody>
              </table>
            </td>
            <td className="scrollbar"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
