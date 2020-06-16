import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import "./Header.scss";
import { List, Settings } from "react-feather";

import { IconButton, TextButton } from "./UI/Button";

const Header: React.FunctionComponent<{ name: string }> = ({ name }) => {
  const location = useLocation();
  const history = useHistory();

  return (
    <>
      <div className="header-container">
        <span>{name}</span>
        <div className="right-aligned">
          <IconButton
            active={location.pathname === "/history"}
            onClick={() => {
              if (location.pathname === "/history") {
                // navigate("/", { replace: true });
                history.replace("/");
              } else {
                history.replace("/history");
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
