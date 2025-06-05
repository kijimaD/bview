import React from "react";
import type { View } from "../lib/types";
import { num } from "../lib/bytes";

interface HexRowProps {
  vOffset: number;
  dataBytes: Uint8Array;
  view: View;
  cursor: number | null;
  focusBlockLen: number;
}

export const HexRow: React.FC<HexRowProps> = ({
  vOffset,
  dataBytes,
  view,
  cursor,
  focusBlockLen,
}) => {
  const handleMouseOver = (
    e: MouseEvent<HTMLSpanElement>,
    vOffset: number,
  ) => {};

  const renderByte = (
    value: number,
    vOffset: number,
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
        key={vOffset}
        data-offset={vOffset}
        className={className}
        onMouseOver={(e) => handleMouseOver(e, vOffset)}
        onClick={() => handleClickByte(vOffset, ascii)}
      >
        {disp}
      </span>
    );
  };

  const bytes: React.ReactNode[] = [];
  const ascii: React.ReactNode[] = [];
  const end = vOffset + focusBlockLen;

  for (let i = vOffset; i < end; i++) {
    if (i === vOffset + focusBlockLen / 2) {
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

  const address = num(vOffset, 16, 7);

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
  // 縦のオフセット
  vOffset: number;
  // 横のオフセット
  wOffset: number;
}

export const HexView: React.FC<HexViewProps> = ({
  bytes,
  view,
  cursor,
  vOffset,
}) => {
  let lines = [];
  for (var i = 0; i < vOffset; i++) {
    lines.push(
      <HexRow
        vOffset={i}
        dataBytes={bytes}
        view={view}
        cursor={cursor}
        focusBlockLen={1}
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
                    <th>hex, dec</th>
                    <th></th>
                    <th></th>
                  </tr>
                  {lines}
                </tbody>
              </table>
            </td>
            <td className="scrollbar">scroll bar</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
