import React, { Component } from "react";
import { connect } from "react-redux";

import { initWork } from "../../redux/actions/items-actions";

class Storage extends Component {
  componentDidMount() {
    const { initWork } = this.props;
    initWork();
  }

  render() {
    return <div>hey</div>;
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
  initWork
})(Storage);
