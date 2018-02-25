

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sayHiViaWebRTC } from '../actions/index';
import { bindActionCreators } from 'redux';

class WebnodeList extends Component{

    renderList(){
      return this.props.webnodes.map((webnode)=>{
        return(
            <li

            onClick={()=> this.props.sayHiViaWebRTC(webnode)}
            key={webnode.address} className="list-group-item">{webnode.address}</li>
        );
      });
    }
    render(){
      return (
        <div>
          <ul className="list-group col-sm-4">
            {this.renderList()}
          </ul>
          blah blah {this.props.nodeinfo}
        </div>

    )
    }
}

function mapStateToProps(state){
  return{
    webnodes: state.webnode_addresses,
    peerid: state.nodeinfo
  };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ sayHiViaWebRTC: sayHiViaWebRTC}, dispatch)
}



export default connect(mapStateToProps, mapDispatchToProps)(WebnodeList);
