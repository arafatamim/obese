import React from "react";
import styles from "./Table.module.scss";
import { store } from "../../store";
import { IHistoryItem } from "../../types";

interface ITableProps {
  items: IHistoryItem[];
}
const Table: React.FC<ITableProps> = (props) => {
  return (
    <div>
      {props.items.map((item, index) => (
        <div className={styles.table} key={index}>
          <div>
            <div className={styles.itemName}>
              <span className={styles.side}>{item.date}</span>
            </div>
            <div className={`${styles.heightWeight} ${styles.numbers}`}>
              <div className={styles.itemName}>
                <span className={styles.itemDetail}>
                  {item.height} {store.heightUnit}
                </span>
              </div>
              <div className={styles.itemName}>
                <span className={styles.itemDetail}>
                  {item.weight} {store.weightUnit}
                </span>
              </div>
            </div>
            <div className={styles.footer}>
              <div className={styles.itemName}>
                BMI <span className={styles.side}>{item.bmi}</span>
              </div>
              <div className={styles.itemName}>
                <span
                  className={`${styles.bmi_group} ${styles[item.category]}`}>
                  {item.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Table;
