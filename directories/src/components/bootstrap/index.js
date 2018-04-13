import React, { Component } from "react";
import { connect } from "react-redux";

import appActions from "../../redux/actions/app-actions";

import LOGO from "../../assets/images/logo.svg";

class Bootstrap extends Component {
  componentDidMount() {
    const { startAppFn } = this.props;
    startAppFn();
  }

  render() {
    const { statuses } = this.props;
    return (
      <div className="container">
        <img src={LOGO} width="100" />
        <div className="status-container">{statuses.map( (s, i) =>{ <p>{s}</p> })}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  statuses: state.pow.statuses
});

const mapDispatchToProps = dispatch => ({
  startAppFn: () => dispatch(appActions.startApp())
});

export default connect(mapStateToProps, mapDispatchToProps)(Bootstrap);
