
export interface HistoryItem {
  id: string;
  date: string;
  weight: number;
  height: number;
  bmi: number;
  category: "underweight" | "normal" | "overweight" | "obese";
}