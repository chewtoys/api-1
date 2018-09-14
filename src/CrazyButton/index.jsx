import React from 'react';
import SignIn from "./icon/signIn";
import "./styles/index.css";

export default class CrazyButton extends React.PureComponent {
  render() {
    return(
      <div className="crazy-button">
        <SignIn />
      </div>
    )
  }
}