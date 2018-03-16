import React, { Component } from "react";
import { connect } from "react-redux";

import { initWork } from "../../redux/actions/items-actions";

import LOGO from "../../assets/images/logo.svg";

class Storage extends Component {
  componentDidMount() {
    const { initWork } = this.props;
    initWork();
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
  initWork
})(Storage);
