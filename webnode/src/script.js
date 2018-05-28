import { store } from "./redux";
import appActions from "./redux/actions/app-actions";

// exports.start = () => {
// console.log("when loaded as an npm module");
// store.dispatch(appActions.startApp());
// };

if (!module.parent) {
  const script = document.currentScript;
  const ethAddress = script.getAttribute("eth-address");
  if (!!ethAddress) {
    console.log("Oyster Webnode initialized.");
    // store.dispatch(appActions.startApp());
  } else {
    console.log(
      "Oyster Webnode must be initialized with an 'eth-address' attribute, please remember to specify this attribute in the script tag."
    );
  }
}
