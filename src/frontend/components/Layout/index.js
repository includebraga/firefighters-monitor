import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./index.css";

const Layout = ({ heading, children, cardColor }) => (
  <div styleName="root">
    <div styleName="wrapper">
      <h1 styleName="heading">{heading}</h1>
      <div styleName={classNames("card", { [cardColor]: true })}>
        {children}
      </div>
    </div>
  </div>
);

Layout.propTypes = {
  heading: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  children: PropTypes.node.isRequired,
  cardColor: PropTypes.oneOf(["grey", "green"]).isRequired,
};

export default Layout;
