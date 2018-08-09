import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import "./index.css";

const label = {
  active: "Disponível",
  inactive: "",
  busy: "Serviço"
};

class Firefighter extends PureComponent {
  preventDefault = evt => {
    evt.preventDefault();
  };

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

  handleStatusChange = () => {
    const { status, id } = this.props;

    return this.nextStatus(status)(id);
  };

  handleDutyChange = () => {
    const { updateFirefighterDuty, id, isOnDuty } = this.props;

    return updateFirefighterDuty(id, !isOnDuty);
  };

  handleFirefighterClick = evt => {
    this.preventDefault(evt);

    return evt.buttons === 1
      ? this.handleStatusChange()
      : this.handleDutyChange();
  };

  render() {
    const { id, name, status, isOnDuty } = this.props;

    return (
      <button
        type="submit"
        data-tag={id}
        styleName={`root ${status}`}
        onContextMenu={this.preventDefault}
        onMouseDown={this.handleFirefighterClick}
      >
        <div styleName="block name">{name}</div>
        {isOnDuty ? <div styleName="block duty">Piquete</div> : null}
        <div styleName="block status">{label[status]}</div>
      </button>
    );
  }
}

Firefighter.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  isOnDuty: PropTypes.bool.isRequired,
  addActiveFirefighter: PropTypes.func.isRequired,
  removeActiveFirefighter: PropTypes.func.isRequired,
  addBusyFirefighter: PropTypes.func.isRequired,
  updateFirefighterDuty: PropTypes.func.isRequired
};

export default Firefighter;
