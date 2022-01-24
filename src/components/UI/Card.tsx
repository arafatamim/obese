import React from "react";
import styles from "./Card.module.scss";

export const CardWithCounter: React.FC<{
  id: string;
  title: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  icon: JSX.Element;
  style?: React.CSSProperties;
  onChange: (num: number) => void;
}> = (props) => (
  <div className={styles["counter-card"]} style={props.style}>
    <div className={styles["card-header"]}>
      <div>
        <div className={styles["card-title"]}>
          <label htmlFor={props.id}>{props.title}</label>
        </div>
        <div
          className={styles["card-subtitle"]}
          onClick={() => {
            const value = prompt(`Set value (in ${props.unit})`);
            if (value != null) {
              props.onChange(parseInt(value));
            }
          }}>
          {props.value}{" "}
          <span className={styles["hint-text"]}>{props.unit}</span>
        </div>
      </div>
      <div className={styles["card-icon"]}>{props.icon}</div>
    </div>
    <input
      id={props.id}
      type="range"
      min={props.min}
      max={props.max}
      step={props.step}
      value={props.value}
      onChange={(e) => props.onChange(Number(e.target.value))}
    />
  </div>
);
