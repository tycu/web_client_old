import React from 'react';
import { m } from "../../utils/StyleUtil";

export default class Email extends React.Component {

  static propTypes = {
    email:  React.PropTypes.string,
    emailError: React.PropTypes.bool
  }

  state = {
    emailError: false,
    email: ''
  }

  handleEmailChange(event) {
    this.props.onUpdate('email', event.target.value);
  }

  handleBlur(){
    if (this.props.emailError) {
      this.props.onUpdate('emailError', false)
    }
  }


  render() {
    const {email} = this.props;

    var styles = {
      input: {
      },
      error: {
        borderColor: 'red'
      }
    };

    return (
      <div className="form-group has-feedback">
        <label htmlFor="email">Email</label>
        <input
          autoFocus
          style={m(styles.container, this.props.emailError && styles.error)}
          type="text"
          value={email}
          onChange={this.handleEmailChange.bind(this)}
          onBlur={this.handleBlur.bind(this)}
          className="form-control"
          id="email"
          placeholder="email" />
          {(this.props.emailError ? (<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>) : (<span></span>))}
      </div>
    );
  }
}

