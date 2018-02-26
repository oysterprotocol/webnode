import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sha256 from 'sha256';

class StorageBootstrap extends Component {

  constructor(props) {
    super(props);

    const {
      storage,
      storageBrokerNodeAddFn, 
      storageWebNodeAddFn,
      storageGenesisHashAddFn,
      storageExchangesAddFn,
      storagePeerIdChangeFn,
      peerId,
      peer
    } = props;

    console.log('DEMO 0');
    console.log('Storage BrokerNode -> ' + storage.brokerNode);
    console.log('Storage WebNode -> ' + storage.webNode);
    console.log('Storage GenesisHash -> ' + storage.genesisHash);

    storageBrokerNodeAddFn('Next BrokerNode');
    storageWebNodeAddFn('Next WebNode');
    storageGenesisHashAddFn('Next GenesisHash');
    storageExchangesAddFn('transaction_id_0', 'BrokerNode1');
    storageExchangesAddFn('transaction_id_1', 'BrokerNode2');
    storageExchangesAddFn('transaction_id_2', 'BrokerNode3');
    storagePeerIdChangeFn('peer-client');

    this._getRandomItemFn(storage);

    console.log('DEMO 1');
    const randomStorage = this._getRandomStorageFn();
    console.log('randomStorage ' + randomStorage);
    storage.exchanges.map((item) => console.log('exchanges transaction_id ' + item.transaction_id + " need_requested " + item.need_requested));
    console.log('peerId ' + storage.peerId);

    console.log('DEMO 2');
    console.log('Hash ' + sha256('hash256'));

    const prepareList = storage.exchanges.map((item) => item.transaction_id);
    console.log('prepareList');
    prepareList.map((item) => console.log('item ' + item));

    const listHash = this._hashListFn(prepareList);
    console.log('hashList');
    listHash.map((item) => console.log('hashItem ' + item));
    
    console.log('same list return -1 -> ' + this._compareListFn(prepareList, prepareList));
    
    const mergeStorage = this._compareListFn(prepareList, listHash);
    console.log('diffrent list -> ');
    console.log(mergeStorage);

    console.log('DEMO 3');
    peer.on('open', function(id) {
      console.log('Peer ID -> ' + id);
    });

    peer.on('error', function(id) {
      console.log('Peer ID -> ' + id);
    });

    peer.on('connection', function(conn) {
      conn.on('data', function(data) {
        const { request_type, need_type } = data;
        console.log('Received data ->  RequestType -> ' + request_type + ' | need_type -> ' + need_type);
        storageExchangesAddFn(request_type, need_type);
      });
    });
  }

  _jsonToObjectFn(jsonObject) {
    let object = null;
    if(jsonObject !== undefined && jsonObject !== null) {
      object = JSON.parse(JSON.stringify(jsonObject));
    }
    return object;
  }

  _compareListFn(list, compareList) {
    const compareListKeys = Object.keys(compareList);
    let compare = [];
    for(let i = 0; i < compareListKeys.length; i++) {
      const listValue = list[i];
      const compareListValue = compareList[i];
      if(listValue !== compareListValue) {
        compare.push(compareListValue);
      }
    }
    
    if(compare.length === 0)
      return -1;
    return compare;
  }

  _hashListFn(list) {
    return list.map((item) => sha256(item));
  }

  _getRandomStorageFn() {
    const random = this._randomFn(2);
    const storageTitle = this._getStorageNameFn(random);
    return storageTitle;
  }

  _getStorageNameFn(random) {
    let storageTitle = '';
    switch(random){
      case 0:
        storageTitle = 'broker_address';
        break;
      case 1:
        storageTitle = 'webnode_address';
        break;
      case 2:
        storageTitle = 'genesis_hash';
        break;
      default:
        storageTitle = '_getStorageTitleFn -> default';
    }
    return storageTitle;
    
  }

  _getRandomItemFn(storage) {
    const storageRandom = this._randomFn(1);
    console.log('Random number storage ->' + storageRandom);
    
    const storageType = this._getStorageFn(storage, storageRandom);
    const storageTitle = this._getStorageTitleFn(storageRandom);
    const storageCount = storageType.length;
    console.log('StorageType -> ' + storageType);
    console.log('StorageTypeCount -> ' + storageCount);
    
    const itemRandom =this._randomFn(storageCount)
    console.log('Random number item -> ' + itemRandom);

    const storageItem = this._getItemFn(storageType, itemRandom);
    console.log('StorageItem -> ' + storageItem + ' -> from -> ' + storageTitle);
  }

  _getItemFn(storage, random) {
    return storage[random];
  }

  _getStorageTitleFn(random) {
    let storageTitle = '';
    switch(random){
      case 0:
        storageTitle = 'storage.brokerNode';
        break;
      case 1:
        storageTitle = 'storage.webNode';
        break;
      case 2:
        storageTitle = 'storage.genesisHash';
        break;
      default:
        storageTitle = '_getStorageTitleFn -> default';

    }
    return storageTitle;
  }

  _getStorageFn(storage, random) {
    let storageType = [];
    if(random === 0) {
      storageType = storage.brokerNode;
    } else {
      storageType = storage.webNode
    }
    return storageType;
  }

  _randomFn(maxNumber) {
    const random = Math.floor(Math.random() * (maxNumber + 1));
    return random;
  }

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

StorageBootstrap.propTypes = {
    peerId: PropTypes.string,
    storage: PropTypes.object.isRequired,
    storageBrokerNodeAddFn: PropTypes.func.isRequired, 
    storageWebNodeAddFn: PropTypes.func.isRequired,
    storageGenesisHashAddFn: PropTypes.func.isRequired,
    storageExchangesAddFn: PropTypes.func.isRequired,
    storagePeerIdChangeFn: PropTypes.func.isRequired
};

StorageBootstrap.defaultProps = {
    peerId: 'not initialized',
    connectedPeers: [],
};

export default StorageBootstrap;
