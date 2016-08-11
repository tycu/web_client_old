import React from 'react';
import { m } from "../../utils/StyleUtil";

export default class OldPassword extends React.Component {

  static propTypes = {
    oldPassword:  React.PropTypes.string,
    oldPasswordError: React.PropTypes.bool
  }

  state = {
    oldPasswordError: false,
    oldPassword: ''
  }

  handleBlur(){
    if (this.props.oldPasswordError) {
      this.props.onUpdate('oldPasswordError', false);
    }
  }

  handleOldPasswordChange(event) {
    this.props.onUpdate('oldPassword', event.target.value);
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
        <label htmlFor="oldPassword">Old Password</label>
        <input
        style={m(styles.container, this.props.oldPasswordError && styles.error)}
        type="password"
        id="oldPassword"
        value={this.props.oldPassword}
        onChange={this.handleOldPasswordChange.bind(this)}
        onBlur={this.handleBlur.bind(this)}
        className="form-control"
        ref="oldPassword"
        placeholder="Old Password" />
        {(this.props.oldPasswordError ? (<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>) : (<span></span>))}
      </div>
    );
  }
}
