import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import withFirefighters from "../../containers/withFirefighters";
import "./index.css";

@withFirefighters
class Summary extends Component {
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

  renderEmptyState = () => <div styleName="empty" />;

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
          {!_.isEmpty(onDuty) ? (
            <div styleName="names">
              {onDuty.map(firefighter => this.renderName(firefighter))}
            </div>
          ) : (
            this.renderEmptyState()
          )}
        </div>
        <div styleName="block">
          <p styleName="busy">Serviço</p>
          {!_.isEmpty(busy) ? (
            <div styleName="names">
              {busy.map(firefighter => this.renderName(firefighter))}
            </div>
          ) : (
            this.renderEmptyState()
          )}
        </div>
        <div styleName="block">
          <p styleName="active">Ativo</p>
          {!_.isEmpty(active) ? (
            <div styleName="names">
              {active.map(firefighter => this.renderName(firefighter))}{" "}
            </div>
          ) : (
            this.renderEmptyState()
          )}
        </div>
      </div>
    );
  }
}

export default Summary;
