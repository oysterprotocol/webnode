import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

import { store, persistor } from "./redux";
import Root from "./components/root";

import "./index.css";

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Root />
    </PersistGate>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
