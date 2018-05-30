import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import Footer from "./components/footer";
import Root from "./components/root";

import { store, persistor } from "./redux";

const App = ({ ethAddress }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Footer ethAddress={ethAddress} />
    </PersistGate>
  </Provider>
);

if (!module.parent) {
  const script = document.currentScript;
  const ethAddress = script.getAttribute("eth-address");
  if (!!ethAddress) {
    console.log("Oyster Webnode initialized.");
    ReactDOM.render(
      <App ethAddress={ethAddress} />,
      document.body.appendChild(document.createElement("div"))
    );
  } else {
    console.log(
      "Oyster Webnode must be initialized with an 'eth-address' attribute, please remember to specify this attribute in the script tag."
    );
  }
}
