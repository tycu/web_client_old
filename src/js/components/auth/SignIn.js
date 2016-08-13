import React from 'react';
import { Link } from "react-router";
import * as AuthActions from "../../actions/AuthActions";
import * as AuthUtils from "../../utils/AuthUtils";
import AuthStore from '../../stores/AuthStore';

import Email from './Email';
import Password from './Password';
import Messages from '../layout/Messages';

export default class SignIn extends React.Component {

  static propTypes = {
    email:  React.PropTypes.string,
    password:  React.PropTypes.string,
    message:  React.PropTypes.string,
    error:  React.PropTypes.string,
    emailError: React.PropTypes.bool,
    pwError: React.PropTypes.bool
  }

  state = {
    loggedIn: false,
    email: '',
    password: '',
    message: '',
    error: '',
    key: 1,
    emailError: false,
    pwError: false
  }

  componentWillMount() {
    AuthStore.on("change", () => {
      this.setState({
        loggedIn:   AuthStore.signedIn(),
        email:      AuthStore.currentUser(),
        message:    AuthStore.getMessage(),
        error:      AuthStore.getError(),
        password:   AuthStore.getPassword(),
        emailError: AuthStore.getEmailError(),
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
      email:    AuthStore.currentUser(),
      message:  AuthStore.getMessage(),
      error:    AuthStore.getError(),
      password: AuthStore.getPassword()
    });
  }

  signin(e) {
    e.preventDefault();
    var that = this;

    if (!AuthUtils.validEmail(this.state.email)) {
      that.setState({
        error: AuthUtils.invalidEmail(),
        emailError: true
      });
    }

    if (!AuthUtils.validEmail(this.state.email)) {
      that.setState({
        error: AuthUtils.pwErrorText,
        pwError: true
      });
      return false;
    } else {
      AuthActions.signInUser(this.state.email, this.state.password);
    }
  };

  onUpdate(key, val){
    this.setState({
      [key]: val
    });
  }

  render() {
    const style = {
      container: {
        width: '550px',
        height: '400px',
        background: '#fff',
      },
      account: {
        marginTop: '30'
      },
      resetPassword: {
        marginTop: '62'
      }
    };

    return (
      <div className="signin jumbotron center-block" style={style.container}>
        <h2>Login</h2>
        <form role="form">
          <Messages key={this.state.key + 1}  {...this.state} />
          <Email {...this.state} key={this.state.key + 2} onUpdate={this.onUpdate.bind(this)} />
          <Password {...this.state} key={this.state.key + 3} onUpdate={this.onUpdate.bind(this)} />

          <div className="form-group pull-left">
            <button type="submit" className="btn btn-default" onClick={this.signin.bind(this)}>Login</button>
            <div style={style.account}>
              <span>No Account? | </span>
              <Link to="/signup"> Sign Up</Link>
            </div>
          </div>
          <div className="form-group pull-right">
            <div style={style.resetPassword}>
              <Link to="/reset_password">Forgot Password</Link>
            </div>
          </div>
          <br/>

      </form>
    </div>
    );
  }
}
