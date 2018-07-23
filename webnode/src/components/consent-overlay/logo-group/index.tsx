import * as React from "react";

interface LogoGroupProps {
}

interface State {
}

class LogoGroup extends React.Component<LogoGroupProps, State> {
  render() {
    const style = {
      container: {
        width: "20%",
          flexDirection: "column",
          justifyContent: "space-around",
          "@media (max-width: 1200px)": {
            display: "none"
          }
      } as CSSProperties,
      text: {
        fontFamily: "Poppins",
        fontSize: 32,
        fontWeight: 600,
        paddingTop: 25,
        lineHeight: 1.25,
        color: "#088ffc"
      } as CSSProperties,
      logo: {
        height: 100
      } as CSSProperties
    };
    return (
      <div style={style.container}>

        <div style={style.text}>Oyster Protocol in use</div>
      </div>
    );
  }
}

export default LogoGroup;
