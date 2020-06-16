export enum Unit {
  Metric,
  US,
}
export interface IHistoryItem {
  id: string;
  date: string;
  weight: number;
  height: number;
  bmi: number;
  category: "underweight" | "normal" | "overweight" | "obese";
}
