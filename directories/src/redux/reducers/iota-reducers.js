import {
    IOTA_PREPARE_TRANSFERS_SUCCESS,
} from '../actions/action-types';

const initState = {
    iotaTransactionReceive: [],
};

export default (state = initState, action) => {

    switch (action.type) {
        case IOTA_PREPARE_TRANSFERS_SUCCESS:
            // return {
            //     ...state,
            //     iotaTransactionReceive: [...state.iotaTransactionReceive, action.payload]
            // };
            return {
                iotaTransactionReceive: [action.payload]
            };

        default:
            return state;
    }
}
