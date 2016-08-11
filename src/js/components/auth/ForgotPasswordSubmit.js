import React from "react";

export default class ForgotPasswordSubmit extends React.Component {
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
        <h2>Email has been sent.</h2>
        <p>When you receive your sign in information, follow the directions in the email to reset your password.</p>
        <p><a href='/'>Done</a></p>
      </div>
    );
  }
}
