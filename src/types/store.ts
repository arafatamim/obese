import type { Category } from "./category";
import { HistoryItem } from "./history";
import { Unit } from "./unit";

export type State = {
  modalIsOpen: boolean;
  aboutModal: boolean;
  unit: Unit;
  height: number;
  weight: number;
  bmi: number;
  category: Category;
  history: HistoryItem[];
};
