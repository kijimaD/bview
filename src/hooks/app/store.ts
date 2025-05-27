export type AppState = {
  fileName: string | null;
  bytes: Uint8Array | null;
};

export const initialState: AppState = {
  fileName: null,
  bytes: null,
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
      };
    case "CLEAR_FILE":
      return initialState;
    default:
      return state;
  }
}
