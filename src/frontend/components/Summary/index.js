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

  getOnDuty = type => _.filter(this.getfirefightersData(), { dutyType: type });

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
    const piquet = getOnDuty("piquet");
    const eip = getOnDuty("eip");
    const elac = getOnDuty("elac");

    return (
      <div styleName="root">
        <div styleName="block">
          <div styleName="block">
            <p styleName="active">Disponível</p>
            {!_.isEmpty(active) ? (
              <div styleName="names">
                {active.map(firefighter => this.renderName(firefighter))}
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
          <p styleName="piquet">Piquete</p>
          {!_.isEmpty(piquet) ? (
            <div styleName="names">
              {piquet.map(firefighter => this.renderName(firefighter))}
            </div>
          ) : (
            this.renderEmptyState()
          )}
        </div>
        <div styleName="block">
          <p styleName="elac">ELAC</p>
          {!_.isEmpty(elac) ? (
            <div styleName="names">
              {elac.map(firefighter => this.renderName(firefighter))}
            </div>
          ) : (
            this.renderEmptyState()
          )}
        </div>
        <div styleName="block">
          <p styleName="eip">EIP</p>
          {!_.isEmpty(eip) ? (
            <div styleName="names">
              {eip.map(firefighter => this.renderName(firefighter))}
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
