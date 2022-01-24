import React from "react";
import styles from "./Button.module.scss";

export const TextButton: React.FC<{
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}> = ({ children, style, onClick }) => {
  return (
    <button className={styles["text-button"]} style={style} onClick={onClick}>
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
  title: string;
  onClick?: () => void;
}> = ({ children, title, style, active, onClick, plain, ariaLabel }) => {
  return (
    <button
      title={title}
      aria-label={ariaLabel}
      className={`${styles["icon-button"]} ${active && styles.active} ${
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
    className={styles["plain-button"]}
    style={props.style}
    onClick={props.onClick}>
    {props.children}
  </button>
);
