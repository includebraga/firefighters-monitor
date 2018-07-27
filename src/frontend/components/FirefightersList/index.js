import React, { Component } from "react";
import PropTypes from "prop-types";

import withFirefighters from "../../containers/withFirefighters";
import Firefighter from "../Firefighter";

import "./index.css";

@withFirefighters
export default class FirefightersList extends Component {
  static propTypes = {
    firefighters: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      data: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    }).isRequired,
    addActiveFirefighter: PropTypes.func.isRequired,
    removeActiveFirefighter: PropTypes.func.isRequired,
    addBusyFirefighter: PropTypes.func.isRequired
  };

  render() {
    const {
      addActiveFirefighter,
      addBusyFirefighter,
      firefighters,
      removeActiveFirefighter
    } = this.props;

    if (firefighters.loading) return null;

    return (
      <div styleName="root">
        {firefighters.data.map(firefighter => (
          <Firefighter
            key={firefighter.id}
            {...firefighter}
            addBusyFirefighter={addBusyFirefighter}
            addActiveFirefighter={addActiveFirefighter}
            removeActiveFirefighter={removeActiveFirefighter}
          />
        ))}
      </div>
    );
  }
}
