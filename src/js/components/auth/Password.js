import React from 'react';
import { m } from "../../utils/StyleUtil";

export default class Password extends React.Component {

  static propTypes = {
    password:  React.PropTypes.string,
    pwError: React.PropTypes.bool
  }

  state = {
    pwError: false,
    password: ''
  }

  handleBlur(){
    if (this.props.pwError) {
      this.props.onUpdate('pwError', false);
    }
  }

  handlePasswordChange(event) {
    this.props.onUpdate('password', event.target.value);
  }


  render() {
    var styles = {
      input: {
      },
      error: {
        borderColor: 'red'
      }
    };
    const title = this.props.title || 'Password';
    var placeholder = this.props.title || 'password';
    if (placeholder) {
      placeholder.toLowerCase();
    }

    return (
      <div className="form-group has-feedback">
        <label htmlFor="password">{title}</label>
        <input
        style={m(styles.container, this.props.pwError && styles.error)}
        type="password"
        id="password"
        value={this.props.password}
        onChange={this.handlePasswordChange.bind(this)}
        onBlur={this.handleBlur.bind(this)}
        className="form-control"
        ref="password"
        placeholder={placeholder} />
        {(this.props.pwError ? (<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>) : (<span></span>))}
      </div>
    );
  }
}
