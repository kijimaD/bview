import React from "react";

import { num } from "../lib/bytes";

interface HexRowProps {
  offset: number;
  dataBytes: Uint8Array;
  view: { start: number; end: number };
  cursor: number | null;
  focusBlockLen: number;
  offsetDecimal: boolean;
}

const HexRow: React.FC<HexRowProps> = ({
  offset,
  dataBytes,
  view,
  cursor,
  focusBlockLen,
  offsetDecimal,
}) => {
  const handleMouseOver = (
    e: MouseEvent<HTMLSpanElement>,
    offset: number,
  ) => {};

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
        onMouseOver={(e) => handleMouseOver(e, offset)}
        onClick={() => handleClickByte(offset, ascii)}
      >
        {disp}
      </span>
    );
  };

  const bytes: React.ReactNode[] = [];
  const ascii: React.ReactNode[] = [];
  const end = offset + focusBlockLen;

  for (let i = offset; i < end; i++) {
    if (i === offset + focusBlockLen / 2) {
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

  const hoff = offsetDecimal ? num(offset, 10, 7) : num(offset, 16, 7);

  return (
    <tr>
      <td className="offset">{hoff}</td>
      <td className="bytes">{bytes}</td>
      <td className="ascii">{ascii}</td>
    </tr>
  );
};

interface HexViewProps {
  dataBytes: Uint8Array;
  view: { start: number; end: number };
  focus: { start: number; within: (offset: number) => boolean };
  cursor: number;
  focusBlockLen: number;
  focusBlocks: number;
  offsetDecimal: boolean;
}

export const HexView: React.FC<HexViewProps> = ({
  dataBytes,
  view,
  focus,
  cursor,
  focusBlockLen,
  focusBlocks,
  offsetDecimal,
}) => {
  const handleWheel = (evt: WheelEvent) => {};

  const handleMouseLeave = () => {};

  const scrollUpdate = (offset: number) => {};

  const lines = Array.from({ length: focusBlocks }, (_, i) => {
    const blockOffset =
      Math.floor((focus.start + i * focusBlockLen) / focusBlockLen) *
      focusBlockLen;
    const key = `${Math.max(view.start, blockOffset)}-${Math.min(view.end, blockOffset + focusBlockLen)}`;

    return (
      <HexRow
        key={key}
        offset={blockOffset}
        dataBytes={dataBytes}
        view={view}
        cursor={
          cursor >= blockOffset && cursor < blockOffset + focusBlockLen
            ? cursor
            : null
        }
        focusBlockLen={focusBlockLen}
        offsetDecimal={offsetDecimal}
      />
    );
  });

  return (
    <div className="hexview">
      <table className="spacertable">
        <tbody>
          <tr>
            <td className="textarea">
              <table onMouseLeave={handleMouseLeave}>
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
