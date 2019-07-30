import React from "react";
import styles from "./Table.module.scss";
import { IHistoryItem, store } from "../../store";

interface ITableProps {
  items: IHistoryItem[];
}
const Table: React.FC<ITableProps> = props => {
  return (
    <div>
      {props.items.map((item, index) => (
        <div className={styles.table} key={index}>
          <div>
            <div className={styles.itemName}>
              Date&ensp;<span className={styles.itemDetail}>{item.date}</span>
            </div>
            <div className={styles.itemName}>
              Height&ensp;
              <span className={styles.itemDetail}>
                {item.height} {store.heightUnit}
              </span>
            </div>
            <div className={styles.itemName}>
              Weight&ensp;
              <span className={styles.itemDetail}>
                {item.weight} {store.weightUnit}
              </span>
            </div>
            <div className={styles.itemName}>
              BMI&ensp;
              <span className={styles.itemDetail}>{item.bmi}</span>
            </div>
            <div className={styles.itemName}>
              Category&ensp;
              <span className={styles.itemDetail}>{item.category}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Table;
