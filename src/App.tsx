import { motion } from "framer-motion";
import React, { Dispatch, lazy, Suspense, useContext, useEffect } from "react";
import Header from "./components/Header";
import { BottomSheet } from "./components/UI/BottomSheet";
import { PlainButton } from "./components/UI/Button";
import { StoreContext } from "./store/StoreContext";
import { State, Unit } from "./types";
import { Action, ActionType } from "./types/action";
import Inputs from "./views/Inputs";
import { Route } from "wouter";

const History = lazy(() => import("./views/History"));

function renderBottomSheet(state: State, dispatch: Dispatch<Action>) {
  return (
    <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
      <PlainButton
        onClick={() => {
          if (state.unit === Unit.Metric)
            dispatch({
              type: ActionType.SetUnit,
              payload: Unit.US,
            });
          else
            dispatch({
              type: ActionType.SetUnit,
              payload: Unit.Metric,
            });
        }}>
        Change unit
      </PlainButton>
    </motion.div>
  );
}

const App: React.FunctionComponent = () => {
  const [state, dispatch] = useContext(StoreContext);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(state.history));
    localStorage.setItem("unit", JSON.stringify(state.unit));
  }, [state.history, state.unit]);

  return (
    <>
      <Header name="Obese" />

      <Route path="/">
        <Inputs />
        <BottomSheet>{renderBottomSheet(state, dispatch)}</BottomSheet>
      </Route>

      <Route path="/history">
        <Suspense fallback={<></>}>
          <History />
        </Suspense>
      </Route>
    </>
  );
};

export default App;
