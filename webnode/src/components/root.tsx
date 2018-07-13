import * as React from "react";
import Storage from "./storage";

interface RootProps {
}

interface State {
}

class Root extends React.Component<RootProps, State> {
  render() {
    return (
      <div className="App">
        <Storage />
      </div>
    );
  }
}

export default Root;
