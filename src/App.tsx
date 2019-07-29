import React, { Component } from "react";

import { store } from "./store";

import Header from "./components/Header";
import Inputs from "./views/Inputs";
import History from "./views/History";
import { Router } from "@reach/router";

class App extends Component {
  componentDidMount() {
    if (localStorage.getItem("history")) {
      store.setHistory(JSON.parse(localStorage.getItem("history")!));
    }
  }

  render() {
    return (
      <div>
        <Header name={store.appName} />
        <Router>
          <Inputs path="/" />
          <History path="/history" />
        </Router>
      </div>
    );
  }
}

export default App;
