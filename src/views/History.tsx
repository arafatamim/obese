import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useContext, lazy, Suspense } from "react";
import { useLocation } from "wouter";
import Table from "../components/UI/Table";
import { StoreContext } from "../store/StoreContext";
import { HistoryItem } from "../types";
import { ActionType } from "../types/action";
import button from "../components/UI/Button.module.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./History.scss";

const Line = lazy(() =>
  import("react-chartjs-2").then(({ Line }) => ({ default: Line })),
);

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
);

const renderGraph = (history: HistoryItem[]) => {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      style={{ marginBottom: "20px" }}>
      <Suspense fallback={<div style={{ color: "white" }}>Loading...</div>}>
        <Line
          data={{
            labels: history.map((item) =>
              new Date(item.date).toLocaleDateString(),
            ),
            datasets: [
              {
                label: "BMI",
                borderColor: "#00d99c",
                pointBackgroundColor: history.map<string>((item) => {
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
                data: history.map((item) => item.bmi),
              },
            ],
          }}
        />
      </Suspense>
    </motion.div>
  );
};

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
                aria-label="Clear History"
                className={button["plain-button"]}
                onClick={() => {
                  setLocation("/");
                  dispatch({ type: ActionType.ClearHistory });
                  localStorage.removeItem("history");
                }}>
                Clear
              </button>
              <motion.button
                aria-label="Toggle Graph"
                className={button["plain-button"]}
                onClick={() => setShowGraph(!showGraph)}>
                Toggle Graph
              </motion.button>
            </span>
          )}
        </div>
        {showGraph && renderGraph(state.history)}

        <div className="history-container">
          {state.history.length === 0 ? (
            <div className="empty-message">
              History is empty. Go back to calculate your BMI and track it here.
            </div>
          ) : (
            <AnimatePresence>
              <Table items={state.history} />
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default History;
