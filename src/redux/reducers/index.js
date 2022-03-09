import { combineReducers } from "redux";
import Mint from "./Mint";

const reducers = combineReducers({
  mint: Mint,
});
export default reducers;
