import React from "react";
import styles from "./Container.module.scss";

export const GridContainer: React.FC<{ children: React.ReactNode }> = props => {
  return <div className={styles.grid}>{props.children}</div>;
};
