import React, { Component } from 'react';

import WebnodeList from '../containers/webnode-list';

export default class App extends Component {

  //I am just playing around, so I can work with Ladislav and learn react/redux
  //this componenet has a local state while our directories and other things are defined via redux
    state = {
        nodeinfo: '4lm8oxkap02ro1or',
        counter: 0
      };


  //this is for learning 'loops'.  it is based on a timer
  //I was thinking of doing this every 30 seconds.
  componentDidMount() {
      var exit = false;
      this.iterate();
      //we can loop in here and 'engage in exchanges'
    //  while(!exit){

    //  }
    }

  iterate(){
    sleep(500).then(() => {

      console.log("iterating");
      this.iterate();
    });

  }

  render() {
    return (
      <div>
        <WebnodeList />
      </div>
    );
  }
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
