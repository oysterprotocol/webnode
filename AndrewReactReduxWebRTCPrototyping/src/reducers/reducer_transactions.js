const initialState = {
  transactions: {

  }
}

export default function(state = initialState, action) {

  switch(action.type){
    case 'ADD_TRANSACTION':
      return {
        ...state.byHash,
          [action.payload.id]: action.payload
      }
      //message another webnode here?  I can try.  I will have two buttons then.
  }
  return state;
}
