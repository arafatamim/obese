import { motion } from "framer-motion";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import { BottomSheet } from "./components/UI/BottomSheet";
import { PlainButton } from "./components/UI/Button";
import { store } from "./store";
import { Unit } from "./types";
import History from "./views/History";
import Inputs from "./views/Inputs";

const App: React.FunctionComponent = () => {
  if (localStorage.getItem("history")) {
    store.setHistory(JSON.parse(localStorage.getItem("history") ?? "[]"));
  }
  if (localStorage.getItem("unit")) {
    store.unit = parseInt(localStorage.getItem("unit") ?? "0");
    store.setDefault();
  }

  return (
    <Router>
      <Header name={store.appName} />
      <Route>
        <Switch>
          <Route exact path="/">
            <Inputs />
            <BottomSheet>
              <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
                <PlainButton
                  onClick={() => {
                    if (store.unit === Unit.Metric) store.convertUnit(Unit.US);
                    else store.convertUnit(Unit.Metric);
                  }}>
                  Change unit
                </PlainButton>
              </motion.div>
            </BottomSheet>
          </Route>
          <Route exact path="/history">
            <History />
          </Route>
        </Switch>
      </Route>
    </Router>
  );
};

export default App;
