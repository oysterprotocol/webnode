import React, { Component } from "react";
import { connect } from "react-redux";

import { initWork } from "../../redux/actions/items-actions";

import LOGO from "../../assets/images/logo.svg";

class Storage extends Component {
  componentDidMount() {
    const { initWork } = this.props;
    // initWork();
  }

  render() {
    return <img src={LOGO} width="100" />;
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
  initWork
})(Storage);
