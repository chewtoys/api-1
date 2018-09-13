import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import './index.css';
import App from './Main';
import registerServiceWorker from './registerServiceWorker';

const history = createBrowserHistory()

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
