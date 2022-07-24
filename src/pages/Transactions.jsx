import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import TableBody from "../components/UI/table/body/TableBody";
import { CSVLink } from "react-csv";
import { AuthContext } from "../context";
import { useDispatch, useSelector } from "react-redux/es/exports";

export const Transactions = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const [file, setFile] = useState(); // state for picked file
  const [limit, setLimit] = useState(10); // initial number of rows in table
  const [visible, setVisible] = useState(false); // initial state for table component
  const [length, setLength] = useState(0);

  //-----⌄⌄⌄ For table ⌄⌄⌄-----
  const dispatch = useDispatch();
  const CSVData = useSelector((state) => state.tableReducer);
  //console.log(CSVData); //start Data from reducer in index.js (then - array of objects from CSV)

  //----------------------------------------------
  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("auth");
    dispatch({ type: "CLEAR_TABLE" });
  };

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  //----------------------------
  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const dataFromCSV = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });
    setLength(dataFromCSV.length);
    dispatch({ type: "LOAD_DATA", payload: dataFromCSV });
    //console.log(length);
    setVisible(true);
  };

  //----------------------------

  const importCSV = (e) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (file) {
      fileReader.onload = (event) => {
        const text = event.target.result;
        csvFileToArray(text);
      };
      fileReader.readAsText(file);
    }
  };

  //----------------------------
  const headers = Object.keys(Object.assign({}, ...CSVData));
  const exportCSV = {
    data: CSVData,
    filename: "data.csv",
  };

  const clearTable = () => {
    dispatch({ type: "CLEAR_TABLE" });
    setVisible(false);
  };

  //----------------------------
  return (
    <>
      <br />
      <form className="Auth-form mx-4">
        <div className="form-group">
          <label>Pick a file</label>
          <input
            className="form-control mt-1"
            type="file"
            id="csvFileInput"
            accept={".csv"}
            onChange={handleOnChange}
          />
        </div>

        <label className="mt-3">Elements per page</label>
        <Form.Select
          value={limit}
          onChange={(e) => {
            setLimit(e.target.value);
            dispatch({ type: "UPDATE_DATA" });
          }}
        >
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={length}>{length} (All)</option>
        </Form.Select>

        <div className="form-group mt-3 mb-3">
          <Button
            className="mr-5"
            onClick={(e) => {
              importCSV(e);
            }}
          >
            Import
          </Button>

          <CSVLink {...exportCSV} enclosingCharacter={""}>
            <Button className="mx-3">Export</Button>
          </CSVLink>

          <Button onClick={() => clearTable()}>Clear Table</Button>
        </div>

        <div className="form-group mt-3">
          <Button onClick={logout}>Logout</Button>
        </div>
      </form>

      <br />

      {visible ? (
        <TableBody
          headersNames={headers}
          dataForTable={CSVData}
          rowsPerPage={limit}
        />
      ) : null}
    </>
  );
};
