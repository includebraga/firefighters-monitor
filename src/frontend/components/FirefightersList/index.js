import React, { Component } from "react";
import PropTypes from "prop-types";

import withFirefighters from "../../containers/withFirefighters";
import Firefighter from "../Firefighter";
import Summary from "../Summary";

import "./index.css";

@withFirefighters
class FirefightersList extends Component {
  static propTypes = {
    firefighters: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      data: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    }).isRequired,
    addActiveFirefighter: PropTypes.func.isRequired,
    removeActiveFirefighter: PropTypes.func.isRequired,
    addBusyFirefighter: PropTypes.func.isRequired,
    updateFirefighterDuty: PropTypes.func.isRequired
  };

  render() {
    const {
      addActiveFirefighter,
      addBusyFirefighter,
      removeActiveFirefighter,
      firefighters,
      updateFirefighterDuty
    } = this.props;

    if (firefighters.loading) return null;

    return (
      <>
        <div styleName="list">
          {firefighters.data.map(firefighter => (
            <Firefighter
              key={firefighter.id}
              {...firefighter}
              addBusyFirefighter={addBusyFirefighter}
              addActiveFirefighter={addActiveFirefighter}
              removeActiveFirefighter={removeActiveFirefighter}
              updateFirefighterDuty={updateFirefighterDuty}
            />
          ))}
        </div>
        <Summary firefighters={firefighters} />
      </>
    );
  }
}

export default FirefightersList;
