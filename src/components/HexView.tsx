import React from "react";
import type { View } from "../lib/types";
import { num } from "../lib/bytes";
import { useAppContext } from "../hooks/app/AppContext";

interface HexRowProps {
  offset: number;
  dataBytes: Uint8Array;
  view: View;
  cursor: number | null;
  hover: number | null;
  width: number;
}

const HexRow: React.FC<HexRowProps> = ({
  offset,
  dataBytes,
  view,
  cursor,
  width,
  hover,
}) => {
  const { dispatch } = useAppContext();
  const handleMouseClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    const offsetStr = e.currentTarget.dataset.offset;
    if (offsetStr !== undefined) {
      dispatch({
        type: "SET_CURSOR",
        payload: { cursor: parseInt(offsetStr, 10) },
      });
    }
  };
  const handleMouseOver = (e: React.MouseEvent<HTMLSpanElement>) => {
    const offsetStr = e.currentTarget.dataset.offset;
    if (offsetStr !== undefined) {
      dispatch({
        type: "SET_HOVER",
        payload: { hover: parseInt(offsetStr, 10) },
      });
    }
  };

  const renderByte = (
    value: number,
    offset: number,
    ascii: boolean,
    selected: boolean,
    hovered: boolean,
  ) => {
    const classNameSelected = selected ? "selected" : "";
    const classNameHovered = hovered ? "hovered" : "";
    const disp = ascii
      ? value >= 32 && value <= 126
        ? String.fromCharCode(value)
        : "."
      : num(value, 16, 2);

    return (
      <span
        key={offset}
        data-offset={offset}
        className={`${classNameSelected} ${classNameHovered}`}
        onClick={handleMouseClick}
        onMouseOver={handleMouseOver}
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
      bytes.push(renderByte(value, i, false, cursor === i, hover === i));
      ascii.push(renderByte(value, i, true, cursor === i, hover === i));
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
  hover: number;
}

export const HexView: React.FC<HexViewProps> = ({
  bytes,
  view,
  cursor,
  hover,
  width,
  height,
}) => {
  const lines = [];

  const centerLine = Math.floor(height / 2);
  const startOffset = cursor - centerLine * width;
  const minOffset = Math.max(view.start, 0);
  const maxOffset = Math.max(view.end - height * width, 0);
  const clampedOffset = Math.min(Math.max(startOffset, minOffset), maxOffset);

  // 縦のループ
  for (let i = 0; i < height; i++) {
    lines.push(
      <HexRow
        dataBytes={bytes}
        view={view}
        cursor={cursor}
        hover={hover}
        key={clampedOffset + i * width + i}
        offset={clampedOffset + i * width + i}
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
