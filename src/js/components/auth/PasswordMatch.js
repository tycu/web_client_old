import React from 'react';
import { m } from "../../utils/StyleUtil";

export default class PasswordMatch extends React.Component {

  static propTypes = {
    passwordMatch:  React.PropTypes.string,
    pwError: React.PropTypes.bool
  }

  state = {
    pwError: false,
    passwordMatch: ''
  }

  handlePasswordChange(event) {
    this.props.onUpdate('passwordMatch', event.target.value);
  }

  handleBlur(){
    if (this.props.pwError) {
      this.props.onUpdate('pwError', false)
    }
  }


  render() {
    var styles = {
      input: {
      },
      error: {
        borderColor: 'red'
      }
    };

    return (
      <div className="form-group has-feedback">
        <label htmlFor="password">Confirm Password</label>
        <input
          style={m(styles.container, this.props.pwError && styles.error)}
          type="password"
          value={this.props.passwordMatch}
          onChange={this.handlePasswordChange.bind(this)}
          onBlur={this.handleBlur.bind(this)}
          className="form-control"
          ref="passwordMatch"
          placeholder="Confirm Password" />
          {(this.props.pwError ? (<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>) : (<span></span>))}
      </div>
    );
  }
}
