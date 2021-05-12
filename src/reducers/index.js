import { combineReducers } from "redux";
import { courseReducer } from "./courseReducer";
import { coursesReducer } from "./coursesReducer";
import { userReducer } from "./userReducer";
import { loadingBarReducer } from "react-redux-loading-bar";

export const reducers = combineReducers({
  courses: coursesReducer,
  course: courseReducer,
  user: userReducer,
  loadingBar: loadingBarReducer,
});
