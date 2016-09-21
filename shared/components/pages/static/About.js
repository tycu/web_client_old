import React from "react";

export default class About extends React.Component {
  render() {
    const styles = {
      padding: '40px',
      margin: '0 auto',
      backgroundColor: '#fff',
      width: '800px',
      height: '400px'
    };

    return (
      <div style={styles}>
        <h2>About Tally.us</h2>
        <p>Tally is a website for...</p>
      </div>
    );
  }
}
