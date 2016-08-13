import React from "react";
import ChangePassword from '../components/auth/ChangePassword';
import { Link } from "react-router";
export default class Settings extends React.Component {

  render() {

    return (
      <div className="signin jumbotron center-block">
        <h2>Contributions</h2>
        <Link to=''>Setup Card</Link>
      </div>
    );
  }
}
