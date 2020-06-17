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
  plain?: boolean;
  ariaLabel: string;
  onClick?: () => void;
}> = ({ children, style, active, onClick, plain, ariaLabel }) => {
  return (
    <button
      aria-label={ariaLabel}
      className={`${styles.iconButton} ${active && styles.active} ${
        plain && styles.plain
      }`}
      style={style}
      onClick={onClick}>
      {children}
    </button>
  );
};

export const PlainButton: React.FC<{
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}> = (props) => (
  <button
    className={styles.plainButton}
    style={props.style}
    onClick={props.onClick}>
    {props.children}
  </button>
);
