

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeSelectedWebnode } from '../actions/index';
import { bindActionCreators } from 'redux';

class SelectedWebnode extends Component{

    render(){
      return (
        <div>
          blahblah//blah blah {this.props.selectedNode}
        </div>
      )
    }
}

function mapStateToProps(state){
  return{
    webnode: state.webnode_addresses,
    peerid: state.nodeinfo,
    selectedNode: state.selected_webnode
  };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ changeSelectedWebnode: changeSelectedWebnode}, dispatch)
}



export default connect(mapStateToProps, mapDispatchToProps)(SelectedWebnode);
