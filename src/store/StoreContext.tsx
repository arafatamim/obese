import React, { createContext, Dispatch, useReducer } from "react";
import { State, HistoryItem } from "../types";
import { Action } from "../types/action";
import { storeReducer } from "./storeReducer";

function getLastItem(): HistoryItem | undefined {
  return (
    JSON.parse(window.localStorage.getItem("history") ?? "[]") as HistoryItem[]
  )[0];
}

const initialState: State = {
  modalIsOpen: false,
  aboutModal: false,
  unit: JSON.parse(window.localStorage.getItem("unit") ?? "0"),
  height: getLastItem()?.height ?? 160,
  weight: getLastItem()?.weight ?? 60,
  bmi: getLastItem()?.bmi ?? 23.4,
  category: getLastItem()?.category ?? "normal",
  history: JSON.parse(window.localStorage.getItem("history") ?? "[]"),
};

export const StoreContext = createContext<[State, Dispatch<Action>]>([
  initialState,
  (e) => e,
]);

const StoreProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
