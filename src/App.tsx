import { Suspense, useContext, useEffect } from "react";
import Header from "./components/Header";
import { StoreContext } from "./store/StoreContext";
import Inputs from "./views/Inputs";
import History from "./views/History";
import { Route } from "wouter";

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
      </Route>

      <Route path="/history">
        <Suspense fallback={<></>}>
          <History />
        </Suspense>
      </Route>
    </div>
  );
};

export default App;
