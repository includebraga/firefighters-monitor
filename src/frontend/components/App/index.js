import React, { Component } from "react";
import PropTypes from "prop-types";

import withFirefighters from "../../containers/withFirefighters";

import "./index.css";

@withFirefighters
export default class App extends Component {
  static propTypes = {
    firefighters: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      data: PropTypes.object
    }).isRequired
  };

  render() {
    const { firefighters } = this.props;

    if (firefighters.loading) return null;

    console.log(firefighters);

    return <div styleName="root">Hello World!</div>;
  }
}
