import {
    IOTA_POW_SUCCESS,
} from '../actions/action-types';

const initState = {
    powResults: [],
};

export default (state = initState, action) => {

    switch (action.type) {
        case IOTA_POW_SUCCESS:
            // return {
            //     ...state,
            //     powResults: [...state.powResults, action.payload]
            // };
            return {
                powResults: [action.payload]
            };

        default:
            return state;
    }
}
