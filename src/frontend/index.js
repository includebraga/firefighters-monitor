import React from "react";
import { AppContainer } from "react-hot-loader";
import ReactDOM from "react-dom";
import "regenerator-runtime/runtime";

import App from "./components/App";

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById("app")
);

if (module.hot) {
  module.hot.accept();
}
