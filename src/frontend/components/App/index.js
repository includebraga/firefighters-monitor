import React, { Component } from "react";
import FirefightersList from "../FirefightersList";

import "./index.css";

class App extends Component {
  render() {
    return (
      <div styleName="root">
        <FirefightersList />
      </div>
    );
  }
}

export default App;
