import React, { useState } from "react";
import { observer } from "mobx-react";
import "./History.scss";

import { store } from "../store";

import { Line } from "react-chartjs-2";
import { BarChart } from "react-feather";

import Table from "../components/UI/Table";

const History: React.FC = () => {
  const [hidden, setHidden] = useState<boolean>(false);

  return (
    <div className="table-container">
      <div className="table-title">
        <h2 className="table-name">History</h2>

        {store.history.length !== 0 && (
          <span className="table-action">
            <button
              onClick={() => {
                store.clearHistory();
                localStorage.removeItem("history");
              }}>
              Clear
            </button>
            <button onClick={() => setHidden(!hidden)}>
              {hidden ? "Hide" : "Show"} Graph
            </button>
          </span>
        )}
      </div>
      {hidden && (
        <div style={{ marginBottom: "20px" }}>
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
                    }
                  }),
                  data: store.history.map((item) => item.bmi),
                },
              ],
            }}
          />
        </div>
      )}
      {store.history.length === 0 ? (
        <div className="empty-message">
          History is empty. Go back and perform some calculations to track them
          here.
        </div>
      ) : (
        <Table items={store.history} />
      )}
    </div>
  );
};

export default observer(History);
