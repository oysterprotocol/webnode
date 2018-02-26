

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
