import React from "react";
import "./Header.scss";
import { List } from "react-feather";
import { useLocation } from 'wouter'

import { IconButton } from "./UI/Button";

const Header: React.FunctionComponent<{ name: string }> = ({ name }) => {
  const [location,setLocation] = useLocation();

  return (
    <>
      <div className="header-container">
        <span>{name}</span>
        <div className="right-aligned">
          <IconButton
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
      </div>
    </>
  );
};

export default Header;
