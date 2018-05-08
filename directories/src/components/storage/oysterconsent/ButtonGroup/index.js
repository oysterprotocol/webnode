import React from "react";

const ButtonGroup = () => (
  <div style={ButtonGroupStyle.container}>
    <li>
      {" "}
      <button style={ButtonGroupStyle.continueButton}>Continue Ad-Free</button>
    </li>
    <li>
      {" "}
      <button style={ButtonGroupStyle.denyButton}>Deny Consent</button>
    </li>
  </div>
);

const ButtonGroupStyle = {
  container: {
    listStyleType: "none",
    display: "inline-block",
    verticalAlign: "middle",
    right: 5
  },
  continueButton: {
    background: "#088ffc",
    color: "#ffffff",
    borderRadius: 12,
    padding: 0,
    fontFamily: "Poppins",
    fontSize: 23,
    fontWeight: 600,
    border: "none",
    width: 350,
    height: 50
  },
  denyButton: {
    background: "#ffffff",
    color: "#f76868",
    borderRadius: 12,
    padding: 0,
    fontFamily: "Poppins",
    fontSize: 23,
    fontWeight: 600,
    border: "none",
    width: 350,
    height: 50
  }
};
export default ButtonGroup;
