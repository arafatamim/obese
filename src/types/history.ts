export interface HistoryItem {
  id: string;
  date: Date;
  weight: number;
  height: number;
  bmi: number;
  category: "underweight" | "normal" | "overweight" | "obese";
}
