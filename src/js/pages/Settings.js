import React from "react";
import LoginActions from '../actions/LoginActions';

export default class Settings extends React.Component {

  render() {

    return (
      <div>
        <h2>Settings</h2>
        <p>logged in {LoginActions.signedIn()}</p>
      </div>
    );
  }
}
