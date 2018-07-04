import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import Overlay from "./components/overlay";

import { store, persistor } from "./redux";
import { SCRIPT_ATTRIBUTE_ETH_ADDRESS } from "./config";

const App = ({ ethAddress }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <div>xxxxxxxxxx</div>
    </PersistGate>
  </Provider>
);

if (!module.parent) {
  const script = document.currentScript;
  const ethAddress = script.getAttribute(SCRIPT_ATTRIBUTE_ETH_ADDRESS);
  if (!!ethAddress) {
    console.log("Oyster Webnode initialized.");
    global.App = App;
    global.ReactDOM = ReactDOM;
    ReactDOM.render(
      <App ethAddress={ethAddress} />,
      document.body.appendChild(document.createElement("div"))
    );
  } else {
    console.log(
      `Oyster Webnode must be initialized with an ${SCRIPT_ATTRIBUTE_ETH_ADDRESS} attribute, please remember to specify this attribute in the script tag.`
    );
  }
}
