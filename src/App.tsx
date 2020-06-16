import React, { useEffect } from "react";

import { store } from "./store";

import Header from "./components/Header";
import Inputs from "./views/Inputs";
import History from "./views/History";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Unit } from "./types";
import { PlainButton } from "./components/UI/Button";
import { BottomSheet } from "./components/UI/BottomSheet";

const App: React.FunctionComponent = () => {
  useEffect(() => {
    if (localStorage.getItem("history")) {
      store.setHistory(JSON.parse(localStorage.getItem("history")!));
    }
    if (localStorage.getItem("unit")) {
      store.unit = parseInt(localStorage.getItem("unit")!);
      store.setDefault();
    }
  }, []);

  return (
    <div>
      <Router>
        <Header name={store.appName} />

        <Switch>
          <Route exact path="/">
            <Inputs />
            <BottomSheet>
              <PlainButton
                onClick={() => {
                  if (store.unit === Unit.Metric) store.convertUnit(Unit.US);
                  else store.convertUnit(Unit.Metric);
                }}>
                Change unit
              </PlainButton>
            </BottomSheet>
          </Route>
          <Route exact path="/history">
            <History />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
