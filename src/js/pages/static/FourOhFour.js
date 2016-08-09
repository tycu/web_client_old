import React from "react";

export default class FourOhFour extends React.Component {
  render() {

    const styles = {
      padding: '40px',
      margin: '0 auto',
      backgroundColor: '#fff',
      width: '500px',
      height: '300px'
    }

    return (
      <div style={styles}>
        <h2>Oops that is a 404</h2>
        <p>We are sorry. That resource was not found.</p>
        <p>How about you check out some <a href='/'>Events</a>?</p>
      </div>
    );
  }
}
