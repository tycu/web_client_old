import React from "react";
import { Link } from "react-router";
export default class ManageEvents extends React.Component {

  render() {

    return (
      <div className="jumbotron center-block">
        <h2>Manage Events</h2>
        <Link to='new_event'>New Event</Link>


      </div>
    );
  }
}
