import React, { Component } from "react";
import { store } from "../store";
import { observer } from "mobx-react";
import { RouteComponentProps } from "@reach/router";
import shortid from "shortid";

import { GridContainer } from "../components/UI/Container";
import { CardWithCounter } from "../components/UI/Card";
import { TextButton } from "../components/UI/Button";
import Result from "../components/Result";

import { ReactComponent as Height } from "../assets/height.svg";
import { ReactComponent as Weight } from "../assets/weight.svg";

@observer
class Inputs extends Component<RouteComponentProps> {
  buttonClick = () => {
    store.isModalOpen = true;

    const date = new Date();
    const height = store.height;
    const weight = store.weight;
    const bmi = store.calculateBMI;
    const category = store.bmiGroup;

    store.history.unshift({
      id: shortid.generate(),
      date: date.toLocaleDateString(),
      height,
      weight,
      bmi,
      category
    });
    localStorage.setItem("history", JSON.stringify(store.history));
  };

  render() {
    return (
      <GridContainer>
        <CardWithCounter
          style={{ gridArea: "height" }}
          title="Height"
          value={store.height}
          min={store.minHeight}
          max={store.maxHeight}
          step={store.stepValueHeight}
          unit={store.heightUnit}
          icon={<Height width={50} fill="#222" />}
          onChange={e => {
            store.setHeight(Number(e.target.value));
          }}
        />
        <CardWithCounter
          style={{ gridArea: "weight" }}
          title="Weight"
          value={store.weight}
          min={store.minWeight}
          max={store.maxWeight}
          step={store.stepValueWeight}
          unit={store.weightUnit}
          icon={<Weight width={50} fill="#222" />}
          onChange={e => {
            store.setWeight(Number(e.target.value));
          }}
        />
        <TextButton
          style={{
            gridArea: "calculate"
          }}
          onClick={this.buttonClick}
        >
          Calculate BMI
        </TextButton>
        <Result />
      </GridContainer>
    );
  }
}

export default Inputs;
