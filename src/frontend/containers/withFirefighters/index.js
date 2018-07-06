import React, { Component } from "react";
import axios from "axios";

import apiUrl from "../../utils/apiUrl";

export default ChildComponent =>
  class WithApiCall extends Component {
    state = {
      firefighters: {
        response: null,
        loading: true
      }
    };

    async componentDidMount() {
      const response = await axios.get(`${apiUrl}/api/firefighters`);

      /* eslint-disable react/no-did-mount-set-state */
      this.setState({
        firefighters: {
          response: response.data,
          loading: false
        }
      });
      /* eslint-enable */
    }

    render() {
      return <ChildComponent {...this.state} {...this.props} />;
    }
  };
