

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeSelectedWebnode } from '../actions/index';
import { bindActionCreators } from 'redux';
import SelectedWebnode from './selected-node';

class WebnodeList extends Component{

    renderList(){
      return this.props.webnodes.map((webnode)=>{
        return(
            <li

            onClick={()=> this.props.changeSelectedWebnode(webnode.address)}
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
          Sending 'hi' to: {this.props.selected_webnode}
          <SelectedWebnode />
        </div>

    )
    }
}

function mapStateToProps(state){
  return{
    webnodes: state.webnode_addresses,
    peerid: state.nodeinfo,
    selected_webnode: state.selected_webnode
  };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ changeSelectedWebnode: changeSelectedWebnode}, dispatch)
}



export default connect(mapStateToProps, mapDispatchToProps)(WebnodeList);
