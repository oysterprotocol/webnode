import CONFIG from "../../../config";

export const EXAMPLE_ACTIONS = Object.freeze({
  INCREMENT: `${CONFIG.APP_NAME}/example/increment`
});

export const exampleActions = Object.freeze({
  increment: () => ({ type: EXAMPLE_ACTIONS.INCREMENT })
});

/**
 * Reducer
 */

const initState = { counter: 0 };

const reducer = (state = initState, action) => {
  switch (action.type) {
    case EXAMPLE_ACTIONS.INCREMENT:
      return { ...state, counter: state.counter + 1 };
    default:
      return state;
  }
};

export default reducer;
