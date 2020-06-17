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
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = (props) => (
  <div className={styles.counterCard} style={props.style}>
    <div className={styles.cardHeader}>
      <div>
        <div className={styles.cardTitle}>
          <label htmlFor={props.id}>{props.title}</label>
        </div>
        <div className={styles.cardSubtitle}>
          {props.value} <span className={styles.hintText}>{props.unit}</span>
        </div>
      </div>
      <div className={styles.cardIcon}>{props.icon}</div>
    </div>
    <input
      id={props.id}
      type="range"
      min={props.min}
      max={props.max}
      step={props.step}
      value={props.value}
      onChange={props.onChange}
    />
  </div>
);
