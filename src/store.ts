import {
  observable,
  action,
  computed,
  intercept,
  observe,
  values,
  reaction,
} from "mobx";
import { IHistoryItem, Unit } from "./types";

class Store {
  appName = "Obese";

  @observable isModalOpen = false;

  @observable unit = Unit.Metric;
  @observable height = 160;
  @observable weight = 60;
  @observable history: IHistoryItem[] = [];

  @action
  setHeight(value: number) {
    this.height = value;
  }
  @action
  setWeight(value: number) {
    this.weight = value;
  }
  @action
  clearHistory() {
    this.history = [];
  }
  @action
  setHistory(items: IHistoryItem[]) {
    this.history = items;
  }

  setDefault() {
    if (this.unit === Unit.US) {
      this.height = 5.2;
      this.weight = 132;
    } else {
      this.height = 160;
      this.weight = 60;
    }
  }

  @action
  convertUnit(unit: Unit) {
    this.unit = unit;
    this.history = this.history.map<IHistoryItem>((item) => ({
      id: item.id,
      bmi: item.bmi,
      category: item.category,
      date: item.date,
      height: this.convertHeight(item.height, unit),
      weight: this.convertWeight(item.weight, unit),
    }));
    this.setDefault();
    localStorage.setItem("history", JSON.stringify(this.history));
    localStorage.setItem("unit", unit.toString());
  }

  convertHeight(height: number, unit: Unit): number {
    switch (unit) {
      case Unit.Metric:
        return parseFloat((height * 30.48).toFixed(2));
      case Unit.US:
        return parseFloat((height / 30.48).toFixed(1));
    }
  }
  convertWeight(weight: number, unit: Unit): number {
    switch (unit) {
      case Unit.Metric:
        return parseFloat((weight / 2.205).toFixed());
      case Unit.US:
        return parseFloat((weight * 2.205).toFixed());
    }
  }

  @computed get calculateBMI(): number {
    if (this.unit === Unit.Metric) {
      return parseFloat(((this.weight / this.height ** 2) * 10000).toFixed(1));
    } else {
      return parseFloat(
        (703 * (this.weight / (this.height * 12) ** 2)).toFixed(1)
      );
    }
  }
  @computed get bmiGroup() {
    let bmi = store.calculateBMI;
    if (bmi < 18.5) return "underweight";
    else if (bmi <= 24.9 && bmi >= 18.5) return "normal";
    else if (bmi <= 29.9 && bmi >= 25) return "overweight";
    else return "obese";
  }
  @computed get heightUnit() {
    if (this.unit === Unit.Metric) return "cm";
    else return "ft";
  }
  @computed get weightUnit() {
    if (this.unit === Unit.Metric) return "kg";
    else return "lbs";
  }
  @computed get minHeight() {
    if (this.unit === Unit.Metric) return 80;
    else return 3;
  }
  @computed get maxHeight() {
    if (this.unit === Unit.Metric) return 230;
    else return 7.5;
  }
  @computed get minWeight() {
    if (this.unit === Unit.Metric) return 40;
    else return 90;
  }
  @computed get maxWeight() {
    if (this.unit === Unit.Metric) return 180;
    else return 380;
  }
  @computed get stepValueHeight() {
    if (this.unit === Unit.Metric) return 1;
    else return 0.05;
  }
  @computed get stepValueWeight() {
    return 1;
  }
}

export const store = new Store();
