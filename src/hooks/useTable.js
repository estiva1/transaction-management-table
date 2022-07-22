import { useState, useEffect } from "react";
import { calculateRange } from "../utils/pages";
import { sliceData } from "../utils/pages";

const useTable = (dataForTable, page, rowsPerPage) => {
  const [tableRange, setTableRange] = useState([]);
  const [slice, setSlice] = useState([]);

  useEffect(() => {
    const range = calculateRange(dataForTable, rowsPerPage);
    setTableRange([...range]);

    const slice = sliceData(dataForTable, page, rowsPerPage);
    setSlice([...slice]);
  }, [dataForTable, setTableRange, page]);

  return { slice, range: tableRange };
};

export default useTable;
