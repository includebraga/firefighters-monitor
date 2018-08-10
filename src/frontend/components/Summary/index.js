import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import withFirefighters from "../../containers/withFirefighters";

import "./index.css";

@withFirefighters
export default class Summary extends Component {
  static propTypes = {
    firefighters: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      data: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    }).isRequired
  };

  getfirefightersData = () => {
    const {
      firefighters: { data }
    } = this.props;

    return data;
  };

  getActive = () => _.filter(this.getfirefightersData(), { status: "active" });

  getBusy = () => _.filter(this.getfirefightersData(), { status: "busy" });

  getOnDuty = () => _.filter(this.getfirefightersData(), { isOnDuty: true });

  renderName = firefighter => (
    <span styleName="name" key={firefighter.name}>
      {firefighter.name}
    </span>
  );

  render() {
    const { firefighters } = this.props;
    const { getActive, getBusy, getOnDuty } = this;

    if (firefighters.loading) return null;

    const active = getActive();
    const busy = getBusy();
    const onDuty = getOnDuty();

    return (
      <div styleName="root">
        <div styleName="block">
          <p styleName="duty">Piquete</p>
          <div styleName="names">
            {onDuty
              ? onDuty.map(firefighter => this.renderName(firefighter))
              : null}
          </div>
        </div>
        <div styleName="block">
          <p styleName="busy">Serviço</p>
          <div styleName="names">
            {busy
              ? busy.map(firefighter => this.renderName(firefighter))
              : null}
          </div>{" "}
        </div>
        <div styleName="block">
          <p styleName="active">Ativo</p>
          <div styleName="names">
            {active
              ? active.map(firefighter => this.renderName(firefighter))
              : null}
          </div>
        </div>
      </div>
    );
  }
}
