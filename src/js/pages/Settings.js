import React from "react";
import SignInActions from '../actions/SignInActions';

export default class Settings extends React.Component {

  render() {

    return (
      <div>
        <h2>Settings</h2>
        <p>logged in {SignInActions.signedIn()}</p>
      </div>
    );
  }
}
