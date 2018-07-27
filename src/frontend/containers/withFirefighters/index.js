import React, { Component } from "react";

import {
  getFirefighters,
  addActiveFirefighter,
  addBusyFirefighter,
  removeActiveFirefighter
} from "../../utils/api";

export default ChildComponent =>
  class WithFirefighters extends Component {
    state = {
      firefighters: {
        response: null,
        loading: true
      }
    };

    async componentDidMount() {
      const response = await getFirefighters();

      this.loadResponseIntoState(response);
    }

    loadResponseIntoState = response => {
      this.setState({
        firefighters: {
          loading: false,
          ...response
        }
      });
    };

    addActiveFirefighter = async id => {
      const response = await addActiveFirefighter(id);

      this.loadResponseIntoState(response);
    };

    addBusyFirefighter = async id => {
      const response = await addBusyFirefighter(id);

      this.loadResponseIntoState(response);
    };

    removeActiveFirefighter = async id => {
      const response = await removeActiveFirefighter(id);

      this.loadResponseIntoState(response);
    };

    render() {
      return (
        <ChildComponent
          {...this.state}
          addActiveFirefighter={this.addActiveFirefighter}
          addBusyFirefighter={this.addBusyFirefighter}
          removeActiveFirefighter={this.removeActiveFirefighter}
          {...this.props}
        />
      );
    }
  };
