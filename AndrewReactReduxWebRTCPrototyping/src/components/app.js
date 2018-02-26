import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeOwnPeerId, addTransaction } from '../actions/index';
import { bindActionCreators } from 'redux';

import WebnodeList from '../containers/webnode-list';


class App extends Component {

  //I am just playing around, so I can work with Ladislav and learn react/redux
  //this componenet has a local state while our directories and other things are defined via redux
    local_state = {
        peer: null
      };

  //on load
  componentDidMount() {
      this.createPeer();
      this.iterate();

    }

  createPeer(){

    //get id (time stamp maybe)
    var newid = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
    //var newid = "test1";

    //key is an api key, move to config
    this.local_state.peer = new Peer(newid, {key: 'lwjd5qra8257b9'});

    //getting our peer id (this is where we would add it to the redux table)
    this.local_state.peer.on('open', this.handlePeerInitiation.bind(this));

    //listening to other nodes, for now they will just say hi.
    this.local_state.peer.on('connection', function(conn){
          console.log('Connection Established with: ', conn.peer);

          conn.on('data', receiveMessage);
    });
  }

//I pulled the handler out like this because it is one way of accesising the local state and props.
//it is bound above
  handlePeerInitiation = () => {
    console.log(this.local_state);
    this.props.changeOwnPeerId(this.local_state.peer.id);
  }

  iterate = () => {
    sleep(20000).then(() => {

      console.log("iterating");
      console.log(this.props);

      var connection = this.local_state.peer.connect(this.props.selected_webnode);

      // connection.on('open', function(conn) {
      //
      //   //state no longer in scope.  Not sure how to get it from redux.
      //   console.log(this.props);
      //   connection.send({ request: "START_TRANSACTION", data: "HELLO WEBNODE WORLD", returnAddress: this.props.own_peer_id });
      // });
      connection.on('open', function(conn) {
        console.log('opening connection to send start transaction message');
        console.log(connection);
        //state no longer in scope.  Not sure how to get it from redux.
        console.log(this.props);
        connection.send({ request: "START_TRANSACTION", data: "HELLO WEBNODE WORLD", returnAddress:  connection.provider.id});
      });

      this.iterate();
    });

  }

  render() {
    return (
      <div>
        <WebnodeList />
        <p>
          {this.props.selected_webnode}
        </p>
      </div>
    );
  }
}


function receiveMessage(data, local_peer){

  //getr request type
  if(data.request == "START_TRANSACTION"){
    console.log("we have a transaction to start");

    //put new item transaction table, get the transaction id.
    

    //get the items
    //IF WE HAVE TO EXPLICITLY SEND BACK A MESSAGE IT WILL LOOK SOMETHING LIKE:
    var newid = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
    var temp_peer = new Peer(newid, {key: 'lwjd5qra8257b9'});

    var connection = temp_peer.connect(data.returnAddress);

    //add a row to transaction table
    //call Redux


    connection.on('open',function(){
      connection.send({ request: "START_TRANSACTION_RESPONSE", data: "HELLO WEBNODE WORLD BACK"});
    })
    //hACK TO GET IT TO work


    //send a message to the sending node, or return
  }
  else if(data.request == "START_TRANSACTION_RESPONSE"){
    console.log("oh look they got my request and are now offering a list blahblah");
  }
  //switch

  //case start transaction
  //case select item

  console.log(data);
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function mapStateToProps(state){
  return{
    selected_webnode: state.selected_webnode,
    own_peer_id: state.nodeinfo
  };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ changeOwnPeerId: changeOwnPeerId, addTransaction: addTransaction }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
