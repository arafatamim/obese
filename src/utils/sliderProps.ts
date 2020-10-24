import { Unit } from "../types";

function minHeight(unit: Unit) {
  if (unit === Unit.Metric) return 80;
  else return 3;
}
function maxHeight(unit: Unit) {
  if (unit === Unit.Metric) return 230;
  else return 7.5;
}
function minWeight(unit: Unit) {
  if (unit === Unit.Metric) return 40;
  else return 90;
}
function maxWeight(unit: Unit) {
  if (unit === Unit.Metric) return 180;
  else return 380;
}
function stepValueHeight(unit: Unit) {
  if (unit === Unit.Metric) return 1;
  else return 0.05;
}
function stepValueWeight() {
  return 1;
}

export function getSliderProps(type: "height" | "weight", unit: Unit) {
  if (type === "height")
    return {
      min: minHeight(unit),
      max: maxHeight(unit),
      step: stepValueHeight(unit),
    };
  else
    return {
      min: minWeight(unit),
      max: maxWeight(unit),
      step: stepValueWeight(),
    };
}
