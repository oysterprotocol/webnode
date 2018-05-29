export const APP_START = "directories/app/start";

const ACTIONS = Object.freeze({
  // actions
  APP_START,

  // actionCreators
  startApp: ethAddress => ({
    type: APP_START,
    payload: ethAddress
  })
});

export default ACTIONS;
