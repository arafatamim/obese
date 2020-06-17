import { observer } from "mobx-react";
import React from "react";
import Modal from "react-modal";
import { store } from "../store";
import "./Result.scss";

Modal.setAppElement("body");

@observer
class Result extends React.Component {
  descriptionText = (): string => {
    if (store.bmiGroup === "underweight") {
      return "Talk to your health supervisor to determine possible causes of underweight for adults of your age and seek advice on how to improve your condition.";
    } else if (store.bmiGroup === "normal") {
      return "Maintaining a healthy weight may reduce the risk of chronic diseases associated with overweight and obesity. Keep it up!";
    } else if (store.bmiGroup === "overweight") {
      return "You may face a higher risk of suffering from chronic conditions like high blood pressure and diabetes. Try to put more effort into adopting a healthier lifestyle.";
    } else {
      return "You face a severe risk of suffering from high blood pressure and cholesterol. You may need to consult a health specialist.";
    }
  };

  render() {
    return (
      <Modal
        isOpen={store.isModalOpen}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => {
          store.isModalOpen = false;
        }}
        className="modal"
        overlayClassName="overlay"
        bodyOpenClassName="modal-body--open"
        closeTimeoutMS={200}>
        <h1 className={`bmi-group bmi-group_${store.bmiGroup}`}>
          {store.bmiGroup.toUpperCase()}
        </h1>
        <p className="bmi-value-text">
          You have a BMI value of <strong>{store.calculateBMI}</strong>
        </p>
        <p className="description-text">{this.descriptionText()}</p>
      </Modal>
    );
  }
}

export default Result;
