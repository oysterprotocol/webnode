

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sayHiViaWebRTC } from '../actions/index';
import { bindActionCreators } from 'redux';

class WebnodeDirectory extends Component{

    renderList(){
      return this.props.webnodes.map((webnode)=>{
        return(
            <li
            //just learning but this will send a webrtc message to the node.
            onClick={()=> this.props.sayHiViaWebRTC(webnode)}
            key={webnode.address} className="list-group-item">{webnode.address}</li>
        );
      });
    }
    render(){
      return (
      <ul className="list-group col-sm-4">
        {this.renderList()}
      </ul>
    )
    }
}

function mapStateToProps(state){
  return{
    webnodes: state.webnode_addresses
  };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ selectBook: selectBook}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(WebnodeDirectory);
