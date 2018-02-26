import React from 'react';
import Storage from 'components/storage/';
import Peer from 'peerjs';

class Root extends React.Component {
  render() {
  	let client = 'client-test' + Math.random() * 100 - 23;
  	const peer = new Peer(
  		client, {host: 'localhost', port: 8000, path: '/peer', debug: 3}
  	);
    return (
    	<div className="App">
  			<Storage peer={peer} />
 		</div>
    )
  }
}

export default Root;
