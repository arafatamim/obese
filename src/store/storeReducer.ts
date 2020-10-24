import { HistoryItem, State } from "../types";
import { Action, ActionType } from "../types/action";
import { calculateBMI, convertUnit } from "../utils";
import { UpdateWithSideEffect, Update } from "use-reducer-with-side-effects";
import { nanoid } from "nanoid";

export const storeReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.SetHeight:
      return Update({
        ...state,
        height: action.payload,
      });
    case ActionType.SetWeight:
      return Update({
        ...state,
        weight: action.payload,
      });
    case ActionType.CalculateBMI:
      const [bmi, category] = calculateBMI(
        action.payload.height,
        action.payload.weight,
        action.payload.unit,
      );
      // return {
      //   ...state,
      //   bmi,
      //   category,
      // };
      return UpdateWithSideEffect<State, Action>(
        { ...state, bmi, category },
        (state, dispatch) => {
          dispatch({
            type: ActionType.SetHistory,
            payload: [
              {
                id: nanoid(3),
                date: new Date().toLocaleDateString(),
                height: state.height,
                weight: state.weight,
                bmi: state.bmi,
                category: state.category,
              },
              ...state.history,
            ],
          });
        },
      );
    case ActionType.SetHistory:
      return Update({
        ...state,
        history: action.payload,
      });
    case ActionType.ClearHistory:
      return Update({
        ...state,
        history: [],
      });
    case ActionType.SetUnit:
      return Update({
        ...state,
        height: convertUnit("height", state.height, action.payload),
        weight: convertUnit("weight", state.weight, action.payload),
        history: state.history.map<HistoryItem>((item) => {
          return {
            ...item,
            height: convertUnit("height", item.height, action.payload),
            weight: convertUnit("weight", item.weight, action.payload),
          };
        }),
        unit: action.payload,
      });
    case ActionType.ToggleModal:
      return Update({
        ...state,
        modalIsOpen: !state.modalIsOpen,
      });
    // default:
    //   throw new Error("Unsupported action type");
  }
};
