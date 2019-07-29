import React from "react";
import styles from "./Button.module.scss";

export const TextButton: React.FC<{
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}> = ({ children, style, onClick }) => {
  return (
    <button className={styles.textButton} style={style} onClick={onClick}>
      {children}
    </button>
  );
};

export const IconButton: React.FC<{
  children?: React.ReactNode;
  style?: React.CSSProperties;
  active?: boolean;
  onClick?: () => void;
}> = ({ children, style, active, onClick }) => {
  return (
    <button
      className={`${styles.iconButton} ${active && styles.active}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
