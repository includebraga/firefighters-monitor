import React from "react";
import PropTypes from "prop-types";

import "./index.css";

/* eslint-disable react/button-has-type */
const Button = ({ type, handleClick, label }) => (
  <div styleName="wrapper">
    <button styleName="root green" type={type} onClick={handleClick}>
      {label}
    </button>
  </div>
);
/* eslint-enable react/button-has-type */

Button.propTypes = {
  type: PropTypes.oneOf(["submit", "button", "reset"]),
  handleClick: PropTypes.func,
  label: PropTypes.string.isRequired,
};

Button.defaultProps = {
  handleClick: () => {},
  type: "button",
};

export default Button;
