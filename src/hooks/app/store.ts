import type { View } from "../../lib/types";

export type AppState = {
  // ファイル名
  fileName: string | null;
  // 読み込んでいるデータ
  bytes: Uint8Array | null;
  // 表示中の領域(ほぼ未実装)
  view: View;
  // データ表示の中心となる位置(読み込み中のデータに対するオフセット)。カメラ位置のようなもの
  cursor: number;
  // ホバーして強調表示する位置(読み込み中のデータに対するオフセット)
  hover: number;
  // 1バイト分を描画するスケール
  byteDrawScale: number;
};

export const initialState: AppState = {
  fileName: null,
  bytes: null,
  view: {
    start: 0,
    end: 0,
  },
  cursor: 0,
  hover: 0,
  byteDrawScale: 1.0,
};

export type Action =
  | { type: "LOAD_FILE"; payload: { fileName: string; bytes: Uint8Array } }
  | { type: "CLEAR_FILE" }
  | { type: "SET_CURSOR"; payload: { cursor: number } }
  | { type: "SET_HOVER"; payload: { hover: number } };

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
        },
        cursor: 0,
        hover: 0,
      };
    case "CLEAR_FILE":
      return initialState;
    case "SET_CURSOR":
      return {
        ...state,
        cursor: action.payload.cursor,
      };
    case "SET_HOVER":
      return {
        ...state,
        hover: action.payload.hover,
      };
    default:
      return state;
  }
}
