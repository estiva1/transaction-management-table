import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import styles from "../table/TableBody.module.css";
import useTable from "../../../hooks/useTable";
import TablePagination from "../pagination/TablePagination";

const TableBody = ({ headersNames, dataForTable, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(dataForTable, page, rowsPerPage);

  //----------------------------------------------
  const dispatch = useDispatch();
  const CSVData = useSelector((state) => state.tableReducer);

  return (
    <>
      <table className="table table-striped table-hover border-secondary">
        {/* Getting header names from our .csv file */}
        <thead className={styles.tableRowHeader}>
          <tr key={"header"}>
            {headersNames.map((key) => (
              <th>{key}</th>
            ))}
          </tr>
        </thead>

        {/* Filling table from our .csv file */}
        <tbody>
          {slice.map((item) => (
            <tr key={item.id}>
              {Object.values(item).map((val) => (
                <td>
                  <input type="text" value={val}/>
                </td>
              ))}
              <td>
                <input
                  type="button"
                  onClick={
                    () => dispatch({ type: "DELETE_ROW", payload: item }) //only after clicking on another page
                  }
                  value="X"
                ></input>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <TablePagination
        range={range}
        slice={slice}
        setPage={setPage}
        page={page}
      />
    </>
  );
};

export default TableBody;
