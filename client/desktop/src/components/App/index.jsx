import React from "react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import store, { history } from "../../store";
import Main from "../Main";
import "./styles/index.css";

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Main />
                </Router>
            </Provider>
        )
    }
};