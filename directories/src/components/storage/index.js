import React, { Component } from "react";
import { connect } from "react-redux";
import appActions from "../../redux/actions/app-actions";
import nodeActions from "../../redux/actions/node-actions";
import treasureHuntActions from "../../redux/actions/treasure-hunt-actions";

import iota from "../../redux/services/iota";
import datamap from "../../utils/datamap";

import LOGO from "../../assets/images/logo.svg";

class Storage extends Component {
  componentDidMount() {
    const { startAppFn, startNode, findTreasure } = this.props;
    //startAppFn();
    findTreasure(
      "VAAB9BVABBTCTCTCCBXAQCQCWAXAXAXAVAQCUAUAPCBBPCUCBBUAZAWAUAPCZA9BRCZAZACB9BSCQCCBX",
      0
    );
  }

  render() {
    console.log(
      "Datamap: ",
      datamap.generate(
        "e4987a0828147beb155a39e59dfe6b1f439566ec89c23a224ed57a10c9beef8d",
        55
      )
    );

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

const mapDispatchToProps = dispatch => ({
  startAppFn: () => dispatch(appActions.startApp()),
  startNode: () => dispatch(nodeActions.addBrokerNode("asdasd")),
  findTreasure: (address, chunkIdx) =>
    dispatch(treasureHuntActions.findTreasure({ address, chunkIdx }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Storage);
