import React from "react";
import { Link } from "react-router";

export default class Admin extends React.Component {

  render() {
    const style = {
      container: {
        padding: '20px',
        background: 'white',
        width: '820px',
        borderRadius: '2px'
      }
    }

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
          <Link to='breaking_news_alert'>Set Breaking News Header</Link><br/>
          <div>Send Chrome Notification of Breaking News Alert (need to build)</div>

        </div>
        <br/>
        <div>
          <b>Reports</b><br/>
          <Link to='contribution_report'>Contribution Report</Link>
        </div>
      </div>
    );
  }
}
