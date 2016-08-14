import React from 'react';
import { Link } from "react-router";
import * as AuthActions from "../../actions/AuthActions";
import * as AuthUtils from "../../utils/AuthUtils";
import AuthStore from '../../stores/AuthStore';

import Email from './Email';
import Password from './Password';
import PasswordMatch from './PasswordMatch';
import Messages from '../layout/Messages';

export default class SignUp extends React.Component {

  static propTypes = {
    email:  React.PropTypes.string,
    password:  React.PropTypes.string,
    passwordMatch: React.PropTypes.string,
    message:  React.PropTypes.string,
    error:  React.PropTypes.string,
    emailError: React.PropTypes.bool,
    pwError: React.PropTypes.bool
  }

  state = {
    loggedIn: false,
    passwordMatch: '',
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
        password:   '',
        passwordMatch: '',
        message:    AuthStore.getMessage(),
        error:      AuthStore.getError(),
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
      error:    AuthStore.getError()
    });
  }

  signup(e) {
    e.preventDefault();
    var that = this;

    if (!AuthUtils.validEmail(this.state.email)) {
      that.setState({
        error: AuthUtils.invalidEmail(),
        emailError: true
      });
      return false;
    }

    if (this.state.password !== this.state.passwordMatch) {
      that.setState({
        error: AuthUtils.passwordNoMatch(),
        pwError: true
      });
      return false;
    } else if (!AuthUtils.validPassword(this.state.password)) {
      that.setState({
        error: AuthUtils.pwErrorText,
        pwError: true
      });
      return false;
    } else {
      AuthActions.signUpUser(this.state.email, this.state.password);
    }
  }

  onUpdate(key, val) {
    this.setState({
      [key]: val
    });
  }


  render() {
    const { email } = this.state;
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
        <h2>Sign up For Tally</h2>
        <form role="form">

          <Messages key={this.state.key + 1} {...this.state} />

          <Email {...this.state} key={this.state.key + 2} onUpdate={this.onUpdate.bind(this)} value={email} />
          <Password {...this.state} key={this.state.key + 3 } onUpdate={this.onUpdate.bind(this)} value={password} />
          <PasswordMatch {...this.state} key={this.state.key + 4} onUpdate={this.onUpdate.bind(this)} value={passwordMatch} />
          <div className="form-group pull-left">
            <button type="submit" className="btn btn-primary" onClick={this.signup.bind(this)}>Create Account</button>
            <div style={style.account}>
              <span>Already have an Account? | </span>
              <Link to="/signin"> Log In</Link>
            </div>
          </div>
          <br />

      </form>
    </div>
    );
  }
}

