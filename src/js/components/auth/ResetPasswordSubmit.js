import React from "react";

export default class ResetPasswordSubmit extends React.Component {
  render() {

    const styles = {
      padding: '40px',
      margin: '0 auto',
      backgroundColor: '#fff',
      width: '500px',
      height: '300px'
    }

    // TODO add apple inspired reset checkmark (green to this page)
    return (
      <div style={styles}>
        <h2>Your password has been updated.</h2>
        <p>Thank you for helpnig us keep Tally.us secure.</p>
        <p><a href='/'>Done</a></p>
      </div>
    );
  }
}
