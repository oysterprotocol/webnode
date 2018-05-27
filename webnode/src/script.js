import { store } from "./redux";
import appActions from "./redux/actions/app-actions";

// exports.start = () => {
// console.log("when loaded as an npm module and called");
// };

if (!module.parent) {
  console.log("when loaded as a script");
  // store.dispatch(appActions.startApp());
}
