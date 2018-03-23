export const APP_START = "directories/app/start";

const ACTIONS = Object.freeze({
  // actions
  APP_START,

  // actionCreators
  startApp: () => ({
    type: APP_START
  })
});

export default ACTIONS;
