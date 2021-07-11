import { combineReducers } from "redux";
import { cellReducer } from "./cells";
import { bundleReducer } from "./bundle";

const reducers = combineReducers({
  cells: cellReducer,
  bundle: bundleReducer,
});

export default reducers;

export type RootStore = ReturnType<typeof reducers>;
