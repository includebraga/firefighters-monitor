import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import FirefightersList from "../FirefightersList";
import Login from "../../containers/Login";

import "./index.css";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/dashboard">
          <div styleName="root">
            <FirefightersList />
          </div>
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    );
  }
}

export default App;

// <Route exact path="/user">
//   <User />
// </Route>
