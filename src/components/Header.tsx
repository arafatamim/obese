import React from "react";
import { navigate, Location } from "@reach/router";

import "./Header.scss";
import { List } from "react-feather";

import { IconButton } from "./UI/Button";

const Header: React.FC<{ name: string }> = ({ name }) => {
  return (
    <>
      <div className="header-container">
        <span>{name}</span>
        <Location>
          {({ location }) => {
            return (
              <IconButton
                active={location.pathname === "/history"}
                onClick={() => {
                  if (location.pathname === "/history") {
                    navigate("/", { replace: true });
                  } else {
                    navigate("/history", { replace: true });
                  }
                }}
              >
                <List style={{ boxSizing: "content-box" }} />
              </IconButton>
            );
          }}
        </Location>
      </div>
    </>
  );
};

export default Header;
