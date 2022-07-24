import { legacy_createStore as createStore, combineReducers } from "redux";
import { tableReducer } from "./tableReducer";
import { filterReducer } from "./filterReducer";

const rootReducer = combineReducers({
  tableReducer,
  filterReducer,
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
