import React, { useContext } from "react";

import { GridContainer } from "../components/UI/Container";
import { CardWithCounter } from "../components/UI/Card";
import { TextButton } from "../components/UI/Button";
import Result from "../components/Result";

import { ReactComponent as Height } from "../assets/height.svg";
import { ReactComponent as Weight } from "../assets/weight.svg";
import { motion } from "framer-motion";
import { StoreContext } from "../store/StoreContext";
import { ActionType, Unit } from "../types";
import { getSliderProps } from "../utils";

const Inputs: React.FC = () => {
  const [state, dispatch] = useContext(StoreContext);

  const buttonClick = () => {
    dispatch({
      type: ActionType.CalculateBMI,
      payload: {
        height: state.height,
        weight: state.weight,
        unit: state.unit,
      },
    });

    dispatch({ type: ActionType.ToggleModal });
  };

  return (
    <motion.div
      initial={{ y: -200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}>
      <GridContainer>
        <CardWithCounter
          id="height"
          style={{ gridArea: "height" }}
          title="Height"
          value={state.height}
          {...getSliderProps("height", state.unit)}
          unit={state.unit === Unit.Metric ? "cm" : "ft"}
          icon={<Height width={50} fill="#222" />}
          onChange={(e) => {
            dispatch({
              type: ActionType.SetHeight,
              payload: Number(e.target.value),
            });
          }}
        />
        <CardWithCounter
          id="weight"
          style={{ gridArea: "weight" }}
          title="Weight"
          value={state.weight}
          {...getSliderProps("weight", state.unit)}
          unit={state.unit === Unit.Metric ? "kg" : "lbs"}
          icon={<Weight width={50} fill="#222" />}
          onChange={(e) => {
            dispatch({
              type: ActionType.SetWeight,
              payload: Number(e.target.value),
            });
          }}
        />
        <TextButton
          style={{
            gridArea: "calculate",
          }}
          onClick={buttonClick}>
          Calculate BMI
        </TextButton>
        <Result />
      </GridContainer>
    </motion.div>
  );
};

export default Inputs;
