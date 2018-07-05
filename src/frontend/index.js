import React from "react";
import { AppContainer } from "react-hot-loader";
import ReactDOM from "react-dom";

import App from "./components/App";

/* eslint-disable */
const URL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000/" : "/";
/* eslint-enable */

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById("app")
);

if (module.hot) {
  module.hot.accept();
}
