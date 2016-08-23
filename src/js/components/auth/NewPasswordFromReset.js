import React from 'react';
import { Link } from "react-router";
import * as AuthActions from "../../actions/AuthActions";
import * as AuthUtils from "../../utils/AuthUtils";
import AuthStore from '../../stores/AuthStore';

import Password from './Password';
import PasswordMatch from './PasswordMatch';
import Messages from '../layout/Messages';

export default class NewPasswordFromReset extends React.Component {

  static propTypes = {
    password:  React.PropTypes.string,
    passwordMatch: React.PropTypes.string,
    message:  React.PropTypes.string,
    error:  React.PropTypes.string,
    pwError: React.PropTypes.bool
  }

  state = {
    loggedIn: false,
    passwordMatch: '',
    password: '',
    message: '',
    error: '',
    key: 1,
    pwError: false
  }

  componentWillMount() {
    AuthStore.once("change", () => {
      this.setState({
        loggedIn:   AuthStore.signedIn(),
        password:   '',
        passwordMatch: '',
        message:    AuthStore.getMessage(),
        error:      AuthStore.getError(),
        pwError:    AuthStore.getPasswordError(),
        key:        Math.random()
      });
    });
  }

  componentWillUnmount() {
    AuthStore.removeListener("change", this.getAuthState);
  }

  getAuthState() {
    this.setState({
      loggedIn: AuthStore.signedIn(),
      message:  AuthStore.getMessage(),
      error:    AuthStore.getError()
    });
  }

  updatePassword(e) {
    e.preventDefault();
    var that = this;

    if (this.state.password !== this.state.passwordMatch) {
      that.setState({
        error: AuthUtils.passwordNoMatch(),
        pwError: true
      });
      return false;
    } else if (!AuthUtils.validPassword(this.state.password)) {
      that.setState({
        error: AuthUtils.passwordErrorText(),
        pwError: true
      });
      return false;
    } else {
      AuthActions.updatePasswordFromReset(this.state.password);
    }
  }

  onUpdate(key, val) {
    this.setState({
      [key]: val
    });
  }


  render() {
    const { password } = this.state;
    const { passwordMatch } = this.state;

    const style = {
      container: {
        width: '550px',
        height: '450px',
        background: '#fff',
      },
      account: {
        marginTop: '30px'
      }
    };

    return (
      <div className="signin jumbotron center-block" style={style.container}>
        <h2>Reset Your Password</h2>
        <form role="form">

          <Messages key={this.state.key + 1} {...this.state} />

          <Password {...this.state} key={this.state.key + 3 } onUpdate={this.onUpdate.bind(this)} value={password} />
          <PasswordMatch {...this.state} key={this.state.key + 4} onUpdate={this.onUpdate.bind(this)} value={passwordMatch} />
          <div className="form-group pull-left">
            <button type="submit" className="btn btn-primary" onClick={this.updatePassword.bind(this)}>Set New Password</button>
          </div>
          <br />

      </form>
    </div>
    );
  }
}

