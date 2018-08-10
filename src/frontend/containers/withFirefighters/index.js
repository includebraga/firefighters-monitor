import React, { Component } from "react";

import {
  addActiveFirefighter,
  addBusyFirefighter,
  getFirefighters,
  removeActiveFirefighter,
  updateFirefighterDuty
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
      try {
        const response = await getFirefighters();

        this.loadResponseIntoState(response);
      } catch (error) {
        this.setState({ error });
      }
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
      try {
        const response = await addActiveFirefighter(id);

        this.loadResponseIntoState(response);
      } catch (error) {
        this.setState({ error });
      }
    };

    addBusyFirefighter = async id => {
      try {
        const response = await addBusyFirefighter(id);

        this.loadResponseIntoState(response);
      } catch (error) {
        this.setState({ error });
      }
    };

    removeActiveFirefighter = async id => {
      try {
        const response = await removeActiveFirefighter(id);

        this.loadResponseIntoState(response);
      } catch (error) {
        this.setState({ error });
      }
    };

    updateFirefighterDuty = async (id, isOnDuty) => {
      try {
        const response = await updateFirefighterDuty(id, isOnDuty);

        this.loadResponseIntoState(response);
      } catch (error) {
        this.setState({ error });
      }
    };

    render() {
      return (
        <ChildComponent
          {...this.state}
          addActiveFirefighter={this.addActiveFirefighter}
          addBusyFirefighter={this.addBusyFirefighter}
          removeActiveFirefighter={this.removeActiveFirefighter}
          updateFirefighterDuty={this.updateFirefighterDuty}
          {...this.props}
        />
      );
    }
  };
