import React, { useContext } from "react";
import styles from "./Table.module.scss";
import { HistoryItem, Unit } from "../../types";
import { motion } from "framer-motion";
import { StoreContext } from "../../store/StoreContext";

interface ITableProps {
  items: HistoryItem[];
}
const Table: React.FC<ITableProps> = (props) => {
  const [state] = useContext(StoreContext);

  return (
    <motion.div layout="position">
      {props.items.map((item, index) => (
        <div className={styles.table} key={index}>
          <div>
            <div className={styles.itemName}>
              <span className={styles.side}>{item.date}</span>
            </div>
            <div className={`${styles.heightWeight} ${styles.numbers}`}>
              <div className={styles.itemName}>
                <span className={styles.itemDetail}>
                  {item.height} {state.unit === Unit.Metric ? "cm" : "ft"}
                </span>
              </div>
              <div className={styles.itemName}>
                <span className={styles.itemDetail}>
                  {item.weight} {state.unit === Unit.Metric ? "kg" : "lbs"}
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
    </motion.div>
  );
};

export default Table;
