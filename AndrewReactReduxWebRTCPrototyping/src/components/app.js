import React, { Component } from 'react';
import { connect } from 'react-redux';

import WebnodeList from '../containers/webnode-list';

class App extends Component {

  //I am just playing around, so I can work with Ladislav and learn react/redux
  //this componenet has a local state while our directories and other things are defined via redux
    state = {
        nodeinfo: '4lm8oxkap02ro1or',
        peer: null,
        counter: 0
      };


  //this is for learning 'loops'.  it is based on a timer
  //I was thinking of doing this every 30 seconds.
  componentDidMount() {
      var exit = false;

      //
      this.createPeer();



      this.iterate();
      //we can loop in here and 'engage in exchanges'
    //  while(!exit){

    //  }
    }

  createPeer(){

    //get id (time stamp maybe)
    var newid = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
    //var newid = "test1";

    //key is an api key, move to config
    this.state.peer = new Peer(newid, {key: 'lwjd5qra8257b9'});

    //getting our peer id (this is where we would add it to the redux table)
    this.state.peer.on('open', function(id) {
      console.log('My peer ID is: ' + id);
      });

    //listening to other nodes, for now they will just say hi.
    this.state.peer.on('connection', receiveMessage);
  }

  iterate(){
    sleep(20000).then(() => {

      console.log("iterating");

      //say hi
      var connection = this.state.peer.connect(this.props.selected_webnode);
      connection.on('open',function(){
        connection.send("Hi!");
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

function receiveMessage(data){
    console.log('Received', data)
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function mapStateToProps(state){
  return{
    selected_webnode: state.selected_webnode
  };
}

export default connect(mapStateToProps)(App);
