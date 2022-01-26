import { AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { StoreContext } from "../store/StoreContext";
import { ActionType } from "../types";
import Modal from "./UI/Modal";

const About = () => {
  const [state, dispatch] = useContext(StoreContext);

  return (
    <AnimatePresence initial={false} exitBeforeEnter={true}>
      {state.aboutModal && (
        <Modal
          handleClose={() =>
            void dispatch({ type: ActionType.ToggleAboutDialog })
          }>
          <img src="/images/icons/ms-icon-70x70.png" alt="Obese Logo" />
          <h1
            style={{
              margin: "0",
            }}>
            Obese
          </h1>
          <span>BMI calculator and tracker</span>
          <a target="_blank" href="https://github.com/arafatamim/obese">
            GitHub
          </a>
          <small>&copy; {new Date().getFullYear()} Tamim Arafat</small>
          <small style={{ textAlign: "center" }}>
            This program comes with absolutely no warranty. See the{" "}
            <a
              target="_blank"
              href="https://github.com/arafatamim/obese/blob/master/LICENSE">
              MIT License
            </a>{" "}
            for details.
          </small>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default About;
