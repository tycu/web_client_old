import React from "react";
import { Link } from "react-router";
export default class Settings extends React.Component {

  render() {

    return (
      <div className="jumbotron center-block">
        <h2>Settings</h2>
        <Link to='change_password'>Change Password</Link>
        <br/>
        <Link to='user_profile'>User Profile</Link>
      </div>
    );
  }
}
