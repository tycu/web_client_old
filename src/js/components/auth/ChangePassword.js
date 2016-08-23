import React from 'react';
import { Link } from "react-router";
import * as AuthActions from "../../actions/AuthActions";
import * as AuthUtils from "../../utils/AuthUtils";
import AuthStore from '../../stores/AuthStore';

import OldPassword from './OldPassword';
import Password from './Password';
import PasswordMatch from './PasswordMatch';
import Messages from '../layout/Messages';

export default class ChangePassword extends React.Component {

  static propTypes = {
    oldPassword: React.PropTypes.string,
    password:  React.PropTypes.string,
    message:  React.PropTypes.string,
    passwordMatch: React.PropTypes.string,
    error:  React.PropTypes.string,
    oldPasswordError: React.PropTypes.bool,
    pwError: React.PropTypes.bool
  }

  state = {
    loggedIn: false,
    oldPassword: '',
    password: '',
    passwordMatch: '',
    message: '',
    error: '',
    key: 1,
    oldPasswordError: false,
    pwError: false
  }

  componentWillMount() {
    AuthStore.once("change", () => {
      this.setState({
        loggedIn:   AuthStore.signedIn(),
        message:    AuthStore.getMessage(),
        error:      AuthStore.getError(),
        oldPassword: '',
        password:   AuthStore.getPassword(),
        passwordMatch: '',
        oldPasswordError: AuthStore.oldPasswordError(),
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

  changePassword(e) {
    e.preventDefault();
    var that = this;

    if (!AuthUtils.validPassword(this.state.password)) {
      that.setState({
        error: AuthUtils.passwordErrorText(),
        pwError: true
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
      AuthActions.changePassword(this.state.oldPassword, this.state.password);
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
        height: '470px',
        background: '#fff',
      },
      account: {
        marginTop: '30px'
      },
      resetPassword: {
        marginTop: '62px'
      }
    };
    const { oldPassword } = this.state;
    const { password } = this.state;
    const { passwordMatch } = this.state;


    // need old pw
    // need need new PW
    // need new PW conf

    //

    return (
      <div className="signin jumbotron center-block" style={style.container}>
        <h2>Change Your Password</h2>
        <form role="form">
          <Messages key={this.state.key + 1}  {...this.state} />

          <OldPassword {...this.state} key={this.state.key + 2} onUpdate={this.onUpdate.bind(this)} value={oldPassword} />

          <Password {...this.state} key={this.state.key + 3} onUpdate={this.onUpdate.bind(this)} value={password} title="New Password" />

          <PasswordMatch {...this.state} key={this.state.key + 4} onUpdate={this.onUpdate.bind(this)} value={passwordMatch} title="Confirm New Password" />

          <div className="form-group pull-left">
            <button type="submit" className="btn btn-primary" onClick={this.changePassword.bind(this)}>Change Password</button>
          </div>
      </form>
    </div>
    );
  }
}
