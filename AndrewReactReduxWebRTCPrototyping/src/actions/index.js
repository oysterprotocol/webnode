

export function changeSelectedWebnode(webnode){
  return{
    type: 'CHANGE_SELECTED_NODE',
    payload: webnode
  };
}

export function changeOwnPeerId(peerid){
  return{
    type: 'CHANGE_OWN_PEERID',
    payload: peerid
  };
}

export function addTransaction(txid, need_wanted){
  return{
    type: 'ADD_TRANSACTION',
    payload: { id: txid, need: need_wanted }
  };
}
