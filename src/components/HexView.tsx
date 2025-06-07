import React from "react";
import type { View } from "../lib/types";
import { num } from "../lib/bytes";
import { useAppContext } from "../hooks/app/AppContext";

interface HexRowProps {
  vOffset: number;
  dataBytes: Uint8Array;
  view: View;
  cursor: number | null;
  width: number;
}

const HexRow: React.FC<HexRowProps> = ({
  vOffset,
  dataBytes,
  view,
  cursor,
  width,
}) => {
  const { dispatch } = useAppContext();
  const handleMouseOver = (e: React.MouseEvent<HTMLSpanElement>) => {
    const offsetStr = e.currentTarget.dataset.offset;
    if (offsetStr !== undefined) {
      dispatch({
        type: "SET_CURSOR",
        payload: { cursor: parseInt(offsetStr, 10) },
      });
    }
  };

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
        onMouseOver={handleMouseOver}
        onClick={() => {}}
      >
        {disp}
      </span>
    );
  };

  const bytes: React.ReactNode[] = [];
  const ascii: React.ReactNode[] = [];
  const end = vOffset + width;

  for (let i = vOffset; i < end; i++) {
    if (i === vOffset + width / 2) {
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
  width: number;
}

export const HexView: React.FC<HexViewProps> = ({
  bytes,
  view,
  cursor,
  vOffset,
  width,
}) => {
  const lines = [];
  // 縦のループ
  for (let i = 0; i < vOffset; i++) {
    // オフセット
    // 1行目: 0
    // 2行目: 20
    // 3行目: 40
    // というようになる
    const offset = i * width;
    lines.push(
      <HexRow
        dataBytes={bytes}
        view={view}
        cursor={cursor}
        vOffset={offset}
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
