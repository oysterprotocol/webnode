export default function(state = null, action){

  switch(action.type){
    case 'CHANGE_SELECTED_NODE':
      return action.payload;
      //message another webnode here?  I can try.  I will have two buttons then.
  }
  return state

}
