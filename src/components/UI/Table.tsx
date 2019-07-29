import React from "react";
import styles from "./Table.module.scss";

interface ITableProps {
  header: (string | number)[];
  items: (string | number)[][];
}
const Table: React.FC<ITableProps> = props => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {props.header.map((value, index) => {
            return (
              <th className={styles.tableHead} key={index}>
                {value}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {props.items.map((item, index) => {
          return (
            <tr key={index}>
              {item.map((value, index) => {
                return <td key={index}>{value}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
