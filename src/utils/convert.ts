import { Unit } from "../types";

export function convertUnit(
  type: "height" | "weight",
  value: number,
  unit: Unit,
): number {
  switch (type) {
    case "height":
      switch (unit) {
        case Unit.Metric:
          return Number((value * 30.48).toFixed(1));
        case Unit.US:
          return Number((value / 30.48).toFixed(1));
      }
      break;
    case "weight":
      switch (unit) {
        case Unit.Metric:
          return Number((value / 2.205).toFixed(1));
        case Unit.US:
          return Number((value * 2.205).toFixed(2));
      }
  }
}
