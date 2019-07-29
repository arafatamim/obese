import React from "react";
import { RouteComponentProps } from "@reach/router";
import { observer } from "mobx-react";
import "./History.scss";

import { store } from "../store";

import Table from "../components/UI/Table";

@observer
class History extends React.Component<RouteComponentProps> {
  render() {
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
                }}
              >
                Clear
              </button>
            </span>
          )}
        </div>

        {store.history.length === 0 ? (
          <div className="empty-message">
            History is empty. Go back and perform some calculations to track
            them here.
          </div>
        ) : (
          <Table
            header={[
              "Date",
              `Height (${store.heightUnit})`,
              `Weight (${store.weightUnit})`,
              "BMI",
              "Category"
            ]}
            items={store.history}
          />
        )}
      </div>
    );
  }
}

export default History;
