import React from "react";
import styled from "styled-components";

const Button = styled.button`
  border: none;
  border-radius: 12px;
  cursor: pointer;
  outline: none;
  padding: 0;
  font-family: Poppins;
  font-size: 23px;
  font-weight: 600;
  min-width: 300px;
  width: 100%;
  height: 50px;
  margin: 15px;
  @media (max-width: 1200px) {
    font-size: 16px;
    margin: 5px;
    border-radius: 8px;
    height: 40px;
    min-width: 180px;
  }
`;

const ContinueButton = Button.extend`
  color: white;
  background: rgba(8, 143, 252);
  background: #088ffc;
  :hover: {
    background: #088ffc;
  }
  border: none;
`;

const DenyButton = Button.extend`
  background: #ffffff;
  border-color: #f76868;
  border-width: 1px;
  color: #f76868;
  border-style: solid;
  :hover: {
    background: #f76868;
    border-color: #f76868;
  }
`;

const DesktopContainer = styled.div`
  margin-right: 0;
  list-style-type: none;
  width: 15%;
  min-width: 200px;
  @media (max-width: 1200px) {
    display: none;
  }
`;

const MobileContainer = styled.div`
  margin-right: 0;
  flex-direction: row;
  display: flex;
  width: 90%;
  min-width: 200px;
  @media (min-width: 1201px) {
    display: none;
  }
`;

const ButtonGroup = ({ giveConsent, denyConsent }) => (
  <div>
    <DesktopContainer>
      <li>
        {" "}
        <ContinueButton onClick={giveConsent}>Continue Ad-Free</ContinueButton>
      </li>
      <li>
        {" "}
        <DenyButton onClick={denyConsent}>Deny Consent</DenyButton>
      </li>
    </DesktopContainer>
    <MobileContainer>
      <ContinueButton onClick={giveConsent}>Continue Ad-Free</ContinueButton>
      <DenyButton onClick={denyConsent}>Deny Consent</DenyButton>
    </MobileContainer>
  </div>
);

export default ButtonGroup;
