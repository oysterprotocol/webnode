

export function changeSelectedWebnode(webnode){
  return{
    type: 'CHANGE_SELECTED_NODE',
    payload: webnode
  };
}
