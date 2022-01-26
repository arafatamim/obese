import { HistoryItem, State } from "../types";
import { Action, ActionType } from "../types/action";
import { calculateBMI, convertUnit } from "../utils";

export const storeReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.SetHeight:
      return {
        ...state,
        height: action.payload,
      };
    case ActionType.SetWeight:
      return {
        ...state,
        weight: action.payload,
      };
    case ActionType.CalculateBMI:
      const [bmi, category] = calculateBMI(
        action.payload.height,
        action.payload.weight,
        action.payload.unit,
      );
      return {
        ...state,
        bmi,
        category,
      };
    // (state, dispatch) => {
    //   dispatch({
    //     type: ActionType.SetHistory,
    //     payload: [
    //       {
    //         id: nanoid(3),
    //         date: new Date().toLocaleDateString(),
    //         height: state.height,
    //         weight: state.weight,
    //         bmi: state.bmi,
    //         category: state.category,
    //       },
    //       ...state.history,
    //     ],
    //   });
    // },

    case ActionType.SetHistory:
      return {
        ...state,
        history: [action.payload, ...state.history],
      };
    case ActionType.ClearHistory:
      return {
        ...state,
        history: [],
      };
    case ActionType.SetUnit:
      return {
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
      };
    case ActionType.ToggleModal:
      return {
        ...state,
        modalIsOpen: !state.modalIsOpen,
      };
    case ActionType.ToggleAboutDialog:
      return {
        ...state,
        aboutModal: !state.aboutModal,
      };
    default:
      return state;
  }
};
