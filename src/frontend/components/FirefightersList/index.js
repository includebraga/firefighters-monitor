import React, { Component } from "react";
import PropTypes from "prop-types";

import withFirefighters from "../../containers/withFirefighters";

import "./index.css";

@withFirefighters
export default class FirefightersList extends Component {
  static propTypes = {
    firefighters: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      data: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    }).isRequired,
    addActiveFirefighter: PropTypes.func.isRequired,
    removeActiveFirefighter: PropTypes.func.isRequired
  };

  onFirefighterCheckChange = event => {
    const { addActiveFirefighter, removeActiveFirefighter } = this.props;
    const checkedId = event.target.attributes.getNamedItem("data-tag").value;
    const isChecked = event.target.checked;

    if (!checkedId) return;

    if (isChecked) addActiveFirefighter(checkedId);

    if (!isChecked) removeActiveFirefighter(checkedId);
  };

  render() {
    const { firefighters } = this.props;

    if (firefighters.loading) return null;

    return (
      <div styleName="root">
        {firefighters.data.map(firefighter => (
          <div key={firefighter.id}>
            <b>{firefighter.id}</b>
            -
            <b>{firefighter.name}</b>
            <input
              type="checkbox"
              checked={firefighter.active}
              data-tag={firefighter.id}
              onChange={this.onFirefighterCheckChange}
            />
          </div>
        ))}
      </div>
    );
  }
}
