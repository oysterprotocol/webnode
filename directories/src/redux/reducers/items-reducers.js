import {
    API_GIVE_PEER_ID,
    API_START_TRANSACTION,
    API_SELECT_NEED
} from '../actions/action-types';

import {
    API_REQUEST_ERROR
} from '../../config/';

const initState = {
    transaction: {txId: '', items: []},
    item: {}
};

export default (state = initState, action) => {

    const payload = action.payload;
    if (payload && payload.error === API_REQUEST_ERROR) {
        action.type = API_REQUEST_ERROR;
    }

    switch (action.type) {

        case API_START_TRANSACTION:
            return {...state, transaction: {txId: payload.data.txtid, items: payload.data.items}};

        case API_SELECT_NEED:
            return {...state, item: action.payload.data};

        case API_GIVE_PEER_ID:
            return state;

        default:
            return state;
    }
}
