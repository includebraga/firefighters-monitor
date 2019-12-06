import React, { Component } from "react";
import io from "socket.io-client";

import { API_URL } from "../../utils/api";

export default ChildComponent =>
  class WithFirefighters extends Component {
    state = {
      firefighters: {
        response: null,
        loading: true,
      },
    };

    componentDidMount() {
      this.socket = io(API_URL);

      this.socket.on("firefighters", response => {
        this.loadResponseIntoState({ data: response });
      });
    }

    componentWillUnmount() {
      this.socket.disconnect();
    }

    loadResponseIntoState = response => {
      this.setState({
        firefighters: {
          loading: false,
          ...response,
        },
      });
    };

    addActiveFirefighter = id => {
      this.socket.emit("update_firefighter", {
        id,
        payload: { status: "active" },
      });
    };

    addBusyFirefighter = async id => {
      this.socket.emit("update_firefighter", {
        id,
        payload: { status: "busy" },
      });
    };

    removeActiveFirefighter = async id => {
      this.socket.emit("update_firefighter", {
        id,
        payload: { status: "inactive" },
      });
    };

    updateFirefighterDuty = async (id, dutyType) => {
      this.socket.emit("update_firefighter", {
        id,
        payload: { dutyType },
      });
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
