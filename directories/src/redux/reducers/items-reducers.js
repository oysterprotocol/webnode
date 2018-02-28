import {
  API_GIVE_PEER_ID,
  API_START_TRANSACTION,
  API_SELECT_NEED
} from '../actions/action-types';

const initState = {
  transaction: { txId: '', items: [] },
  item: {}
};

export default (state = initState, action) => {
  
  if(action.payload) {
    return state;
  }

  switch(action.type) {
    case API_START_TRANSACTION:
      return { ...state, transaction: { txId: action.payload.data.txtid, items: action.payload.data.items } }

    case API_SELECT_NEED:
      return { ...state, item: action.payload.data.item };

    case API_GIVE_PEER_ID:
      return state;
    
    default:
      return state;
  }
}
