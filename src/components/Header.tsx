import React, { useContext } from "react";
import "./Header.scss";
import { List } from "react-feather";
import { useLocation } from "wouter";
import { ActionType } from "../types/action";
import { IconButton } from "./UI/Button";
import { StoreContext } from "../store/StoreContext";
import { Unit } from "../types";
import { motion } from "framer-motion";

const Header: React.FunctionComponent<{ name: string }> = ({ name }) => {
  const [location, setLocation] = useLocation();
  const [state, dispatch] = useContext(StoreContext);

  const isImperial = state.unit === Unit.US;

  return (
    <>
      <motion.div
        transition={{ type: "spring", duration: 0.4 }}
        layout="position"
        className="header-container">
        <span>{name}</span>
        <div className="right-aligned">
          <IconButton
            ariaLabel="toggle unit"
            title={`Change Units To ${isImperial ? "Metric" : "Imperial"}`}
            onClick={() =>
              isImperial
                ? dispatch({ type: ActionType.SetUnit, payload: Unit.Metric })
                : dispatch({ type: ActionType.SetUnit, payload: Unit.US })
            }>
            {isImperial ? "ft\nlbs" : "cm\nkg"}
          </IconButton>
          <IconButton
            title="Open History"
            ariaLabel="history"
            active={location === "/history"}
            onClick={() => {
              if (location === "/history") {
                setLocation("/");
              } else {
                setLocation("/history");
              }
            }}>
            <List style={{ boxSizing: "content-box" }} />
          </IconButton>
        </div>
      </motion.div>
    </>
  );
};

export default Header;
