import { Suspense, useContext, useEffect } from "react";
import Header from "./components/Header";
import { StoreContext } from "./store/StoreContext";
import Inputs from "./views/Inputs";
import History from "./views/History";
import { Route } from "wouter";
import Result from "./components/Result";
import About from "./components/About";

const App: React.FunctionComponent = () => {
  const [state] = useContext(StoreContext);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(state.history));
    localStorage.setItem("unit", JSON.stringify(state.unit));
  }, [state.history, state.unit]);

  return (
    <div id="second-root">
      <Header name="Obese" />

      <Route path="/">
        <Inputs />
        <Result />
      </Route>

      <Route path="/history">
        <Suspense fallback={<></>}>
          <History />
        </Suspense>
      </Route>

      <About />
    </div>
  );
};

export default App;
