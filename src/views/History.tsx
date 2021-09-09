import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useContext, lazy, Suspense } from "react";
import { useLocation } from "wouter";
import Table from "../components/UI/Table";
import { StoreContext } from "../store/StoreContext";
import { ActionType } from "../types/action";
import "./History.scss";

const Line = lazy(() =>
  import("react-chartjs-2").then(({ Line }) => ({ default: Line })),
);

const History: React.FC = () => {
  const [state, dispatch] = useContext(StoreContext);
  const [showGraph, setShowGraph] = useState<boolean>(false);
  const [, setLocation] = useLocation();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -200 }}
        className="table-container">
        <div className="table-title">
          <h2 className="table-name">History</h2>

          {state.history.length !== 0 && (
            <span className="table-action">
              <button
                onClick={() => {
                  setLocation("/");
                  dispatch({ type: ActionType.ClearHistory });
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
            <Suspense fallback={<div style={{ color:"white" }}>Loading...</div>}>
              <Line
                data={{
                  labels: state.history.map((item) =>
                    new Date(item.date).toLocaleDateString(),
                  ),
                  datasets: [
                    {
                      label: "BMI",
                      borderColor: "#00d99c",
                      pointBackgroundColor: state.history.map<string>(
                        (item) => {
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
                        },
                      ),
                      data: state.history.map((item) => item.bmi),
                    },
                  ],
                }}
              />
            </Suspense>
          </motion.div>
        )}
        {state.history.length === 0 ? (
          <div className="empty-message">
            History is empty. Go back and perform some calculations to track
            them here.
          </div>
        ) : (
          <AnimatePresence>
            <Table items={state.history} />
          </AnimatePresence>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default History;
