import React, { Component } from 'react';

class App extends Component {

  onSubmit(e) {
    e.preventDefault();

    const { peer } = this.props;
    const { peerId, message } = this.refs;

    const conn = peer.connect(peerId.value);
    const val = message.value;

    conn.on('open', function(){
      conn.send({'request_type': val, 'need_type': val});
    });
  }

  render(props) {
    const { peer } = this.props;
    peer.on('open', function(id) {
      console.log('Peer ID -> ' + id);
    })

    peer.on('connection', function(conn) {
      conn.on('data', function(data){
        console.log('Received data -> ' + data.request_type);
      });
    });

    return (
      <div className="App">
          <form onSubmit={this.onSubmit.bind(this)}>
            <div>
              <label>Peer id</label>
              <input type="text" ref="peerId" />
              <label>Message</label>
              <input type="text" ref="message" />
            </div>
            <input type="submit" value="submit" />
          </form>
      </div>
    );
  }
}

export default App;
