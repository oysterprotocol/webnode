import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeOwnPeerId, addTransaction } from '../actions/index';
import { storageWebNodeAdd } from '../actions/storage-actions'
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


      this.props.storageWebNodeAdd("abc");
      console.log(this.props);

      //test add


    //var connection = this.local_state.peer.connect(this.props.selected_webnode);

//select random addfress


//if the address is webnode wn webnode
      //startTransactionWithWebnode()

//if addfress is broker
    //  startTransactionWithBroker()

      // connection.on('open', function(conn) {
      //   console.log('opening connection to send start transaction message');
      //   connection.send({ request: "START_TRANSACTION", data: "HELLO WEBNODE WORLD", returnAddress:  connection.provider.id});
      // });

      this.iterate();
    });

  }

///
  startTransactionWithWebnode(){
    var connection = this.local_state.peer.connect(this.props.selected_webnode);

    connection.on('open', function(conn) {
      console.log('opening connection to send start transaction message');
      connection.send({ request: "START_TRANSACTION", data: "HELLO WEBNODE WORLD", returnAddress:  connection.provider.id});
    });

    //this.iterate();
  }

  // st(){
  //
  //   call 1
  //   get reutnr
  //   do stuff
  //   call 2
  //   etc...
  // }

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


function receiveMessage(data){

  //TODO:  MOVE INTO SWTCH STATEMENT
  // switch(data.request){
  //
  // }


  if(data.request == "START_TRANSACTION"){
    console.log("we have a transaction to start");

    //put new item transaction table, get the transaction id.


    //get the items


    //EXPLICITLY SEND BACK A MESSAGE:
    var newid = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
    var temp_peer = new Peer(newid, {key: 'lwjd5qra8257b9'});

    var connection = temp_peer.connect(data.returnAddress);

    //add a row to transaction table
    //call Redux


    connection.on('open',function(){
      connection.send({ request: "START_TRANSACTION_RESPONSE", data: "HELLO WEBNODE WORLD BACK"});
    })
    //hACK TO GET IT TO work

  }
  else if(data.request == "START_TRANSACTION_RESPONSE"){
    console.log("oh look they got my request and are now offering a list blahblah");
    //store transaction id, etc
  }


  console.log(data);
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function mapStateToProps(state){
  return{
    selected_webnode: state.selected_webnode,
    own_peer_id: state.nodeinfo,
    storage: state.storage
  };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ changeOwnPeerId: changeOwnPeerId, addTransaction: addTransaction, storageWebNodeAdd: storageWebNodeAdd }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
