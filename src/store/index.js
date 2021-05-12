import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { getAllCourses } from "../actions/courses";
import { reducers } from "../reducers";
import { loadingBarMiddleware } from "react-redux-loading-bar";

// const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export const store = createStore(
  reducers,
  compose(applyMiddleware(thunk, loadingBarMiddleware()))
);

store.dispatch(getAllCourses());
