import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import "./index.css";

const label = {
  active: "Disponível",
  inactive: "",
  busy: "Serviço"
};

class Firefighter extends PureComponent {
  nextStatus = status => {
    const {
      addActiveFirefighter,
      addBusyFirefighter,
      removeActiveFirefighter
    } = this.props;

    const statusChange = {
      active: addBusyFirefighter,
      busy: removeActiveFirefighter,
      inactive: addActiveFirefighter
    };

    return statusChange[status];
  };

  handleFirefighterCheckChange = () => {
    const { status, id } = this.props;

    return this.nextStatus(status)(id);
  };

  render() {
    const { id, name, status } = this.props;

    return (
      <button
        type="submit"
        data-tag={id}
        styleName={`root ${status}`}
        onClick={this.handleFirefighterCheckChange}
      >
        <div styleName="block name">{name}</div>
        <div styleName="block status">{label[status]}</div>
      </button>
    );
  }
}

Firefighter.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  addActiveFirefighter: PropTypes.func.isRequired,
  removeActiveFirefighter: PropTypes.func.isRequired,
  addBusyFirefighter: PropTypes.func.isRequired
};

export default Firefighter;
