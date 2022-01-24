import React, { useContext } from "react";
import styles from "./Table.module.scss";
import { HistoryItem, Unit } from "../../types";
import { motion } from "framer-motion";
import { StoreContext } from "../../store/StoreContext";
import RTF from "@sscovil/rtf";

interface ITableProps {
  items: HistoryItem[];
}

const rtf = new RTF();

const Table: React.FC<ITableProps> = (props) => {
  const [state] = useContext(StoreContext);

  return (
    <motion.div
      layout="position"
      transition={{ duration: 0.4, type: "spring" }}>
      {props.items.map((item, index) => (
        <div className={styles.table} key={index}>
          <div>
            <div className={styles["item-name"]}>
              <span className={styles.side}>{rtf.format(item.date)}</span>
            </div>
            <div className={`${styles["height-weight"]} ${styles.numbers}`}>
              <div className={styles["item-name"]}>
                <span className={styles["item-detail"]}>
                  {item.height}{" "}
                  <span className={styles["unit"]}>
                    {state.unit === Unit.Metric ? "cm" : "ft"}
                  </span>
                </span>
              </div>
              <div className={styles["item-name"]}>
                <span className={styles["item-detail"]}>
                  {item.weight}{" "}
                  <span className={styles["unit"]}>
                    {state.unit === Unit.Metric ? "kg" : "lbs"}
                  </span>
                </span>
              </div>
            </div>
            <div className={styles.footer}>
              <div className={styles["item-name"]}>
                BMI <span className={styles.side}>{item.bmi}</span>
              </div>
              <div className={styles["item-name"]}>
                <span
                  className={`${styles["bmi-group"]} ${styles[item.category]}`}>
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
