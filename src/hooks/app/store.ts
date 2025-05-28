import type { View } from "../../lib/types";

export type AppState = {
  fileName: string | null;
  bytes: Uint8Array | null;
  view: View;
};

export const initialState: AppState = {
  fileName: null,
  bytes: null,
  view: {
    start: 0,
    len: (): number => {
      return 0;
    },
  },
};

export type Action =
  | { type: "LOAD_FILE"; payload: { fileName: string; bytes: Uint8Array } }
  | { type: "CLEAR_FILE" };

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "LOAD_FILE":
      return {
        ...state,
        fileName: action.payload.fileName,
        bytes: action.payload.bytes,
        view: {
          start: 0,
          len: (): number => {
            return action.payload.bytes.length;
          },
        },
      };
    case "CLEAR_FILE":
      return initialState;
    default:
      return state;
  }
}
