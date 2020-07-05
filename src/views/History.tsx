import { AnimatePresence, motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import React, { useState, useContext } from "react";
import { Line } from "react-chartjs-2";
import { useHistory } from "react-router-dom";
import Table from "../components/UI/Table";
import StoreContext from "../store";
import "./History.scss";

const History: React.FC = () => {
  const store = useContext(StoreContext);
  const [showGraph, setShowGraph] = useState<boolean>(false);
  const history = useHistory();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -200 }}
        className="table-container">
        <div className="table-title">
          <h2 className="table-name">History</h2>

          {store.history.length !== 0 && (
            <span className="table-action">
              <button
                onClick={() => {
                  history.replace("/");
                  store.clearHistory();
                  localStorage.removeItem("history");
                }}>
                Clear
              </button>
              <motion.button
                whileTap={{ scale: 0.9, transitionDuration: "0.01s" }}
                onClick={() => setShowGraph(!showGraph)}>
                {showGraph ? "Hide" : "Show"} Graph
              </motion.button>
            </span>
          )}
        </div>
        {showGraph && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{ marginBottom: "20px" }}>
            <Line
              data={{
                labels: store.history.map((item) => item.date),
                datasets: [
                  {
                    label: "BMI",
                    borderColor: "#00d99c",
                    pointBackgroundColor: store.history.map<string>((item) => {
                      switch (item.category) {
                        case "normal":
                          return "#00be75";
                        case "obese":
                          return "#d10000";
                        case "overweight":
                          return "#df7700";
                        case "underweight":
                          return "#db7c00";
                        default:
                          return "white";
                      }
                    }),
                    data: store.history.map((item) => item.bmi),
                  },
                ],
              }}
            />
          </motion.div>
        )}
        {store.history.length === 0 ? (
          <div className="empty-message">
            History is empty. Go back and perform some calculations to track
            them here.
          </div>
        ) : (
          <AnimatePresence>
            <Table items={store.history} />
          </AnimatePresence>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default observer(History);
