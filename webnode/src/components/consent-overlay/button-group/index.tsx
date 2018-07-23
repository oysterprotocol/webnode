import * as React from "react";
import color from "colors";

interface ButtonProps {
  onClick: () => void;
  children: any;
  kind: string;
}

interface ButtonState {
}

class Button extends React.Component<ButtonProps, ButtonState> {
  render() {
    const style = {
      base: {
        cursor: "pointer",
        borderRadius: 12,
        outline: "none",
        padding: 0,
        fontFamily: "Poppins",
        fontSize: 23,
        fontWeight: 600,
        minWidth: 300,
        width: "100%",
        height: 50,
        margin: 15,
        "@media (max-width: 1200px)": {
          fontSize: 16,
          margin: 5,
          borderRadius: 8,
          height: 40,
          minWidth: 180
        }
      } as CSSProperties
    };
    const { onClick, children } = this.props;
    // TODO base[kind]
    return (
      <button onClick={onClick} style={style.base}>
        {children}
      </button>
    );
  }
}

interface ButtonGroupProps {
  giveConsent: () => void;
  denyConsent: () => void;
}

interface ButtonGroupState {
}

class ButtonGroup extends React.Component<ButtonGroupProps, ButtonGroupState> {
  render() {
    const style = {
      continue: {
        background: "#088ffc",
        color: "#ffffff",
        ":hover": {
          background: color("#088ffc")
            .lighten(0.2)
            .hexString()
        },
        border: "none"
      } as CSSProperties,
      deny: {
        background: "#ffffff",
        color: "#f76868",
        borderColor: "#f76868",
        borderStyle: "solid",
        ":hover": {
          color: color("#f76868")
            .lighten(0.2)
            .hexString(),
          borderColor: color("#f76868")
            .lighten(0.2)
            .hexString()
        }
      } as CSSProperties,
      containerDesktop: {
        marginRight: 0,
        listStyleType: "none",
        width: "15%",
        minWidth: 200,
        "@media (max-width: 1200px)": {
          display: "none"
        }
      } as CSSProperties,
      containerMobile: {
        marginRight: 0,
        flexDirection: "row",
        display: "flex",
        width: "90%",
        minWidth: 200,
        "@media (min-width: 1201px)": {
          display: "none"
        }
      } as CSSProperties
    };
    const { giveConsent, denyConsent } = this.props;
    return (
      <div>
        <div style={style.containerDesktop}>
          <li>
            {" "}
            <Button onClick={giveConsent} kind="continue">
              Continue Ad-Free
            </Button>
          </li>
          <li>
            {" "}
            <Button onClick={denyConsent} kind="deny">
              Deny Consent
            </Button>
          </li>
        </div>
        <div style={style.containerMobile}>
          <Button onClick={giveConsent} kind="continue">
            Continue Ad-Free
          </Button>
          <Button onClick={denyConsent} kind="deny">
            Deny Consent
          </Button>
        </div>
      </div>
    );
  }
}

export default ButtonGroup;
