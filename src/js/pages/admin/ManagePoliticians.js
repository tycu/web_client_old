import React from "react";
import { Link } from "react-router";
export default class ManagePoliticians extends React.Component {

  render() {

    return (
      <div className="jumbotron center-block">
        <h2>Manage Politicians</h2>
        <Link to='new_event'>New Politician</Link>


      </div>
    );
  }
}
