import { AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { StoreContext } from "../store/StoreContext";
import { ActionType, Category } from "../types";
import "./Result.scss";
import Modal from "./UI/Modal";

const descriptionText: Record<Category, string> = {
  underweight:
    "Talk to your health supervisor to determine possible causes of underweight for adults of your age and seek advice on how to improve your condition.",
  normal:
    "Maintaining a healthy weight reduces the risk of chronic diseases associated with overweight and obesity. Keep it up!",
  overweight:
    "You may face a higher risk of suffering from chronic conditions like high blood pressure and diabetes.",
  obese:
    "You face a severe risk of suffering from high blood pressure and cholesterol. You may need to consult a health specialist.",
};

const Result = () => {
  const [state, dispatch] = useContext(StoreContext);

  return (
    <AnimatePresence initial={false} exitBeforeEnter={true}>
      {state.modalIsOpen && (
        <Modal
          handleClose={() => void dispatch({ type: ActionType.ToggleModal })}>
          <h1 className={`bmi-group bmi-group_${state.category}`}>
            {state.category.toUpperCase()}
          </h1>
          <p className="bmi-value-text">
            You have a BMI value of <strong>{state.bmi}</strong>
          </p>
          <p className="description-text">{descriptionText[state.category]}</p>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default Result;
