import React, { Component } from "react";
import { connect } from "react-redux";

import { startApp } from "../../redux/actions/app-actions";

import LOGO from "../../assets/images/logo.svg";

class Storage extends Component {
  componentDidMount() {
    const { startApp } = this.props;
    startApp();
  }

  render() {
    const { statuses } = this.props;
    return (
      <div className="container">
        <img src={LOGO} width="100" />
        <div className="status-container">{statuses.map(s => <p>{s}</p>)}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  statuses: state.pow.statuses
});

export default connect(mapStateToProps, {
  startApp
})(Storage);
