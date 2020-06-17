import React from "react";
import styles from "./BottomSheet.module.scss";

export const BottomSheet: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => (
  <div className={styles.sheet}>
    <div className={styles.items}>{children}</div>
  </div>
);
