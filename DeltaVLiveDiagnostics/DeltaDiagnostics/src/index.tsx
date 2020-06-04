import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./store/configureStore";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./components/App";
import { render } from "react-dom";
import React from "react";
import "./index.css";
import "./react-treeview.css";
import "./json-inspector.css";
import "react-virtualized/styles.css";

const initialState = {};
export const store = configureStore(initialState);

render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById("app")
);
