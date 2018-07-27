import * as React from "react";
import Storage from "./storage";

interface RootProps {
}

class Root extends React.Component<RootProps, {} > {
  render() {
    return (
      <div className="App">
        <Storage />
      </div>
    );
  }
}

export default Root;
