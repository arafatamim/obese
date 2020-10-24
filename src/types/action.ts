import { HistoryItem } from "./history";
import { Unit } from "./unit";

export enum ActionType {
  SetHeight,
  SetWeight,
  SetHistory,
  CalculateBMI,
  ClearHistory,
  SetUnit,
  ToggleModal,
}

interface SetHeightAction {
  type: ActionType.SetHeight;
  payload: number;
}
interface SetWeightAction {
  type: ActionType.SetWeight;
  payload: number;
}
interface CalculateBMIAction {
  type: ActionType.CalculateBMI;
  payload: { height: number; weight: number; unit: Unit };
}
interface SetHistoryAction {
  type: ActionType.SetHistory;
  payload: HistoryItem[];
}
interface ClearHistoryAction {
  type: ActionType.ClearHistory;
}
interface SetUnitAction {
  type: ActionType.SetUnit;
  payload: Unit;
}
interface ToggleModalAction {
  type: ActionType.ToggleModal;
}

export type Action =
  | SetHeightAction
  | SetWeightAction
  | CalculateBMIAction
  | SetHistoryAction
  | ClearHistoryAction
  | SetUnitAction
  | ToggleModalAction;
