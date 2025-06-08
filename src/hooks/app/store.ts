import type { View } from "../../lib/types";

export type AppState = {
  fileName: string | null;
  bytes: Uint8Array | null;
  view: View;
  cursor: number;
  byteDrawScale: number;
};

export const initialState: AppState = {
  fileName: null,
  bytes: null,
  view: {
    start: 0,
    end: 0,
    len: (): number => {
      return 0;
    },
  },
  cursor: 0,
  byteDrawScale: 1.0,
};

export type Action =
  | { type: "LOAD_FILE"; payload: { fileName: string; bytes: Uint8Array } }
  | { type: "CLEAR_FILE" }
  | { type: "SET_CURSOR"; payload: { cursor: number } };

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "LOAD_FILE":
      return {
        ...state,
        fileName: action.payload.fileName,
        bytes: action.payload.bytes,
        view: {
          // TODO: 値を設定する
          start: 0,
          end: action.payload.bytes.length,
          len: (): number => {
            return action.payload.bytes.length;
          },
        },
        cursor: 0,
      };
    case "CLEAR_FILE":
      return initialState;
    case "SET_CURSOR":
      return {
        ...state,
        cursor: action.payload.cursor,
      };
    default:
      return state;
  }
}
