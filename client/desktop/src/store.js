import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { routerMiddleware, routerReducer } from "react-router-redux";
import persistState from "redux-localstorage";
import thunk from "redux-thunk";
import moment from "moment";
import createHistory from "history/createBrowserHistory";
// Actions
import { data, settings } from "./components/Main/actions";
import logger from "redux-logger";

if (typeof localStorage["checkDate"] === "undefined") {
    localStorage["checkDate"] = moment().format("YYYY-MM-DD");
} else if (localStorage["checkDate"] !== moment().format("YYYY-MM-DD")) {
    localStorage["checkDate"] = moment().format("YYYY-MM-DD");
} else {
    localStorage.clear();
}

export const history = createHistory();

const redusers = combineReducers({
    router: routerReducer,
    data,
    settings
});

const initialState = {};
const enhancers = [];
let middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV === "development") {
    const devToolsExtension = window.devToolsExtension;
    middleware = middleware.concat(logger);

    if (typeof devToolsExtension === "function") {
        enhancers.push(devToolsExtension());
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    persistState(["data", "settings"], {
        key: "root"
    }),
    ...enhancers
);

export default createStore(redusers, initialState, composedEnhancers);
