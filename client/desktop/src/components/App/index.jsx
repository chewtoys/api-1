import React from "react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import store, { history } from "../../store";
import Root from "../Root";

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Root />
                </Router>
            </Provider>
        )
    }
};