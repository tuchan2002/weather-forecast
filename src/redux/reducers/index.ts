import { combineReducers } from "redux";
import countReducer from "../reducers/countReducer";

const rootReducer = combineReducers({
  countReducer,
});

export default rootReducer;
