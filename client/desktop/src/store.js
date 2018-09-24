import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { routerMiddleware, routerReducer } from "react-router-redux";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";
// Actions
import { data } from "./components/Main/actions";
import logger from 'redux-logger';

export const history = createHistory();

const redusers = combineReducers({
  router: routerReducer,
  data
});
const initialState = {};
const enhancers = [];
const middleware = [thunk, logger, routerMiddleware(history)];

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
};

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

export default createStore(redusers, initialState, composedEnhancers);