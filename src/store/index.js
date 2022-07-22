import { legacy_createStore as createStore, combineReducers } from "redux";
import { tableReducer } from "./tableReducer";
import { filterReducer } from "./filterReducer";

const rootReducer = combineReducers({
  tableReducer,
  filterReducer,
});

export const store = createStore(rootReducer);
