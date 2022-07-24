import React, { useState } from "react";
import styles from "./TableHead.module.css";

export const TableHead = ({ headersNames, handleSorting }) => {
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  return (
    <thead className={styles.tableRowHeader}>
      <tr key={"header"}>
        {headersNames.map((label, key) => (
          <th
            key={key}
            onClick={() => handleSortingChange(label)}
            className={`${styles.header} ${
              sortField === label && order === "asc"
                ? styles.up
                : sortField === label && order === "desc"
                ? styles.down
                : styles.default
            }`}
          >
            {label}
          </th>
        ))}

        {/* -----⌄⌄⌄ Just to match header fill color ⌄⌄⌄----- */}

        {/* Delete button */}
        <th></th>
        {/* Edit button */}
        <th></th>
      </tr>
    </thead>
  );
};
