import { Category, Unit } from "../types";

export function calculateBMI(
  height: number,
  weight: number,
  unit: Unit,
): [number, Category] {
  if (unit === Unit.Metric) {
    const bmi = parseFloat(((weight / height ** 2) * 10000).toFixed(1));
    return [bmi, getBMICategory(bmi)];
  } else {
    const bmi = parseFloat((703 * (weight / (height * 12) ** 2)).toFixed(1));
    return [bmi, getBMICategory(bmi)];
  }
}

export function getBMICategory(bmi: number) {
  if (bmi < 18.5) return "underweight";
  else if (bmi <= 24.9 && bmi >= 18.5) return "normal";
  else if (bmi <= 29.9 && bmi >= 25) return "overweight";
  else return "obese";
}
