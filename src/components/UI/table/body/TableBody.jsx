import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import useTable from "../../../../hooks/useTable";
import TablePagination from "../../pagination/TablePagination";
import { Form } from "react-bootstrap";
import { ModalWindow } from "../../modal/ModalWindow";
import { TableHead } from "../head/TableHead";

const TableBody = ({ headersNames, dataForTable, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(dataForTable, page, rowsPerPage);

  //-----⌄⌄⌄ For modal window ⌄⌄⌄-----
  const [selectedItem, setSelectedItem] = useState(null);

  //----------------------------------------------
  const dispatch = useDispatch();
  //const CSVData = useSelector((state) => state.tableReducer);

  const deleteRow = () => {
    dispatch({ type: "DELETE_ROW", payload: selectedItem });
    setSelectedItem(null);
  };

  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      console.log([sortField].toString());
      const sorted = [...dataForTable].sort((a, b) => {
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });
      dispatch({type: "SORT_DATA", payload: sorted})
    }
  };

  return (
    <>
      <table className="table table-striped table-hover border-secondary">
        <TableHead {...{ headersNames, handleSorting }} />

        {/* Filling table from our .csv file */}
        <tbody>
          {slice.map((item) => (
            <tr key={item.id}>
              {Object.values(item).map((val) => (
                <td key={val.id}>
                  <Form.Control
                    value={val}
                    onChange={(e) => console.log(e.target.value)}
                  />
                </td>
              ))}
              <td>
                <input
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  value="Delete"
                ></input>
              </td>
              <td>
                <input type="button" value="Edit"></input>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalWindow
        show={selectedItem !== null}
        onHide={() => setSelectedItem(null)}
        handleClose={() => setSelectedItem(null)}
        handleConfirm={() => deleteRow()}
      />

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
