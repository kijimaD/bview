import React, { createContext, useContext } from "react";
import type { AppState, Action } from "./store";

type AppContextType = {
  state: AppState;
  dispatch: React.Dispatch<Action>;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
};
