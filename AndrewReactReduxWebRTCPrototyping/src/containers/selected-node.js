

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeSelectedWebnode } from '../actions/index';
import { bindActionCreators } from 'redux';
//import { TextInput } from 'react-native';

class SelectedWebnode extends Component{

  //constructor so we can play around with containers this way
  constructor(props){
      super(props);
      this.state ={ selectedNodeAddress: ''};
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    console.log('trying at least');
    this.setState({ selectedNodeAddress: event.target.value });
    this.props.changeSelectedWebnode(event.target.value);
  }


  render(){
    return (
      <div>

          <input
            type="text"
            value={this.state.selectedNodeAddress}
            onChange={ this.handleSubmit } />
            {this.state.selectedNodeAddress}
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
