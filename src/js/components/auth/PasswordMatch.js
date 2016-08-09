import React from 'react';

export default class PasswordMatch extends React.Component {

  static propTypes = {
    passwordMatch:  React.PropTypes.string
  }

  handlePasswordChange(event) {
    this.props.onUpdate('passwordMatch', event.target.value);
  }


  render() {
    return (
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" value={this.props.passwordMatch} onChange={this.handlePasswordChange.bind(this)} className="form-control" ref="passwordMatch" placeholder="Confirm Password" />
      </div>
    );
  }
}
