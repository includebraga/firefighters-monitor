import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContainer } from "react-hot-loader";
import ReactDOM from "react-dom";

import "regenerator-runtime/runtime";

import App from "./components/App";

import "./styles/reset.css";
import "./styles/normalize.css";

ReactDOM.render(
  <AppContainer>
    <Router>
      <App />
    </Router>
  </AppContainer>,
  document.getElementById("app")
);

if (module.hot) {
  module.hot.accept();
}
