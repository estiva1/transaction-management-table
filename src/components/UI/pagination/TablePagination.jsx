import React, { useEffect } from "react";
import styles from "./TablePagination.module.css";

const TablePagination = ({ range, setPage, page, slice }) => {
  // useEffect(() => {
  //   if (slice.length < 1 && page !== 1) {
  //     setPage(page - 1);
  //   }
  // }, [slice, page, setPage]);

  if (slice.length < 1 && page !== 1) {
    setPage(page - 1);
  }

  return (
    <div className={styles.tableFooter}>
      {range.map((el, index) => (
        <button
          key={index}
          className={`${styles.button} ${
            page === el ? styles.activeButton : styles.inactiveButton
          }`}
          onClick={() => setPage(el)}
        >
          {el}
        </button>
      ))}
    </div>
  );
};

export default TablePagination;
