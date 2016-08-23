import React from "react";
import { Link } from "react-router";

export default class Admin extends React.Component {

  render() {
    const style = {
      container: {
        padding: '20px',
        background: 'white',
        width: '490px',
        borderRadius: '2px'
      }
    }
    // NOTE https://github.com/tallyus/admin/blob/develop/endpoints.js
    // https://admin.tally.us/
    return (
      <div style={style.container} className="jumbotron center-block">
        <h2>Tally Admin</h2>
        <div>
          <b>Data</b><br/>
          <Link to='manage_events'>Manage Events</Link><br/>
          <Link to='manage_politicians'>Manage Politicians</Link><br/>
          <Link to='manage_pacs'>Manage Pacs</Link>
        </div>
        <br/>
        <div>
          <b>Tools</b><br/>
          <span>Send push notification (disabled)</span>
        </div>
        <br/>
        <div>
          <b>Reports</b><br/>
          <Link to='contributions'>Contributions</Link>
        </div>
      </div>
    );
  }
}
