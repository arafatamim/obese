import React, { useContext } from "react";
import Modal from "react-modal";
import { StoreContext } from "../store/StoreContext";
import { ActionType } from "../types";
import "./Result.scss";

Modal.setAppElement("body");

const Result = () => {
  const [state, dispatch] = useContext(StoreContext);

  const descriptionText = (): string => {
    if (state.category === "underweight") {
      return "Talk to your health supervisor to determine possible causes of underweight for adults of your age and seek advice on how to improve your condition.";
    } else if (state.category === "normal") {
      return "Maintaining a healthy weight may reduce the risk of chronic diseases associated with overweight and obesity. Keep it up!";
    } else if (state.category === "overweight") {
      return "You may face a higher risk of suffering from chronic conditions like high blood pressure and diabetes. Try to put more effort into adopting a healthier lifestyle.";
    } else {
      return "You face a severe risk of suffering from high blood pressure and cholesterol. You may need to consult a health specialist.";
    }
  };

  return (
    <Modal
      isOpen={state.modalIsOpen}
      shouldCloseOnOverlayClick={true}
      onRequestClose={() => {
        dispatch({ type: ActionType.ToggleModal });
      }}
      className="modal"
      overlayClassName="overlay"
      bodyOpenClassName="modal-body--open"
      closeTimeoutMS={200}>
      <h1 className={`bmi-group bmi-group_${state.category}`}>
        {state.category.toUpperCase()}
      </h1>
      <p className="bmi-value-text">
        You have a BMI value of <strong>{state.bmi}</strong>
      </p>
      <p className="description-text">{descriptionText()}</p>
    </Modal>
  );
};

export default Result;
